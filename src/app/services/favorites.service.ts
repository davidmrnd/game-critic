import { Injectable } from '@angular/core';
// Instala: npm install @capacitor-community/sqlite
import { Capacitor } from '@capacitor/core';
import { CapacitorSQLite, SQLiteConnection, SQLiteDBConnection } from '@capacitor-community/sqlite';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  private sqlite = CapacitorSQLite;
  private db: SQLiteDBConnection | null = null;

  constructor() {
    this.init();
  }

  async init() {
    // Solo inicializa en plataforma nativa (Android/iOS)
    if (Capacitor.isNativePlatform()) {
      try {
        const sqliteConnection = new SQLiteConnection(this.sqlite);
        this.db = await sqliteConnection.createConnection('favoritesdb', false, 'no-encryption', 1, false);
        await this.db.open();
        await this.db.execute(`
          CREATE TABLE IF NOT EXISTS favorites (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            userId TEXT,
            videogameId TEXT,
            title TEXT,
            imageprofile TEXT,
            description TEXT
          );
        `);
      } catch (err) {
        console.error('Error inicializando SQLite:', err);
        this.db = null;
      }
    } else {
      // Si no es plataforma nativa, deja db en null
      this.db = null;
    }
  }

  async getFavoritesByUserId(userId: string): Promise<any[]> {
    if (!this.db) await this.init();
    const res = await this.db!.query('SELECT * FROM favorites WHERE userId = ?', [userId]);
    return res.values || [];
  }

  async addFavorite(userId: string, videogame: any): Promise<void> {
    if (!this.db) {
      await this.init();
    }
    if (!this.db) {
      // Solo muestra un mensaje de advertencia si no es móvil, no lances error
      console.warn('Función de favoritos solo disponible en dispositivos móviles.');
      return;
    }
    await this.db.run(
      'INSERT INTO favorites (userId, videogameId, title, imageprofile, description) VALUES (?, ?, ?, ?, ?)',
      [userId, videogame.id, videogame.title, videogame.imageprofile, videogame.description]
    );
  }

  async removeFavorite(userId: string, videogameId: string): Promise<void> {
    if (!this.db) {
      await this.init();
    }
    if (!this.db) {
      // Solo muestra un mensaje de advertencia si no es móvil, no lances error
      console.warn('Función de favoritos solo disponible en dispositivos móviles.');
      return;
    }
    await this.db.run(
      'DELETE FROM favorites WHERE userId = ? AND videogameId = ?',
      [userId, videogameId]
    );
  }

  async isFavorite(userId: string, videogameId: string): Promise<boolean> {
    if (!this.db) await this.init();
    const res = await this.db!.query(
      'SELECT * FROM favorites WHERE userId = ? AND videogameId = ?',
      [userId, videogameId]
    );
    return (res.values || []).length > 0;
  }
}
