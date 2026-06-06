/**
 * CodeSnap CLI - 导出命令
 */
import * as fs from 'fs-extra';
import * as path from 'path';
import chalk from 'chalk';
import { SnippetManager } from '../store';
import { Snippet } from '../types';

export async function exportCommand(
  manager: SnippetManager,
  options: { output?: string; format?: string }
): Promise<void> {
  const outputPath = options.output || path.join(process.cwd(), `codesnap-export.${options.format || 'json'}`);
  const format = options.format || 'json';

  const snippets = manager.getAll();

  if (snippets.length === 0) {
    console.log(chalk.yellow('\n⚠️ 没有可导出的片段\n'));
    return;
  }

  try {
    if (format === 'json') {
      const data = {
        version: '1.0.0',
        exportedAt: new Date().toISOString(),
        snippets,
      };
      await fs.writeJson(outputPath, data, { spaces: 2 });
    } else if (format === 'markdown') {
      const lines: string[] = ['# CodeSnap 代码片段集合\n'];
      lines.push(`> 导出时间: ${new Date().toLocaleString('zh-CN')}\n`);

      snippets.forEach((snippet) => {
        lines.push(`## ${snippet.title}\n`);
        if (snippet.description) {
          lines.push(`${snippet.description}\n`);
        }
        lines.push(`- **语言**: ${snippet.language}`);
        lines.push(`- **标签**: ${snippet.tags.join(', ') || '无'}`);
        lines.push(`- **更新时间**: ${snippet.updatedAt}\n`);
        lines.push('```' + snippet.language);
        lines.push(snippet.code);
        lines.push('```\n');
      });

      await fs.writeFile(outputPath, lines.join('\n'));
    }

    console.log(chalk.green(`\n✅ 成功导出 ${snippets.length} 个片段到:`));
    console.log(chalk.cyan(`   ${outputPath}\n`));
  } catch (error) {
    console.log(chalk.red(`\n❌ 导出失败: ${error}\n`));
  }
}

export async function importCommand(
  manager: SnippetManager,
  filePath: string
): Promise<void> {
  try {
    if (!await fs.pathExists(filePath)) {
      console.log(chalk.red(`\n❌ 文件不存在: ${filePath}\n`));
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    let snippets: any[] = [];

    if (ext === '.json') {
      const data = await fs.readJson(filePath);
      snippets = data.snippets || data;
    } else {
      console.log(chalk.red(`\n❌ 不支持的文件格式: ${ext}\n`));
      return;
    }

    let imported = 0;
    for (const snippet of snippets) {
      await manager.add({
        title: snippet.title || '未命名片段',
        description: snippet.description || '',
        language: snippet.language || 'text',
        code: snippet.code || '',
        tags: snippet.tags || [],
      });
      imported++;
    }

    console.log(chalk.green(`\n✅ 成功导入 ${imported} 个片段\n`));
  } catch (error) {
    console.log(chalk.red(`\n❌ 导入失败: ${error}\n`));
  }
}
