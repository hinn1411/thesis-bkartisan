import { z } from "zod";

export const AddressSchema = z.object({
  name: z.string().min(1, "Tên không được để trống"),
  numPhone: z.string().min(1, "Số điện thoại không được để trống"),
  nation: z.string().min(1, "Quốc gia không được để trống"),
  address: z.string().min(1, "Địa chỉ không được để trống"),
});
