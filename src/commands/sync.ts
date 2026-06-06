/**
 * CodeSnap CLI - GitHub Gist 同步命令
 */
import * as axios from 'axios';
import chalk from 'chalk';
import * as inquirer from 'inquirer';
import { SnippetManager } from '../store';
import { loadConfig, saveConfig } from '../config';

const GIST_API_URL = 'https://api.github.com/gists';

export async function syncCommand(
  manager: SnippetManager,
  options: { token?: string; push?: boolean; pull?: boolean }
): Promise<void> {
  const config = await loadConfig();
  let token = options.token || config.gistToken;

  if (!token) {
    const answer = await inquirer.prompt([
      {
        type: 'password',
        name: 'token',
        message: '请输入 GitHub Personal Access Token:',
        mask: '*',
      },
    ]);
    token = answer.token;

    const { save } = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'save',
        message: '是否保存 Token 以供将来使用?',
        default: true,
      },
    ]);

    if (save) {
      config.gistToken = token;
      await saveConfig(config);
    }
  }

  if (!token) {
    console.log(chalk.red('\n❌ 需要提供 GitHub Token\n'));
    return;
  }

  try {
    if (options.push || (!options.push && !options.pull)) {
      await pushToGist(manager, token);
    }
    if (options.pull || (!options.push && !options.pull)) {
      await pullFromGist(manager, token);
    }
  } catch (error: any) {
    if (error.response?.status === 401) {
      console.log(chalk.red('\n❌ Token 无效或已过期\n'));
    } else if (error.response?.status === 404) {
      console.log(chalk.red('\n❌ Gist 不存在\n'));
    } else {
      console.log(chalk.red(`\n❌ 同步失败: ${error.message}\n`));
    }
  }
}

async function pushToGist(manager: SnippetManager, token: string): Promise<void> {
  const config = await loadConfig();
  const snippets = manager.getAll();
  const data = {
    description: 'CodeSnap 代码片段集合',
    public: false,
    files: {
      'codesnap-snippets.json': {
        content: JSON.stringify({ version: '1.0.0', snippets }, null, 2),
      },
    },
  };

  const headers = {
    Authorization: `token ${token}`,
    'Content-Type': 'application/json',
  };

  if (config.gistId) {
    await axios.default.patch(`${GIST_API_URL}/${config.gistId}`, data, { headers });
    console.log(chalk.green('\n✅ 已更新到 GitHub Gist'));
  } else {
    const response = await axios.default.post(GIST_API_URL, data, { headers });
    config.gistId = response.data.id;
    await saveConfig(config);
    console.log(chalk.green('\n✅ 已创建新的 GitHub Gist'));
  }

  console.log(chalk.cyan(`   片段数: ${snippets.length}\n`));
}

async function pullFromGist(manager: SnippetManager, token: string): Promise<void> {
  const config = await loadConfig();

  if (!config.gistId) {
    console.log(chalk.yellow('\n⚠️ 没有找到 Gist ID，请先执行推送操作\n'));
    return;
  }

  const headers = {
    Authorization: `token ${token}`,
  };

  const response = await axios.default.get(`${GIST_API_URL}/${config.gistId}`, { headers });
  const fileContent = response.data.files['codesnap-snippets.json']?.content;

  if (fileContent) {
    const data = JSON.parse(fileContent);
    if (data.snippets && Array.isArray(data.snippets)) {
      await manager.importData({ version: '1.0.0', snippets: data.snippets });
      console.log(chalk.green(`\n✅ 已从 Gist 拉取 ${data.snippets.length} 个片段\n`));
    }
  }
}
