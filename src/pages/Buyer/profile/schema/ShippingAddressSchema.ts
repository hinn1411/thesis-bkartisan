import { z } from "zod";

export const ShippingAddressSchema = z.object({
  nation: z.string().min(1, "Vui lòng chọn quốc gia của bạn"),
  address: z.string().min(1, "Địa chỉ không được để trống"),
});
