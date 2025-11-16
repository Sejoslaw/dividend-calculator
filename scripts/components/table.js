// scripts/components/Table.js

const PIT_RATE = 0.19; // Podatek Belki 19%

/**
 * Zwraca roczny zysk z dywidend po odliczeniu podatku.
 * @param {number} annualDividend Dywidenda na akcję.
 * @param {number} quantity Ilość posiadanych akcji.
 * @returns {number} Zysk po opodatkowaniu.
 */
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
                    <th>Bieżąca Cena</th>
                    <th>Aktualna Wycena Akcji</th>
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

            totalNetDividend += netDividend;
            totalInvestment += investmentValue;
            totalMarketValue += marketValue;

            const row = document.createElement('tr');

            row.innerHTML = `
                <td>${item.name}</td>
                <td>${item.portfolio}</td>
                <td>${item.quantity}</td>
                <td>${item.purchasePrice.toFixed(2)} PLN</td>
                <td>${investmentValue.toFixed(2)} PLN</td>
                <td>${formatCurrency(item.currentPrice)} PLN</td>
                <td>${formatCurrency(marketValue)} PLN</td>
                <td>${item.annualDividend.toFixed(2)} PLN</td>
                <td class="net-dividend">${netDividend.toFixed(2)} PLN</td>
            `;

            tbody.appendChild(row);
        });

        tfoot.innerHTML = `
            <tr class="summary-row">
                <td colspan="4"></td>
                <td class="total-investment">Suma Inwestycji:<br>${formatCurrency(totalInvestment)} PLN</td>
                <td colspan="1"></td>
                <td class="total-market-value">Suma Wyceny Rynkowej:<br>${formatCurrency(totalMarketValue)} PLN</td>
                <td colspan="1"></td>
                <td class="total-net-dividend">Suma Dywidend Netto (Rocznie):<br>${formatCurrency(totalNetDividend)} PLN</td>
            </tr>
        `;

        this.container.appendChild(table);
    }
}