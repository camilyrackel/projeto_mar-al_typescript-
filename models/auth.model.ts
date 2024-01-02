import { QueryResult } from 'db';
import { conectar } from '../database/';

class AuthModel {
  async login(username: string, password: string): Promise<any> {
    const conn = await conectar();
    const sql = 'SELECT * FROM public.users WHERE username=$1 AND password=$2;';
    const values = [username, password];
    const data: QueryResult = await conn.query(sql, values);

    return data.rows[0];
  }
}

export default new AuthModel();