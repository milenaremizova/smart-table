import {rules, createComparison} from "../lib/compare.js";


export function initSearching(searchField) {
    // @todo: #5.1 — настроить компаратор
    const compare = createComparison(rules);

    return (data, state, action) => {
        // @todo: #5.2 — применить компаратор
        const searchFieldName = state[searchField];

        const searchComparator = rules.searchMultipleFields (searchFieldName, ['date', 'customer', 'seller'], false)
        return data.filter(row => searchComparator(row));
    }
}