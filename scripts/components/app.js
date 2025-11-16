// scripts/components/App.js

export class App {
    constructor({ getDataFn, getDatesFn, DropdownComponent, TableComponent }) {
        this.getDataFn = getDataFn;
        this.getDatesFn = getDatesFn;

        this.dropdown = new DropdownComponent('#date-dropdown', this.handleDateChange.bind(this));
        this.table = new TableComponent('#stock-table-container');

        this.availableDates = this.getDatesFn();
    }

    init() {
        this.dropdown.setOptions(this.availableDates);
    }

    /**
     * Handler wywoływany przez Dropdown po zmianie daty.
     * @param {string} selectedDate - Wybrana data.
     */
    handleDateChange(selectedDate) {
        const dataForDate = this.getDataFn(selectedDate);
        this.table.render(dataForDate);
    }
}