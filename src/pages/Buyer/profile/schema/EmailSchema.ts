import { z } from "zod";

export const EmailSchema = z
  .object({
    password: z.string().min(1, "Mật khẩu không được để trống").trim(),
    email: z
      .string()
      .min(1, "Email không được để trống")
      .email("Email không hợp lệ")
      .trim(),
    confirmedEmail: z
      .string()
      .min(1, "Email nhắc lại không được để trống")
      .email("Email không hợp lệ")
      .trim(),
  })
  .refine((data) => data.email === data.confirmedEmail, {
    message: "Email nhắc lại không đúng",
    path: ["confirmedEmail"],
  });
