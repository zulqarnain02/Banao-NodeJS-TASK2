import React, { useState, useEffect } from 'react';
import { Card, CardContent } from './ui/card';
import CryptoList from './CryptoList';
import CryptoDetail from './CryptoDetail';
import CryptoInfo from './CryptoInfo';

export default function CryptoDashboard() {
  const [topCryptos, setTopCryptos] = useState([]);
  const [selectedCrypto, setSelectedCrypto] = useState(null);

  useEffect(() => {
    const fetchTopCryptos = async () => {
      try {
        const response = await fetch(
          'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false'
        );
        const data = await response.json();
        setTopCryptos(data);
        setSelectedCrypto(data[0]);  // Set the first crypto as default
      } catch (error) {
        console.error('Error fetching top cryptocurrencies:', error);
      }
    };

    fetchTopCryptos();
  }, []);

  return (
    <div className="flex flex-col md:flex-row gap-6 p-4">
      <Card className="w-full md:w-1/4">
        <CardContent>
          <CryptoList 
            cryptos={topCryptos} 
            onSelectCrypto={setSelectedCrypto}
            selectedCrypto={selectedCrypto}
          />
        </CardContent>
      </Card>
      
      <Card className="w-full md:w-1/2">
        <CardContent>
          {selectedCrypto && <CryptoDetail crypto={selectedCrypto} />}
        </CardContent>
      </Card>

      <Card className="w-full md:w-1/4">
        <CardContent>
          {selectedCrypto && <CryptoInfo crypto={selectedCrypto} />}
        </CardContent>
      </Card>
    </div>
  );
}
