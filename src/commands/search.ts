/**
 * CodeSnap CLI - 搜索命令
 */
import chalk from 'chalk';
import * as inquirer from 'inquirer';
import { SnippetManager } from '../store';
import { renderSnippet } from '../utils';

export async function searchCommand(
  manager: SnippetManager,
  query: string,
  options: { language?: string; tag?: string; interactive?: boolean }
): Promise<void> {
  const searchOptions: any = { query };

  if (options.language) {
    searchOptions.language = options.language;
  }

  if (options.tag) {
    searchOptions.tags = [options.tag];
  }

  const snippets = manager.search(searchOptions);

  console.log(chalk.bold(`\n🔍 搜索结果: "${query}"\n`));

  if (snippets.length === 0) {
    console.log(chalk.yellow('⚠️ 没有找到匹配的代码片段\n'));
    return;
  }

  console.log(chalk.green(`找到 ${snippets.length} 个匹配结果:\n`));

  if (options.interactive && snippets.length > 1) {
    const choices = snippets.map((s, index) => ({
      name: `${index + 1}. ${s.title} (${s.language})`,
      value: index,
    }));

    const { selected } = await inquirer.prompt([
      {
        type: 'list',
        name: 'selected',
        message: '选择一个片段查看详情:',
        choices,
      },
    ]);

    console.log('\n' + renderSnippet(snippets[selected]));
  } else {
    snippets.forEach((snippet, index) => {
      console.log(chalk.gray(`${index + 1}.`) + ` ${chalk.bold(snippet.title)}`);
      console.log(chalk.gray(`   ID: ${snippet.id}`));
      console.log(chalk.gray(`   ${snippet.language} | ${snippet.tags.join(', ') || '无标签'}`));
      if (snippet.description) {
        console.log(chalk.gray(`   ${snippet.description}`));
      }
      console.log();
    });
  }
}
