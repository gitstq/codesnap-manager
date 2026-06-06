/**
 * CodeSnap CLI - 查看片段详情命令
 */
import chalk from 'chalk';
import * as clipboardy from 'clipboardy';
import { SnippetManager } from '../store';
import { renderSnippet, highlightCode, resolveTemplateVariables } from '../utils';

export async function showCommand(
  manager: SnippetManager,
  id: string,
  options: { copy?: boolean; raw?: boolean }
): Promise<void> {
  const snippet = manager.getById(id);

  if (!snippet) {
    // 尝试模糊搜索
    const results = manager.search({ query: id, limit: 1 });
    if (results.length === 0) {
      console.log(chalk.red(`\n❌ 未找到ID或标题包含 "${id}" 的片段\n`));
      return;
    }
    console.log(chalk.yellow(`\n⚠️ 未找到精确匹配，显示最相似结果:\n`));
    console.log(renderSnippet(results[0]));
    return;
  }

  if (options.raw) {
    console.log(resolveTemplateVariables(snippet.code));
    return;
  }

  console.log('\n' + renderSnippet(snippet, true));

  if (options.copy) {
    const codeToCopy = resolveTemplateVariables(snippet.code);
    await clipboardy.write(codeToCopy);
    console.log(chalk.green('\n📋 代码已复制到剪贴板!'));
  }
}
