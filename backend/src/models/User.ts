import mongoose, { Schema } from 'mongoose';

export interface IUser {
  username: string,
  name?: string,
  password: string,
  email: string,
  phone?: string
};

const userSchema = new Schema<IUser>({
  username: {type: String, required: true},
  name: String,
  password: {type: String, required: true},
  email: {type: String, required: true},
  phone: String
});

export default mongoose.model<IUser>("User", userSchema);
