#!/usr/bin/env node
/**
 * Проверка имени ветки. Формат: type/ID-short-description
 *   type: feature | test | bug | fix (как типы в сообщениях коммитов)
 *   ID:   ID задачи, например BEK-1, FRONT-7
 * Примеры: feature/BEK-1-repo-setup, fix/BEK-23-upload-timeout
 * Служебные: main, develop, release/1.2.3
 * Использование: node scripts/check-branch-name.cjs [имя-ветки]
 */
const { execSync } = require('node:child_process');

const PROTECTED = ['main', 'develop'];
const TYPES = ['feature', 'test', 'bug', 'fix'];

const slug = '[a-z0-9]+(?:-[a-z0-9]+)*';
const task = new RegExp(`^(${TYPES.join('|')})/[A-Z][A-Z0-9]{1,9}-\\d+-${slug}$`);
const release = /^release\/\d+\.\d+\.\d+$/;

const branch = process.argv[2] ?? execSync('git rev-parse --abbrev-ref HEAD').toString().trim();

if (branch === 'HEAD') process.exit(0); // rebase или detached HEAD

if (PROTECTED.includes(branch)) {
    if (process.env.ALLOW_PROTECTED === '1') process.exit(0);
    console.error(`\nПрямая работа в "${branch}" запрещена. Создайте ветку: git switch -c feature/BEK-1-short-name\n`);
    process.exit(1);
}

if (task.test(branch) || release.test(branch)) process.exit(0);

console.error(`
Имя ветки "${branch}" не подходит.

Формат:  type/ID-short-description   (описание строчными буквами, цифры и дефисы)
type:    ${TYPES.join(', ')}
ID:      ID задачи заглавными, например BEK-1
Примеры: feature/BEK-1-repo-setup
         fix/BEK-23-upload-timeout

Переименовать: git branch -m <новое-имя>
`);
process.exit(1);
