/**
 * Формат: [ID |] Тип | описание
 *   Feature | добавил список замечаний
 *   BEK-1 | Feature | создал репу с беком
 * ID задачи необязателен (BEK-1, FRONT-7 и т.п.). Тип обязателен: Feature, Test, Bug, Fix.
 */
const TYPES = ['Feature', 'Test', 'Bug', 'Fix'];
const HEADER = new RegExp(
  `^(?:[A-Z][A-Z0-9]{1,9}-\\d+ \\| )?(?:${TYPES.join('|')}) \\| (?!.* \\| )\\S.{4,}$`,
);

module.exports = {
  plugins: [
    {
      rules: {
        'header-format': ({ header }) => [
          HEADER.test(header ?? ''),
          `Формат: "[ID |] Тип | описание", тип обязателен: ${TYPES.join(', ')}. Пример: "BEK-1 | Feature | создал репу с беком"`,
        ],
      },
    },
  ],
  rules: {
    'header-format': [2, 'always'],
    'header-max-length': [2, 'always', 120],
  },
};
