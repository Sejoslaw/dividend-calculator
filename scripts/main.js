// scripts/main.js

import { getDataByDate, getAvailableDates } from './data.js';
import { Table } from './components/table.js';
import { Dropdown } from './components/dropdown.js';
import { App } from './components/app.js';

document.addEventListener('DOMContentLoaded', () => {
    const dependencies = {
        getDataFn: getDataByDate,
        getDatesFn: getAvailableDates,
        DropdownComponent: Dropdown,
        TableComponent: Table
    };

    const app = new App(dependencies);

    app.init();
});