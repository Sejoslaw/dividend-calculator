// scripts/components/Table.js

const PIT_RATE = 0.19; // Podatek Belki 19%

const calculateNetDividend = (annualDividend, quantity) => {
    const gross = annualDividend * quantity;
    return gross * (1 - PIT_RATE);
};

const formatCurrency = (number) => {
    return new Intl.NumberFormat('pl-PL', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(number);
};

const formatPercentage = (number) => {
    return new Intl.NumberFormat('pl-PL', {
        style: 'percent',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(number);
};

export class Table {
    constructor(containerSelector) {
        this.container = document.querySelector(containerSelector);
    }

    render(data) {
        this.container.innerHTML = '';

        let totalNetDividend = 0;
        let totalInvestment = 0;
        let totalMarketValue = 0;

        if (data.length === 0) {
            this.container.innerHTML = '<p>Brak danych do wyświetlenia dla wybranej daty.</p>';
            return;
        }

        data.forEach(item => {
            totalInvestment += item.purchasePrice * item.quantity;
            totalMarketValue += item.currentPrice * item.quantity;
            totalNetDividend += calculateNetDividend(item.annualDividend, item.quantity);
        });

        const table = document.createElement('table');
        table.classList.add('stock-table', 'md-card');

        table.innerHTML = `
            <thead>
                <tr>
                    <th>Nazwa</th>
                    <th>Portfel</th>
                    <th>Ilość</th>
                    <th>Średnia Cena Zakupu</th>
                    <th>Wartość Inwestycji</th>
                    <th>% Udział Kosztu</th> 
                    <th>Bieżąca Cena</th>
                    <th>Aktualna Wycena Akcji</th>
                    <th>% Udział Wyceny</th> 
                    <th>Dywidenda Brutto (Akcja)</th>
                    <th>Dywidenda Netto (Rocznie)</th>
                </tr>
            </thead>
            <tbody></tbody>
            <tfoot></tfoot>
        `;

        const tbody = table.querySelector('tbody');
        const tfoot = table.querySelector('tfoot');

        data.forEach(item => {
            const netDividend = calculateNetDividend(item.annualDividend, item.quantity);
            const investmentValue = item.purchasePrice * item.quantity;
            const marketValue = item.currentPrice * item.quantity;

            const costPercentage = totalInvestment > 0 ? investmentValue / totalInvestment : 0;
            const marketPercentage = totalMarketValue > 0 ? marketValue / totalMarketValue : 0;

            const row = document.createElement('tr');

            row.innerHTML = `
                <td>${item.name}</td>
                <td>${item.portfolio}</td>
                <td>${item.quantity}</td>
                <td>${formatCurrency(item.purchasePrice)} PLN</td>
                <td>${formatCurrency(investmentValue)} PLN</td>
                <td>${formatPercentage(costPercentage)}</td>
                <td>${formatCurrency(item.currentPrice)} PLN</td>
                <td>${formatCurrency(marketValue)} PLN</td>
                <td>${formatPercentage(marketPercentage)}</td>
                <td>${formatCurrency(item.annualDividend)} PLN</td>
                <td class="net-dividend">${formatCurrency(netDividend)} PLN</td>
            `;

            tbody.appendChild(row);
        });

        tfoot.innerHTML = `
            <tr class="summary-row">
                <td colspan="4"></td> 
                <td class="total-investment">Suma Inwestycji:<br>${formatCurrency(totalInvestment)} PLN</td>
                <td colspan="2"></td> 
                <td class="total-market-value">Suma Wyceny Rynkowej:<br>${formatCurrency(totalMarketValue)} PLN</td>
                <td colspan="2"></td> 
                <td class="total-net-dividend">Suma Dywidend Netto (Rocznie):<br>${formatCurrency(totalNetDividend)} PLN</td>
            </tr>
        `;

        this.container.appendChild(table);
    }
}