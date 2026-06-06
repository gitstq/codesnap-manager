#!/usr/bin/env node

/**
 * CodeSnap CLI - 智能代码片段管理工具
 * @version 1.0.0
 * @license MIT
 */

import { Command } from 'commander';
import chalk from 'chalk';
import { SnippetManager } from './store';
import { addCommand } from './commands/add';
import { listCommand } from './commands/list';
import { searchCommand } from './commands/search';
import { showCommand } from './commands/show';
import { editCommand } from './commands/edit';
import { removeCommand } from './commands/remove';
import { exportCommand, importCommand } from './commands/export';
import { syncCommand } from './commands/sync';
import { renderStats } from './utils';

const program = new Command();
const manager = new SnippetManager();

program
  .name('codesnap')
  .description('🚀 智能代码片段管理工具 - 终端原生的开发者效率利器')
  .version('1.0.0', '-v, --version', '显示版本号')
  .helpOption('-h, --help', '显示帮助信息');

// 初始化
program.hook('preAction', async () => {
  await manager.init();
});

// 添加片段
program
  .command('add')
  .alias('a')
  .description('📝 添加新代码片段')
  .action(async () => {
    await addCommand(manager);
  });

// 列出片段
program
  .command('list')
  .alias('ls')
  .description('📋 列出所有代码片段')
  .option('-l, --language <lang>', '按编程语言筛选')
  .option('-t, --tag <tag>', '按标签筛选')
  .option('-n, --limit <number>', '限制显示数量', parseInt)
  .action(async (options) => {
    await listCommand(manager, options);
  });

// 搜索片段
program
  .command('search <query>')
  .alias('s')
  .description('🔍 搜索代码片段')
  .option('-l, --language <lang>', '按编程语言筛选')
  .option('-t, --tag <tag>', '按标签筛选')
  .option('-i, --interactive', '交互式选择')
  .action(async (query, options) => {
    await searchCommand(manager, query, options);
  });

// 查看片段
program
  .command('show <id>')
  .alias('sh')
  .description('👁️ 查看代码片段详情')
  .option('-c, --copy', '复制代码到剪贴板')
  .option('-r, --raw', '仅显示原始代码')
  .action(async (id, options) => {
    await showCommand(manager, id, options);
  });

// 编辑片段
program
  .command('edit <id>')
  .alias('e')
  .description('✏️ 编辑代码片段')
  .action(async (id) => {
    await editCommand(manager, id);
  });

// 删除片段
program
  .command('remove <id>')
  .alias('rm')
  .description('🗑️ 删除代码片段')
  .action(async (id) => {
    await removeCommand(manager, id);
  });

// 导出片段
program
  .command('export')
  .alias('ex')
  .description('📤 导出代码片段')
  .option('-o, --output <path>', '输出文件路径')
  .option('-f, --format <format>', '导出格式 (json|markdown)', 'json')
  .action(async (options) => {
    await exportCommand(manager, options);
  });

// 导入片段
program
  .command('import <file>')
  .alias('im')
  .description('📥 导入代码片段')
  .action(async (file) => {
    await importCommand(manager, file);
  });

// 同步到Gist
program
  .command('sync')
  .alias('sy')
  .description('☁️ 同步到 GitHub Gist')
  .option('-t, --token <token>', 'GitHub Personal Access Token')
  .option('--push', '仅推送到 Gist')
  .option('--pull', '仅从 Gist 拉取')
  .action(async (options) => {
    await syncCommand(manager, options);
  });

// 统计信息
program
  .command('stats')
  .description('📊 显示统计信息')
  .action(async () => {
    const stats = manager.getStats();
    console.log('\n' + renderStats(stats.total, stats.languages, stats.tags));
  });

// 默认命令 - 显示帮助
program
  .command('help [command]')
  .description('显示命令帮助')
  .action((commandName) => {
    if (commandName) {
      const cmd = program.commands.find((c) => c.name() === commandName);
      if (cmd) {
        cmd.help();
      } else {
        console.log(chalk.red(`\n❌ 未知命令: ${commandName}\n`));
      }
    } else {
      program.help();
    }
  });

// 处理未知命令
program.on('command:*', () => {
  console.log(chalk.red(`\n❌ 未知命令: ${program.args.join(' ')}`));
  console.log(chalk.yellow('使用 "codesnap --help" 查看所有可用命令\n'));
  process.exit(1);
});

// 如果没有参数，显示欢迎信息
if (process.argv.length === 2) {
  console.log(chalk.cyan('\n╔════════════════════════════════════════════════════════╗'));
  console.log(chalk.cyan('║') + chalk.bold.white('           🚀 CodeSnap CLI v1.0.0              ') + chalk.cyan('║'));
  console.log(chalk.cyan('║') + chalk.gray('      智能代码片段管理工具 - 开发者效率利器      ') + chalk.cyan('║'));
  console.log(chalk.cyan('╠════════════════════════════════════════════════════════╣'));
  console.log(chalk.cyan('║') + '  📋 codesnap list    - 列出所有片段              ' + chalk.cyan('║'));
  console.log(chalk.cyan('║') + '  📝 codesnap add     - 添加新片段                ' + chalk.cyan('║'));
  console.log(chalk.cyan('║') + '  🔍 codesnap search  - 搜索片段                  ' + chalk.cyan('║'));
  console.log(chalk.cyan('║') + '  👁️ codesnap show    - 查看片段详情              ' + chalk.cyan('║'));
  console.log(chalk.cyan('║') + '  ☁️  codesnap sync    - 同步到 GitHub Gist       ' + chalk.cyan('║'));
  console.log(chalk.cyan('╚════════════════════════════════════════════════════════╝'));
  console.log(chalk.gray('\n使用 "codesnap --help" 查看完整帮助\n'));
} else {
  program.parse(process.argv);
}
