/**
 * CodeSnap CLI - 删除片段命令
 */
import * as inquirer from 'inquirer';
import chalk from 'chalk';
import { SnippetManager } from '../store';

export async function removeCommand(manager: SnippetManager, id: string): Promise<void> {
  const snippet = manager.getById(id);

  if (!snippet) {
    console.log(chalk.red(`\n❌ 未找到ID为 "${id}" 的片段\n`));
    return;
  }

  const { confirm } = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'confirm',
      message: `确定要删除片段 "${snippet.title}" 吗?`,
      default: false,
    },
  ]);

  if (confirm) {
    const success = await manager.delete(id);
    if (success) {
      console.log(chalk.green(`\n✅ 片段 "${snippet.title}" 已删除\n`));
    }
  } else {
    console.log(chalk.yellow('\n⚠️ 已取消删除操作\n'));
  }
}
