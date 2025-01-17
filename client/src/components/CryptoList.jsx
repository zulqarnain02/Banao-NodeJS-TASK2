import React from 'react'
import { Button } from './ui/button'

export default function CryptoList({ cryptos, onSelectCrypto, selectedCrypto }) {
  return (
    <div className="space-y-2">
      <h2 className="text-2xl font-bold mb-4 p-2">Top 10 Cryptocurrencies</h2>
      {cryptos.map((crypto) => (
        <Button
          key={crypto.id}
          variant={selectedCrypto?.id === crypto.id ? 'default' : 'outline'}
          className={`w-full justify-start ${
            selectedCrypto?.id === crypto.id
              ? 'bg-black text-white'
              : 'bg-white text-black'
          }`}
          onClick={() => onSelectCrypto(crypto)}
        >
          <img src={crypto.image || "/placeholder.svg"} alt={crypto.name} className="w-6 h-6 mr-2" />
          <span>{crypto.name}</span>
          <span className="ml-auto">${crypto.current_price.toLocaleString()}</span>
        </Button>
      ))}
    </div>
  )
}

