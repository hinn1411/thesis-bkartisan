import { z } from 'zod';

export const registerSchema = z
  .object({
    username: z.string().min(6, 'Tên tài khoản phải có ít nhất 6 ký tự').trim(),
    password: z.string().min(8, 'Mật khẩu phải có ít nhất 8 kí tự').trim(),
    email: z.string().email('Email không hợp lệ').trim(),
    confirmedPassword: z
      .string()
      .min(8, 'Mật khẩu nhắc lại phải có 8 ký tự')
      .trim(),
  })
  .refine((data) => data.password === data.confirmedPassword, {
    message: 'Mật khẩu nhắc lại không đúng',
    path: ['confirmedPassword'],
  });
