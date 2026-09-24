/**
 * Формат: ID | [Тип |] описание
 *   BEK-1 | создал репу с беком
 *   BEK-12 | Feature | добавил список замечаний
 * Тип необязателен: Feature, Test, Bug, Fix. ID задачи обязателен (BEK-1, FRONT-7 и т.п.).
 */
const TYPES = ['Feature', 'Test', 'Bug', 'Fix'];
const HEADER = new RegExp(`^[A-Z][A-Z0-9]{1,9}-\\d+ \\| (?:(?:${TYPES.join('|')}) \\| )?(?!.* \\| )\\S.{4,}$`);

module.exports = {
    plugins: [
        {
            rules: {
                'header-format': ({ header }) => [
                    HEADER.test(header ?? ''),
                    `Формат: "ID | [Тип |] описание", тип: ${TYPES.join(', ')} (необязателен). Пример: "BEK-1 | Feature | создал репу с беком"`,
                ],
            },
        },
    ],
    rules: {
        'header-format': [2, 'always'],
        'header-max-length': [2, 'always', 120],
    },
};
