import { QueryResult } from 'pg';
import { conectar } from '../database';

class ContactModel {
  async index(): Promise<any[]> {
    const conn = await conectar();
    const data: QueryResult = await conn.query('SELECT * FROM contacts');
    return data.rows;
  }

  async save(nome: string, telefone: string): Promise<QueryResult> {
    const conn = await conectar();
    const sql = 'INSERT INTO contacts(nome, telefone) VALUES ($1, $2);';
    const values = [nome, telefone];
    return await conn.query(sql, values);
  }

  async find(id: number): Promise<any[]> {
    const conn = await conectar();
    const sql = 'SELECT * FROM contacts WHERE id=$1;';
    const values = [id];
    const data: QueryResult = await conn.query(sql, values);
    return data.rows;
  }

  async update(id: number, contact: { nome: string; telefone: string }): Promise<QueryResult> {
    const conn = await conectar();
    const sql = 'UPDATE contacts SET nome=$1, telefone=$2 WHERE id=$3';
    const values = [contact.nome, contact.telefone, id];
    return await conn.query(sql, values);
  }

  async remove(id: number): Promise<QueryResult> {
    const conn = await conectar();
    const sql = 'DELETE FROM contacts WHERE id=$1;';
    return await conn.query(sql, [id]);
  }
}

export default new ContactModel();
