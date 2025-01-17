# 📊 Crypto Dashboard

Welcome to the **Crypto Dashboard**! This project provides an intuitive interface to view cryptocurrency information, manage alerts, and includes secure user authentication with token generation and password recovery functionality. 🚀

---

## 🔧 Features

- 🔮 **Top 10 Cryptocurrencies**: Displays the latest data for the top 10 cryptocurrencies by market capitalization.
- 🔄 **Real-time Updates**: Automatically fetches updated prices.
- ⚠️ **Price Alerts**: Set price thresholds and receive alerts via email.
- 🔐 **Secure Login**: Token-based authentication for enhanced security.
- 🔓 **Forgot Password**: Easily reset your password if you forget it.
- 🔹 **Detailed Cryptocurrency Info**: Comprehensive information about each cryptocurrency.

---

## 📚 Tech Stack

- **Frontend**: React.js, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **Email Service**: Nodemailer

---

## 🔄 Installation

1. Clone this repository:
   ```bash
   git clone https://github.com/your-username/crypto-dashboard.git
   ```
2. Navigate to the project folder:
   ```bash
   cd crypto-dashboard
   ```
3. Install dependencies for both frontend and backend:
   ```bash
   cd frontend && npm install
   cd ../backend && npm install
   ```
4. Create an `.env` file in the `backend` directory with the following:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   EMAIL=your_email@example.com
   EMAIL_PASSWORD=your_email_password
   ```
5. Start the backend server:
   ```bash
   cd backend && npm start
   ```
6. Start the frontend:
   ```bash
   cd frontend && npm start
   ```
7. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

---

## 🕵️‍♂️ Authentication

- **Secure Login**: User credentials are securely validated, and a token is generated for subsequent requests.
- **Forgot Password**: Users can request a password reset link via email. Upon validation, they can update their password securely.

---

## 🎨 UI Preview

![image](https://github.com/user-attachments/assets/c063e7a9-b1b3-40eb-bde3-30f1e4296002)


---

## ⚠️ Price Alerts

1. Navigate to the "Set Alert" page.
2. Enter your email, cryptocurrency ID (e.g., `bitcoin`), and price threshold.
3. Submit the form to set an alert. You'll receive an email when the price crosses your threshold.

![image](https://github.com/user-attachments/assets/088b8ed7-e435-4f96-a8cb-a9fb91f6fe28)

---

## 🔧 API Endpoints

### **Authentication**

- **Login**: `POST /api/auth/login`
- **Register**: `POST /api/auth/register`
- **Forgot Password**: `POST /api/auth/forgot-password`
- **Reset Password**: `POST /api/auth/reset-password`

### **Crypto Data**

- **Get Top 10 Cryptos**: `GET /api/cryptos`
- **Get Crypto Details**: `GET /api/cryptos/:id`
- **Set Price Alert**: `POST /api/alerts`

---

## 🎉 Future Enhancements

- Add historical price charts.
- Integrate user portfolio tracking.

---

## ✅ Contributing

1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add your message here"
   ```
4. Push to the branch:
   ```bash
   git push origin feature/your-feature-name
   ```
5. Open a Pull Request.

---

## 🚀 Contact

For any inquiries or feedback, reach out at:
- **Email**: zulqarnain4292@gmail.com
- **GitHub**: [GitHub Profile](https://github.com/zulqarnain02)

---

## 🛠 License

This project is licensed under the MIT License. See the `LICENSE` file for more details.
