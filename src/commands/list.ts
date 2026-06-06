/**
 * CodeSnap CLI - 列表命令
 */
import chalk from 'chalk';
import { SnippetManager } from '../store';
import { renderSnippet, renderStats } from '../utils';

export async function listCommand(
  manager: SnippetManager,
  options: { language?: string; tag?: string; limit?: number }
): Promise<void> {
  const searchOptions: any = {};
  
  if (options.language) {
    searchOptions.language = options.language;
  }
  
  if (options.tag) {
    searchOptions.tags = [options.tag];
  }
  
  if (options.limit) {
    searchOptions.limit = options.limit;
  }

  const snippets = manager.search(searchOptions);
  const stats = manager.getStats();

  console.log(chalk.bold('\n📋 代码片段列表\n'));
  console.log(renderStats(stats.total, stats.languages, stats.tags));
  console.log();

  if (snippets.length === 0) {
    console.log(chalk.yellow('⚠️ 没有找到匹配的代码片段'));
    console.log(chalk.gray('提示: 使用 "codesnap add" 添加新片段\n'));
    return;
  }

  console.log(chalk.blue(`找到 ${snippets.length} 个片段:\n`));

  snippets.forEach((snippet, index) => {
    console.log(chalk.gray(`${index + 1}.`) + ` ${chalk.bold(snippet.title)}`);
    console.log(chalk.gray(`   ID: ${snippet.id}`));
    console.log(chalk.gray(`   ${snippet.language} | ${snippet.tags.join(', ') || '无标签'}`));
    console.log();
  });
}
