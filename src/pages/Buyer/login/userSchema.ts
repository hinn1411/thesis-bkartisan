import { z } from 'zod';

export const userSchema = z.object({
  username: z.string().min(6, 'Tên tài khoản phải có ít nhất 6 ký tự').trim(),
  password: z.string().min(8, 'Mật khẩu phải có ít nhất 8 kí tự').trim(),
});
