/**
 * @type {import('prettier').Config}
 */
module.exports = {
  printWidth: 100,              // Максимальная длина строки
  tabWidth: 2,                  // Размер отступа
  useTabs: false,               // Использовать пробелы вместо табуляции
  semi: true,                   // Точка с запятой в конце строк
  singleQuote: true,           // Одинарные кавычки
  trailingComma: 'all',        // Замыкающие запятые
  bracketSpacing: true,        // Пробелы в объектных литералах
  arrowParens: 'always',       // Скобки вокруг единственного параметра стрелочной функции
  vueIndentScriptAndStyle: true, // Отступы в секциях script и style
  endOfLine: 'lf',             // Окончания строк
  singleAttributePerLine: true  // Атрибуты Vue компонентов с новой строки
};