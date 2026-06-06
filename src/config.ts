/**
 * CodeSnap CLI - 配置管理
 */
import * as path from 'path';
import * as os from 'os';
import * as fs from 'fs-extra';

export const APP_NAME = 'codesnap';
export const APP_VERSION = '1.0.0';

export function getConfigDir(): string {
  const homeDir = os.homedir();
  switch (process.platform) {
    case 'win32':
      return path.join(homeDir, 'AppData', 'Roaming', APP_NAME);
    case 'darwin':
      return path.join(homeDir, 'Library', 'Application Support', APP_NAME);
    default:
      return path.join(homeDir, '.config', APP_NAME);
  }
}

export function getDataFilePath(): string {
  return path.join(getConfigDir(), 'snippets.json');
}

export function getConfigFilePath(): string {
  return path.join(getConfigDir(), 'config.json');
}

export async function ensureConfigDir(): Promise<void> {
  await fs.ensureDir(getConfigDir());
}

export interface AppConfig {
  defaultLanguage?: string;
  editor?: string;
  gistToken?: string;
  gistId?: string;
  autoSync?: boolean;
  theme?: 'dark' | 'light';
}

export async function loadConfig(): Promise<AppConfig> {
  await ensureConfigDir();
  const configPath = getConfigFilePath();
  if (await fs.pathExists(configPath)) {
    return fs.readJson(configPath);
  }
  return {};
}

export async function saveConfig(config: AppConfig): Promise<void> {
  await ensureConfigDir();
  await fs.writeJson(getConfigFilePath(), config, { spaces: 2 });
}
