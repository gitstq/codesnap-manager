/**
 * CodeSnap CLI - 添加片段命令
 */
import * as inquirer from 'inquirer';
import chalk from 'chalk';
import { SnippetManager } from '../store';
import { renderSnippet } from '../utils';

export async function addCommand(manager: SnippetManager): Promise<void> {
  console.log(chalk.bold('\n📝 添加新代码片段\n'));

  const answers = await inquirer.prompt([
    {
      type: 'input',
      name: 'title',
      message: '片段标题:',
      validate: (input: string) => input.trim().length > 0 || '标题不能为空',
    },
    {
      type: 'input',
      name: 'description',
      message: '描述 (可选):',
    },
    {
      type: 'input',
      name: 'language',
      message: '编程语言:',
      default: 'javascript',
      validate: (input: string) => input.trim().length > 0 || '语言不能为空',
    },
    {
      type: 'editor',
      name: 'code',
      message: '代码内容 (将打开编辑器):',
      validate: (input: string) => input.trim().length > 0 || '代码内容不能为空',
    },
    {
      type: 'input',
      name: 'tags',
      message: '标签 (用逗号分隔):',
      filter: (input: string) =>
        input
          .split(',')
          .map((t) => t.trim().toLowerCase())
          .filter((t) => t.length > 0),
    },
  ]);

  const snippet = await manager.add({
    title: answers.title.trim(),
    description: answers.description.trim(),
    language: answers.language.trim().toLowerCase(),
    code: answers.code.trim(),
    tags: answers.tags,
  });

  console.log(chalk.green('\n✅ 片段添加成功!\n'));
  console.log(renderSnippet(snippet));
}
