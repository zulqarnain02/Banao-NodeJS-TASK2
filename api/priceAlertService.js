// services/priceAlertService.js
const Alert = require("./models/alertSchema");
const nodemailer = require("nodemailer");
const axios = require("axios");

// Configure Nodemailer
const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});

// Periodic price check
const startPriceAlertService = () => {
  setInterval(async () => {
    try {
      const alerts = await Alert.find(); // Fetch all alerts from the database
      if (alerts.length === 0) return; // Skip processing if no alerts are set

      console.log("Alerts in database:", alerts);

      // Extract unique cryptoIds from the alerts
      const cryptoIds = [...new Set(alerts.map((alert) => alert.cryptoId))];

      // Fetch cryptocurrency data for the relevant cryptoIds
      const response = await axios.get(
        "https://api.coingecko.com/api/v3/coins/markets",
        { params: { vs_currency: "usd", ids: cryptoIds.join(",") } }
      );

      const cryptos = response.data;

      for (const alert of alerts) {
        const crypto = cryptos.find((c) => c.id === alert.cryptoId);
        console.log("Checking alert for:", alert);
        
        if (crypto && crypto.current_price >= alert.priceThreshold) {
          console.log("Sending email for:", alert);

          // Send the alert email
          await transporter.sendMail({
            from: process.env.EMAIL,
            to: alert.email,
            subject: "Price Alert",
            text: `The price of ${crypto.name} has reached $${crypto.current_price}.`,
          });

          console.log(`Alert email sent to ${alert.email}`);

          // Remove the alert from the database after sending the email
          await Alert.deleteOne({ _id: alert._id });
        }
      }
    } catch (error) {
      console.error("Error fetching cryptocurrency data or sending email:", error);
    }
  }, 60000); // Check every minute
};

module.exports = startPriceAlertService;
