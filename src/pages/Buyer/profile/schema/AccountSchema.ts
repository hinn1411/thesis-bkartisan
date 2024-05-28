import { z } from "zod";

export const AccountSchema = z.object({
  avatar: z.any(),
  name: z.string().min(1, "Tên người dùng không được để trống"),
  gender: z.enum(["1", "0"]),
  numPhone: z.string().min(1, "Số điện thoại không được để trống"),
});
