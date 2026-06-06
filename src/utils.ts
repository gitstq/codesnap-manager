/**
 * CodeSnap CLI - 工具函数
 */
import chalk from 'chalk';
import { Snippet } from './types';

export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2, 9);
}

export function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function truncate(str: string, maxLength: number): string {
  if (str.length <= maxLength) return str;
  return str.substring(0, maxLength - 3) + '...';
}

export function highlightCode(code: string, language: string): string {
  // 简化的语法高亮 - 实际使用 highlight.js
  const lines = code.split('\n');
  return lines
    .map((line, index) => {
      const lineNum = chalk.gray(`${(index + 1).toString().padStart(3, '0')} │ `);
      return lineNum + line;
    })
    .join('\n');
}

export function renderSnippet(snippet: Snippet, showCode: boolean = true): string {
  const lines: string[] = [];
  
  lines.push(chalk.cyan('┌' + '─'.repeat(58) + '┐'));
  lines.push(chalk.cyan('│ ') + chalk.bold.white(truncate(snippet.title, 54).padEnd(54)) + chalk.cyan(' │'));
  lines.push(chalk.cyan('├' + '─'.repeat(58) + '┤'));
  
  if (snippet.description) {
    lines.push(chalk.cyan('│ ') + chalk.gray(truncate(snippet.description, 54).padEnd(54)) + chalk.cyan(' │'));
  }
  
  lines.push(
    chalk.cyan('│ ') + 
    chalk.yellow(`📌 ${snippet.language}`.padEnd(15)) + 
    chalk.green(`🏷️ ${snippet.tags.join(', ') || '无标签'}`.padEnd(37)) + 
    chalk.cyan(' │')
  );
  
  lines.push(
    chalk.cyan('│ ') + 
    chalk.gray(`🕐 ${formatDate(snippet.updatedAt)}`.padEnd(56)) + 
    chalk.cyan(' │')
  );
  
  if (showCode && snippet.code) {
    lines.push(chalk.cyan('├' + '─'.repeat(58) + '┤'));
    const codeLines = snippet.code.split('\n').slice(0, 10);
    codeLines.forEach((line) => {
      lines.push(chalk.cyan('│ ') + truncate(line, 56).padEnd(56) + chalk.cyan(' │'));
    });
    if (snippet.code.split('\n').length > 10) {
      lines.push(chalk.cyan('│ ') + chalk.gray('... (更多内容)'.padEnd(56)) + chalk.cyan(' │'));
    }
  }
  
  lines.push(chalk.cyan('└' + '─'.repeat(58) + '┘'));
  
  return lines.join('\n');
}

export function renderStats(total: number, languages: number, tags: number): string {
  const lines: string[] = [];
  lines.push(chalk.bold('📊 统计信息'));
  lines.push(chalk.cyan('─'.repeat(40)));
  lines.push(`  📁 总片段数: ${chalk.green(total.toString())}`);
  lines.push(`  🔤 编程语言: ${chalk.yellow(languages.toString())}`);
  lines.push(`  🏷️ 标签数量: ${chalk.magenta(tags.toString())}`);
  lines.push(chalk.cyan('─'.repeat(40)));
  return lines.join('\n');
}

export function resolveTemplateVariables(code: string): string {
  const variables: Record<string, () => string> = {
    '${DATE}': () => new Date().toISOString().split('T')[0],
    '${TIME}': () => new Date().toLocaleTimeString('zh-CN'),
    '${DATETIME}': () => new Date().toLocaleString('zh-CN'),
    '${FILENAME}': () => 'untitled',
    '${YEAR}': () => new Date().getFullYear().toString(),
    '${MONTH}': () => (new Date().getMonth() + 1).toString().padStart(2, '0'),
    '${DAY}': () => new Date().getDate().toString().padStart(2, '0'),
  };

  let result = code;
  Object.entries(variables).forEach(([key, resolver]) => {
    result = result.replace(new RegExp(key.replace(/[${}]/g, '\\$&'), 'g'), resolver());
  });

  return result;
}
