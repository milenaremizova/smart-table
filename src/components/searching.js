import { rules, createComparison } from "../lib/compare.js";

export function initSearching(searchField) {
  const compare = createComparison(
    ["skipEmptyTargetValues"],
    [
      rules.searchMultipleFields(
        searchField,
        ["date", "customer", "seller"],
        false, // частичный поиск
      ),
    ],
  );

  return (data, state, action) => {
    if (!state.search || state.search.trim() === '') {
      return data;
    }
    return data.filter((row) => compare(row, state));
  };
}


