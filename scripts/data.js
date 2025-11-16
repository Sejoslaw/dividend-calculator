// scripts/data.js

const stockData = {
    "2025-11-16": [
        { nazwa: "WIG-PL-COMPANY-A", portfel: "ING Makler", cenaZakupu: 120.50, ilosc: 10, dywidendaRoczna: 5.20 },
        { nazwa: "WIG-PL-COMPANY-B", portfel: "XTB", cenaZakupu: 45.00, ilosc: 50, dywidendaRoczna: 1.50 }
    ],
    "2025-10-30": [
        { nazwa: "WIG-PL-COMPANY-A", portfel: "ING Makler", cenaZakupu: 120.50, ilosc: 10, dywidendaRoczna: 5.20 },
        { nazwa: "WIG-PL-COMPANY-B", portfel: "XTB", cenaZakupu: 40.00, ilosc: 40, dywidendaRoczna: 1.50 } // Mniej akcji/inna cena
    ],
    "2025-09-01": [
        { nazwa: "WIG-PL-COMPANY-C", portfel: "XTB", cenaZakupu: 200.00, ilosc: 5, dywidendaRoczna: 10.00 }
    ]
};

export const getAvailableDates = () => Object.keys(stockData).sort((a, b) => new Date(b) - new Date(a));

export const getDataByDate = (date) => stockData[date] || [];

export default stockData;