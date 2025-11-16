// scripts/components/Table.js

const PIT_RATE = 0.19; // Podatek Belki 19%

/**
 * Zwraca roczny zysk z dywidend po odliczeniu podatku.
 * @param {number} dywidendaRoczna Dywidenda na akcję.
 * @param {number} ilosc Ilość posiadanych akcji.
 * @returns {number} Zysk po opodatkowaniu.
 */
const calculateNetDividend = (dywidendaRoczna, ilosc) => {
    const gross = dywidendaRoczna * ilosc;
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

        if (!this.container) {
            throw new Error(`Kontener o selektorze ${containerSelector} nie znaleziony.`);
        }
    }

    render(data) {
        this.container.innerHTML = '';

        let totalNetDividend = 0;
        let totalInvestment = 0;

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
            const netDividend = calculateNetDividend(item.dywidendaRoczna, item.ilosc);
            const investmentValue = item.cenaZakupu * item.ilosc;

            totalNetDividend += netDividend;
            totalInvestment += investmentValue;

            const row = document.createElement('tr');

            row.innerHTML = `
                <td>${item.nazwa}</td>
                <td>${item.portfel}</td>
                <td>${item.ilosc}</td>
                <td>${item.cenaZakupu.toFixed(2)} PLN</td>
                <td>${investmentValue.toFixed(2)} PLN</td>
                <td>${item.dywidendaRoczna.toFixed(2)} PLN</td>
                <td class="net-dividend">${netDividend.toFixed(2)} PLN</td>
            `;

            tbody.appendChild(row);
        });

        tfoot.innerHTML = `
            <tr class="summary-row">
                <td colspan="4"></td>
                <td class="total-investment">Suma Inwestycji:<br>${formatCurrency(totalInvestment)} PLN</td>
                <td colspan="1"></td>
                <td class="total-net-dividend">Suma Dywidend Netto (Rocznie):<br>${formatCurrency(totalNetDividend)} PLN</td>
            </tr>
        `;

        this.container.appendChild(table);
    }
}