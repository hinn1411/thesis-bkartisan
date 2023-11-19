import { RowDataPacket, ResultSetHeader } from "mysql2";
import pool from "../config/sqlconnect.js";

export interface User {
  username: string,
  password: string,
  name?: string,
  email: string,
  address?: string,
  numPhone?: string,
  image?: string,
  gender?: 'M' | 'F' | 'U',
  loginType: 'normal' | 'facebook' | 'google',
  createdAt?: Date,
  status: 'N' | 'L' | 'D'
};

class UserModel {

  static async getAll() {
    const [rows] = await pool.query<RowDataPacket[]>(`SELECT * FROM User;`);
    return rows;
  }

  static async findOne(username: string) {
    const [rows] = await pool.query<RowDataPacket[]>(
      `select * from User where username=?`,
      [username]
    );
    return rows[0];
  }

  static async create(newUser: User) {
    try {
      const [inserted] = await pool.query<ResultSetHeader>(
        `INSERT INTO User(username, password, name, email, address, numPhone, image, gender, loginType, status) 
        VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
        `,
        [
          newUser.username, newUser.password, newUser.name, newUser.email, newUser.address,
          newUser.numPhone, newUser.image, newUser.gender, newUser.loginType, newUser.status
        ]
      );

      return inserted;
    } catch (error) {
      console.log(error);
      return undefined;
    }
  }
}

export default UserModel;