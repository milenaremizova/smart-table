import { createComparison, defaultRules } from "../lib/compare.js";

// @todo: #4.3 — настроить компаратор

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
    if (action && action.name === "clear") {
      const button = action.element; // элемент кнопки, которая была нажата
      const parent = button.parentElement; // родительский элемент кнопки

      // Ищем input в родительском элементе — предполагаем, что он где‑то рядом
      const input = parent.querySelector("input");

      if (input) {
        // 1. Очищаем значение в интерфейсе (в поле ввода)
        input.value = "";

        // 2. Получаем имя поля из атрибута data-field кнопки
        const fieldName = button.getAttribute("data-field");

        // 3. Очищаем соответствующее поле в состоянии (state)
        if (fieldName) {
          state[fieldName] = "";
        }
      }
    }

    // @todo: #4.5 — отфильтровать данные используя компаратор
    return data;
  };
}
