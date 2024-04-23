import { z } from 'zod';

export const FormDataSchema = z.object({
  shopName: z
    .string()
    .min(6, 'Tên cửa hàng phải có ít nhất 6 kí tự')
    .max(20, 'Tên cửa hàng có tối đa 20 ký tự')
    .trim(),
  momoPhone: z.string().min(1, 'Tài khoản MoMo không được để trống'),
  firstName: z.string().min(1, 'Họ và tên đệm không được để trống').trim(),
  lastName: z.string().min(1, 'Tên không được để trống').trim(),
  phoneNumber: z.string().length(10, 'Số điện thoại phải có 10 chữ số'),
  email: z.string().email('Email không hợp lệ').trim(),
  city: z.string(),
  district: z.string(),
  ward: z.string(),
  street: z.string().min(1, "Vui lòng nhập tên đường"),
  emailCode: z.string().min(1, 'Mã xác thực không được để trống'),
});
