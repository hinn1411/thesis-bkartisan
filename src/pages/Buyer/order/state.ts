export enum ORDER_STATES {
  ALL = "Tất cả",
  CONFIRMING = "Chờ xác nhận", // init khi người dùng tạo đơn hàng
  PROCESSING = "Đang xử lý", // người mua  đã thanh toán
  PREPARING = "Chờ lấy hàng", // người bán đã xác nhận
  SHIPPING = "Đang vận chuyển", // người bán đã xác nhận
  DONE = "Đã giao", // người mua đã xác nhận
  REQUIRE_RETURN = "Yêu cầu trả hàng", // người mua yêu cầu
  DENY_RETURN = "Từ chối trả hàng", // người bán chấp nhận
  RETURNED = "Đã trả hàng", // Người bán xác nhận, admin xác nhận hoàn tiền
  CANCELED = "Đã hủy", // Đang ở bước đang xử lý, người mua hủy thì hoàn tiền
}
