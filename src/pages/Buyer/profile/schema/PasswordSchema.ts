import { z } from "zod";

export const PasswordSchema = z
  .object({
    currentPassword: z.string().min(1, "Mật khẩu không được để trống").trim(),
    newPassword: z
      .string()
      .min(8, "Mật khẩu mới phải có ít nhất 8 ký tự")
      .trim(),
    confirmedPassword: z
      .string()
      .min(8, "Mật khẩu nhắc lại phải có ít nhất 8 ký tự")
      .trim(),
  })
  .refine((data) => data.newPassword === data.confirmedPassword, {
    message: "Mật khẩu nhắc lại không đúng",
    path: ["confirmedPassword"],
  });
