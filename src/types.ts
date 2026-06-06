/**
 * CodeSnap CLI - 类型定义
 */

export interface Snippet {
  id: string;
  title: string;
  description: string;
  language: string;
  code: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  source?: string;
  variables?: Record<string, string>;
}

export interface SnippetStore {
  version: string;
  snippets: Snippet[];
  lastSync?: string;
  gistId?: string;
}

export interface SearchOptions {
  query?: string;
  language?: string;
  tags?: string[];
  limit?: number;
}

export interface GistConfig {
  token: string;
  gistId?: string;
}

export interface ExportOptions {
  format: 'json' | 'markdown';
  output: string;
  filter?: SearchOptions;
}

export interface TemplateVariable {
  name: string;
  description: string;
  defaultValue: string;
  resolver: () => string;
}
