import React, { useState, useEffect } from 'react'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import { Card, CardContent } from './ui/card'
import { Button } from './ui/button'
import { ArrowUp, ArrowDown } from 'lucide-react'

const TIME_PERIODS = [
  { label: '1D', days: 1 },
  { label: '7D', days: 7 },
  { label: '30D', days: 30 },
  { label: '90D', days: 90 },
]

async function fetchWithRetry(url, retries = 3, delay = 1000) {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(url)
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)
      return await response.json()
    } catch (error) {
      if (i === retries - 1) throw error
      await new Promise(resolve => setTimeout(resolve, delay))
    }
  }
}

export default function CryptoDetail({ crypto }) {
  const [priceHistory, setPriceHistory] = useState(null)
  const [selectedPeriod, setSelectedPeriod] = useState('7D')
  const [exchangeRate, setExchangeRate] = useState(null)
  
  useEffect(() => {
    const fetchPriceHistory = async () => {
      const days = TIME_PERIODS.find(p => p.label === selectedPeriod)?.days
      try {
        const response = await fetch(
          `https://api.coingecko.com/api/v3/coins/${crypto.id}/market_chart?vs_currency=usd&days=${days}`
        )
        const data = await response.json()
        setPriceHistory(data)
      } catch (error) {
        console.error('Error fetching price history:', error)
      }
    }

    const fetchExchangeRate = async () => {
      try {
        const response = await fetch(
          'https://api.coingecko.com/api/v3/exchange_rates'
        )
        const data = await response.json()
        setExchangeRate(data.rates.inr.value)
      } catch (error) {
        console.error('Error fetching exchange rate:', error)
      }
    }

    fetchPriceHistory()
    fetchExchangeRate()
  }, [crypto.id, selectedPeriod])

  const chartData = priceHistory?.prices.map(([timestamp, price]) => ({
    timestamp,
    price,
  }))

  const priceChangeIsPositive = crypto.price_change_percentage_24h > 0


  return (
    <div>
      <div className="flex items-center gap-4 mb-6">
        <img src={crypto.image || "/placeholder.svg"} alt={crypto.name} className="w-12 h-12" />
        <div>
          <h2 className="text-2xl font-bold">{crypto.name}</h2>
          <p className="text-gray-500">{crypto.symbol.toUpperCase()}</p>
        </div>
      </div>

      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Price</p>
              <p className="text-2xl ml-auto font-bold">${crypto.current_price.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">24h Change</p>
              <p className={`text-2xl font-bold flex items-center ${priceChangeIsPositive ? 'text-green-500' : 'text-red-500'}`}>
                {priceChangeIsPositive ? <ArrowUp className="w-6 h-6 mr-1" /> : <ArrowDown className="w-6 h-6 mr-1" />}
                {Math.abs(crypto.price_change_percentage_24h).toFixed(2)}%
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Market Cap</p>
              <p className="text-2xl ml-auto font-bold">${crypto.market_cap.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">24h Volume</p>
              <p className="text-2xl ml-auto font-bold">${crypto.total_volume.toLocaleString()}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">{crypto.name} Price Chart (USD)</h3>
        <div className="h-[300px]">
          {chartData && (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <XAxis
                  dataKey="timestamp"
                  tickFormatter={(timestamp) => new Date(timestamp).toLocaleDateString()}
                />
                <YAxis
                  domain={['auto', 'auto']}
                  tickFormatter={(value) => `${value.toLocaleString()}`}
                />
                <Tooltip
                  formatter={(value) => `${value.toLocaleString()}`}
                  labelFormatter={(label) => new Date(label).toLocaleString()}
                />
                <Line type="monotone" dataKey="price" stroke="#2563eb" dot={false} />
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>

      <div className="flex gap-2">
        {TIME_PERIODS.map((period) => (
          <Button
            key={period.label}
            className={`px-4 py-2 rounded ${
              selectedPeriod === period.label
                ? 'bg-black text-white'
                : 'bg-gray-200 text-black hover:bg-black hover:text-white'
            }`}
            variant={selectedPeriod === period.label ? 'default' : 'outline'}
            onClick={() => setSelectedPeriod(period.label)}
          >
            {period.label}
          </Button>
        ))}
      </div>
    </div>
  )
}

