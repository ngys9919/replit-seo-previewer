export interface IStorage {
  // No persistent storage needed for SEO analyzer
}

export class MemStorage implements IStorage {
  constructor() {}
}
