import { z } from 'zod';

export const userSchema = z.object({
  username: z.string().min(6, 'Tên tài khoản phải có ít nhất 6 ký tự').regex(/^[A-Za-z][A-Za-z0-9_]{7,29}$/, 'Tên tài khoản chỉ được chứa chữ cái, số và dấu "_".').trim(),
  password: z.string().min(8, 'Mật khẩu phải có ít nhất 8 kí tự').trim(),
});
