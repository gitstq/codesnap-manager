/**
 * CodeSnap CLI - 编辑片段命令
 */
import * as inquirer from 'inquirer';
import chalk from 'chalk';
import { SnippetManager } from '../store';
import { renderSnippet } from '../utils';

export async function editCommand(manager: SnippetManager, id: string): Promise<void> {
  const snippet = manager.getById(id);

  if (!snippet) {
    console.log(chalk.red(`\n❌ 未找到ID为 "${id}" 的片段\n`));
    return;
  }

  console.log(chalk.bold('\n✏️ 编辑代码片段\n'));
  console.log(chalk.gray('提示: 直接按回车保留原值\n'));

  const answers = await inquirer.prompt([
    {
      type: 'input',
      name: 'title',
      message: '片段标题:',
      default: snippet.title,
    },
    {
      type: 'input',
      name: 'description',
      message: '描述:',
      default: snippet.description,
    },
    {
      type: 'input',
      name: 'language',
      message: '编程语言:',
      default: snippet.language,
    },
    {
      type: 'editor',
      name: 'code',
      message: '代码内容:',
      default: snippet.code,
    },
    {
      type: 'input',
      name: 'tags',
      message: '标签 (用逗号分隔):',
      default: snippet.tags.join(', '),
      filter: (input: string) =>
        input
          .split(',')
          .map((t) => t.trim().toLowerCase())
          .filter((t) => t.length > 0),
    },
  ]);

  const updated = await manager.update(id, {
    title: answers.title.trim(),
    description: answers.description.trim(),
    language: answers.language.trim().toLowerCase(),
    code: answers.code.trim(),
    tags: answers.tags,
  });

  if (updated) {
    console.log(chalk.green('\n✅ 片段更新成功!\n'));
    console.log(renderSnippet(updated));
  }
}
