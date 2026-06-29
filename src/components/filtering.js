import { createComparison, defaultRules } from "../lib/compare.js";

// @todo: #4.3 — настроить компаратор
const compare = createComparison(defaultRules);

export function initFiltering(elements, indexes) {
  // @todo: #4.1 — заполнить выпадающие списки опциями
  Object.keys(indexes) // Получаем ключи из объекта
    .forEach((elementName) => {
      // Перебираем по именам
      elements[elementName].append(
        // в каждый элемент добавляем опции
        ...Object.values(indexes[elementName]) // формируем массив имён, значений опций
          .map((name) => {
            // используйте name как значение и текстовое содержимое
            // @todo: создать и вернуть тег опции
            const option = document.createElement("option");
            option.value = name;
            option.textContent = name;

            return option;
          }),
      );
    });

  return (data, state, action) => {
  // @todo: #4.2 — обработать очистку поля
  if (action && action.name === "clear" && action.element) {
    const button = action.element;
    const parent = button.parentElement;
    const input = parent.querySelector("input");

    if (input) {
      // Очищаем значение в поле ввода
      input.value = "";

      // Получаем имя поля из атрибута data-field
      const fieldName = button.getAttribute("data-field");

      // Очищаем соответствующее поле в состоянии
      if (fieldName) {
        state[fieldName] = "";
      }
    }

    // Возвращаем все данные после очистки
    return data;
  }

  // @todo: #4.5 — отфильтровать данные используя компаратор
  return data.filter((row) => compare(row, state));
};

}
