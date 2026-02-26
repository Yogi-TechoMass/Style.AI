import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const db = new Database('wardrobe.db');

// Initialize database
db.exec(`
  CREATE TABLE IF NOT EXISTS wardrobe (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    color TEXT,
    material TEXT,
    style TEXT,
    occasion TEXT,
    pattern TEXT,
    imageUrl TEXT NOT NULL,
    date TEXT NOT NULL,
    isFavorite INTEGER DEFAULT 0,
    analysisResult TEXT
  )
`);

export const saveToWardrobe = (item: any) => {
  const stmt = db.prepare(`
    INSERT INTO wardrobe (id, name, category, color, material, style, occasion, pattern, imageUrl, date, isFavorite, analysisResult)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);
  
  return stmt.run(
    item.id,
    item.name,
    item.category,
    item.color || null,
    item.material || null,
    item.style || null,
    item.occasion || null,
    item.pattern || null,
    item.imageUrl,
    item.date,
    item.isFavorite ? 1 : 0,
    JSON.stringify(item.analysisResult)
  );
};

export const getWardrobe = () => {
  const stmt = db.prepare('SELECT * FROM wardrobe ORDER BY date DESC');
  const rows = stmt.all();
  return rows.map((row: any) => ({
    ...row,
    isFavorite: row.isFavorite === 1,
    analysisResult: row.analysisResult ? JSON.parse(row.analysisResult) : null
  }));
};

export const toggleFavorite = (id: string, isFavorite: boolean) => {
  const stmt = db.prepare('UPDATE wardrobe SET isFavorite = ? WHERE id = ?');
  return stmt.run(isFavorite ? 1 : 0, id);
};

export const deleteFromWardrobe = (id: string) => {
  const stmt = db.prepare('DELETE FROM wardrobe WHERE id = ?');
  return stmt.run(id);
};
