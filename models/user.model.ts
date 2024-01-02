import { QueryResult } from 'db';
import { conectar } from '../database/';

class UserModel {
  async index(): Promise<any[]> {
    const conn = await conectar();
    const data: QueryResult = await conn.query('SELECT * FROM public.users');
    return data.rows;
  }

  async save(name: string, username: string, password: string): Promise<QueryResult | null> {
    const conn = await conectar();
    if (conn) {
      const sql = 'INSERT INTO public.users(name, username, password) VALUES ($1, $2, $3);';
      const values = [name, username, password];
      const result: QueryResult = await conn.query(sql, values);
      return result;
    } else {
      console.log('Não foi possível estabelecer a conexão.');
      return null;
    }
  }

  async find(id: number): Promise<any[]> {
    const conn = await conectar();
    const sql = 'SELECT * FROM public.users WHERE id=$1;';
    const values = [id];
    const data: QueryResult = await conn.query(sql, values);
    return data.rows;
  }

  async update(id: number, user: { name: string; username: string; password: string }): Promise<QueryResult> {
    const conn = await conectar();
    const sql = 'UPDATE public.users SET name=$1, username=$2, password=$3 WHERE id=$4';
    const values = [user.name, user.username, user.password, id];
    return await conn.query(sql, values);
  }

  async remove(id: number): Promise<QueryResult> {
    const conn = await conectar();
    const sql = 'DELETE FROM public.users where id=$1;';
    return await conn.query(sql, [id]);
  }

  async checkUserExists(username: string): Promise<boolean> {
    const conn = await conectar();
    const sql = 'SELECT * FROM public.users WHERE username=$1;';
    const values = [username];
    const data: QueryResult = await conn.query(sql, values);
    return data.rows.length > 0;
  }
}

export default new UserModel();
