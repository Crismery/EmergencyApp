import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { EmergencyLog } from '../app/emergencia';

@Injectable({
  providedIn: 'root'
})
export class EmergenciasService {
  private db?: SQLiteObject;

  constructor(private sqlite: SQLite) {
    this.createDatabase(); 
  }

 
  async createDatabase(): Promise<void> {
    try {
      this.db = await this.sqlite.create({
        name: 'emergency_logs.db',
        location: 'default',
      });
      await this.db.executeSql('CREATE TABLE IF NOT EXISTS logs (id INTEGER PRIMARY KEY AUTOINCREMENT, fecha TEXT, titulo TEXT, descripcion TEXT, foto TEXT)', []);
      console.log('Tabla de registros creada');
    } catch (error) {
      console.error('Error al abrir o crear la base de datos', error);
      throw error;
    }
  }
  
  async addLog(log: EmergencyLog): Promise<void> {
    try {
      if (this.db) {
        await this.db.executeSql('INSERT INTO logs (fecha, titulo, descripcion, foto) VALUES (?, ?, ?, ?)', [log.fecha, log.titulo, log.descripcion, log.foto]);
        console.log('Registro añadido');
      } else {
        console.error('Base de datos no creada');
      }
    } catch (error) {
      console.error('Error al añadir el registro', error);
      throw error;
    }
  }
  
  async getLogs(): Promise<EmergencyLog[]> {
    try {
      if (this.db) {
        const data = await this.db.executeSql('SELECT * FROM logs', []);
        let logs: EmergencyLog[] = [];
        for (let i = 0; i < data.rows.length; i++) {
          logs.push(data.rows.item(i));
        }
        return logs;
      } else {
        console.error('Base de datos no creada');
        return [];
      }
    } catch (error) {
      console.error('Error al obtener registros', error);
      throw error;
    }
  }
}