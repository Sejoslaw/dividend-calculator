// scripts/components/Dropdown.js

export class Dropdown {
    constructor(containerSelector, onChangeCallback) {
        this.container = document.querySelector(containerSelector);
        this.onChangeCallback = onChangeCallback;

        this.selectElement = document.createElement('select');
        this.selectElement.classList.add('md-dropdown');
        this.selectElement.addEventListener('change', (e) => this.onChangeCallback(e.target.value));

        this.container.appendChild(this.selectElement);
    }

    /**
     * Wstrzykiwanie: przyjmuje listę dostępnych dat i ustawia je jako opcje.
     * @param {string[]} dates - Lista dat w formacie YYYY-MM-DD.
     */
    setOptions(dates) {
        this.selectElement.innerHTML = dates.map(date => `<option value="${date}">${date}</option>`).join('');

        if (dates.length > 0) {
            this.onChangeCallback(dates[0]);
        }
    }
}