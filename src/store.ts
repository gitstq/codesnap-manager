/**
 * CodeSnap CLI - 数据存储管理
 */
import * as fs from 'fs-extra';
import { v4 as uuidv4 } from 'uuid';
import { Snippet, SnippetStore, SearchOptions } from './types';
import { getDataFilePath, ensureConfigDir } from './config';
import Fuse from 'fuse.js';

const CURRENT_VERSION = '1.0.0';

export class SnippetManager {
  private store: SnippetStore;
  private dataPath: string;

  constructor() {
    this.dataPath = getDataFilePath();
    this.store = {
      version: CURRENT_VERSION,
      snippets: [],
    };
  }

  async init(): Promise<void> {
    await ensureConfigDir();
    if (await fs.pathExists(this.dataPath)) {
      try {
        const data = await fs.readJson(this.dataPath);
        this.store = {
          version: data.version || CURRENT_VERSION,
          snippets: data.snippets || [],
          lastSync: data.lastSync,
          gistId: data.gistId,
        };
      } catch {
        this.store = { version: CURRENT_VERSION, snippets: [] };
      }
    }
  }

  async save(): Promise<void> {
    await fs.writeJson(this.dataPath, this.store, { spaces: 2 });
  }

  getAll(): Snippet[] {
    return [...this.store.snippets].sort(
      (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    );
  }

  getById(id: string): Snippet | undefined {
    return this.store.snippets.find((s) => s.id === id);
  }

  async add(snippet: Omit<Snippet, 'id' | 'createdAt' | 'updatedAt'>): Promise<Snippet> {
    const now = new Date().toISOString();
    const newSnippet: Snippet = {
      ...snippet,
      id: uuidv4(),
      createdAt: now,
      updatedAt: now,
    };
    this.store.snippets.push(newSnippet);
    await this.save();
    return newSnippet;
  }

  async update(id: string, updates: Partial<Omit<Snippet, 'id' | 'createdAt'>>): Promise<Snippet | null> {
    const index = this.store.snippets.findIndex((s) => s.id === id);
    if (index === -1) return null;

    this.store.snippets[index] = {
      ...this.store.snippets[index],
      ...updates,
      updatedAt: new Date().toISOString(),
    };
    await this.save();
    return this.store.snippets[index];
  }

  async delete(id: string): Promise<boolean> {
    const initialLength = this.store.snippets.length;
    this.store.snippets = this.store.snippets.filter((s) => s.id !== id);
    if (this.store.snippets.length !== initialLength) {
      await this.save();
      return true;
    }
    return false;
  }

  search(options: SearchOptions): Snippet[] {
    let results = this.getAll();

    if (options.language) {
      results = results.filter(
        (s) => s.language.toLowerCase() === options.language!.toLowerCase()
      );
    }

    if (options.tags && options.tags.length > 0) {
      results = results.filter((s) =>
        options.tags!.some((tag) => s.tags.includes(tag.toLowerCase()))
      );
    }

    if (options.query) {
      const fuse = new Fuse(results, {
        keys: ['title', 'description', 'code', 'tags'],
        threshold: 0.4,
        includeScore: true,
      });
      results = fuse.search(options.query).map((r) => r.item);
    }

    if (options.limit) {
      results = results.slice(0, options.limit);
    }

    return results;
  }

  getLanguages(): string[] {
    const langs = new Set(this.store.snippets.map((s) => s.language));
    return Array.from(langs).sort();
  }

  getTags(): string[] {
    const tags = new Set<string>();
    this.store.snippets.forEach((s) => s.tags.forEach((t) => tags.add(t)));
    return Array.from(tags).sort();
  }

  async importData(data: SnippetStore): Promise<void> {
    this.store = {
      ...data,
      version: CURRENT_VERSION,
    };
    await this.save();
  }

  exportData(): SnippetStore {
    return { ...this.store };
  }

  getStats(): { total: number; languages: number; tags: number } {
    return {
      total: this.store.snippets.length,
      languages: this.getLanguages().length,
      tags: this.getTags().length,
    };
  }
}
