// scripts/data.js

const stockData = {
    "2025-11-16": [
        { nazwa: "DOMDEV", portfel: "Makler 1", cenaZakupu: 84.09, ilosc: 150, dywidendaRoczna: 6.50 },
        { nazwa: "HANDLOWY", portfel: "Makler 1", cenaZakupu: 57.76, ilosc: 2119, dywidendaRoczna: 13.73 },
        { nazwa: "PKNORLEN", portfel: "Makler 1", cenaZakupu: 63.52, ilosc: 5809, dywidendaRoczna: 6 },
        { nazwa: "PZU", portfel: "Makler 1", cenaZakupu: 43.98, ilosc: 1685, dywidendaRoczna: 4.47 },
        { nazwa: "HANDLOWY", portfel: "Makler 2", cenaZakupu: 55.8756, ilosc: 587, dywidendaRoczna: 13.73 },
        { nazwa: "PKNORLEN", portfel: "Makler 2", cenaZakupu: 64.1375, ilosc: 1277, dywidendaRoczna: 6 },
        { nazwa: "PZU", portfel: "Makler 2", cenaZakupu: 61.98, ilosc: 200, dywidendaRoczna: 4.47 },
        { nazwa: "PZU", portfel: "XTB 1", cenaZakupu: 62.02, ilosc: 646, dywidendaRoczna: 4.47 },
        { nazwa: "PZU", portfel: "XTB 2", cenaZakupu: 61.98, ilosc: 103, dywidendaRoczna: 4.47 },
    ]
};

export const getAvailableDates = () => Object.keys(stockData).sort((a, b) => new Date(b) - new Date(a));

export const getDataByDate = (date) => stockData[date] || [];

export default stockData;