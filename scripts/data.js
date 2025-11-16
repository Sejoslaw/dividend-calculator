// scripts/data.js

const stockData = {
    "2025-11-16": [
        { name: "DOMDEV", portfolio: "Makler 1", purchasePrice: 84.09, currentPrice: 263, quantity: 150, annualDividend: 6.50 },
        { name: "HANDLOWY", portfolio: "Makler 1", purchasePrice: 57.76, currentPrice: 104, quantity: 2119, annualDividend: 13.73 },
        { name: "PKNORLEN", portfolio: "Makler 1", purchasePrice: 63.52, currentPrice: 103.74, quantity: 5809, annualDividend: 6 },
        { name: "PZU", portfolio: "Makler 1", purchasePrice: 43.98, currentPrice: 60.84, quantity: 1685, annualDividend: 4.47 },
        { name: "HANDLOWY", portfolio: "Makler 2", purchasePrice: 55.8756, currentPrice: 104, quantity: 587, annualDividend: 13.73 },
        { name: "PKNORLEN", portfolio: "Makler 2", purchasePrice: 64.1375, currentPrice: 103.74, quantity: 1277, annualDividend: 6 },
        { name: "PZU", portfolio: "Makler 2", purchasePrice: 61.98, currentPrice: 60.84, quantity: 200, annualDividend: 4.47 },
        { name: "PZU", portfolio: "XTB 1", purchasePrice: 62.02, currentPrice: 60.84, quantity: 646, annualDividend: 4.47 },
        { name: "PZU", portfolio: "XTB 2", purchasePrice: 61.98, currentPrice: 60.84, quantity: 103, annualDividend: 4.47 },
    ]
};

export const getAvailableDates = () => Object.keys(stockData).sort((a, b) => new Date(b) - new Date(a));

export const getDataByDate = (date) => stockData[date] || [];

export default stockData;