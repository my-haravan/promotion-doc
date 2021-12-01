# FLOW.CART.COMBO.WRONG

## Sản phẩm ảo không hợp lệ
* Do:
  * property value không hợp lệ
* Xử lý:
  * trả lỗi

## Thông tin combo trong cart không hợp lệ
* Do:
  * attribute combo không hợp lệ
  * property combo item không hợp lệ
* Xử lý:
  * cập nhật cart:
    * Xóa các thông tin của combo đó ra khỏi cart, bao gồm:
      * attribute combo
      * lines combo item

## Combo không khả dụng
* Do:
  * không tìm thấy combo
  * thời gian không hợp lệ
  * trạng thái không hợp lệ
* Xử lý:
  * trả lỗi

## Dữ liệu sản phẩm của combo trong cart không hợp lệ
* Do:
  * thiếu sản phẩm
  * sai số lượng
  * sai giá
  * ...
* Xử lý:
  * cập nhật cart:
    * Xóa các thông tin của combo đó ra khỏi cart, bao gồm:
      * attribute combo
      * lines combo item