import { z } from "zod";

export const FormDataSchema = z.object({
  shopName: z
    .string()
    .min(6, "Tên cửa hàng phải có ít nhất 6 kí tự")
    .max(20, "Tên cửa hàng có tối đa 20 ký tự")
    .trim(),
  name: z.string().min(1, { message: "Họ và tên không được để trống" }).trim(),
  numPhone: z.string().length(10, "Số điện thoại phải có 10 chữ số"),
  email: z.string().email("Email không hợp lệ").trim(),
  nation: z.string().min(1, "Vui lòng chọn quốc gia"),
  address: z.string().min(1, "Vui lòng nhập địa chỉ "),
  emailCode: z.string().min(1, "Mã xác thực không được để trống"),
});
