# FLOW.CART.COMBO.NORMAL

- [FLOW.CART.COMBO.NORMAL](#flowcartcombonormal)
  - [Tổng quan](#tổng-quan)
  - [Các bước:](#các-bước)
    - [Thêm combo: thêm 1 combo 1A_2B vào cart](#thêm-combo-thêm-1-combo-1a_2b-vào-cart)
      - [FE thêm sản phẩm ảo có property [PE-combo-set] và cart](#fe-thêm-sản-phẩm-ảo-có-property-pe-combo-set-và-cart)
      - [Cart proxy gọi App](#cart-proxy-gọi-app)
      - [App xử lý cart](#app-xử-lý-cart)
    - [Thêm sản phẩm thường: thêm 1 A vào cart](#thêm-sản-phẩm-thường-thêm-1-a-vào-cart)
      - [Cart proxy gọi App](#cart-proxy-gọi-app-1)
      - [App xử lý cart](#app-xử-lý-cart-1)
    - [Thêm combo khác: thêm 1 combo 1A_2B_3C vào cart](#thêm-combo-khác-thêm-1-combo-1a_2b_3c-vào-cart)
      - [FE thêm sản phẩm ảo có property [PE-combo-set] và cart](#fe-thêm-sản-phẩm-ảo-có-property-pe-combo-set-và-cart-1)
      - [Cart proxy gọi App](#cart-proxy-gọi-app-2)
      - [App xử lý cart](#app-xử-lý-cart-2)
    - [Cập nhật combo: chỉnh số lượng combo 1A_2B lên 2, chỉnh số lượng combo 1A_2B_3C lên 3](#cập-nhật-combo-chỉnh-số-lượng-combo-1a_2b-lên-2-chỉnh-số-lượng-combo-1a_2b_3c-lên-3)
      - [FE thêm sản phẩm ảo có property [PE-combo-set] và cart](#fe-thêm-sản-phẩm-ảo-có-property-pe-combo-set-và-cart-2)
      - [Cart proxy gọi App](#cart-proxy-gọi-app-3)
      - [App xử lý cart](#app-xử-lý-cart-3)
    - [Xóa combo: xóa combo 1A_2B_3C](#xóa-combo-xóa-combo-1a_2b_3c)
      - [FE thêm sản phẩm ảo có property [PE-combo-set] và cart](#fe-thêm-sản-phẩm-ảo-có-property-pe-combo-set-và-cart-3)
      - [Cart proxy gọi App](#cart-proxy-gọi-app-4)
      - [App xử lý cart](#app-xử-lý-cart-4)

## Tổng quan
* Thêm combo: thêm 1 combo 1A_2B vào cart

* Thêm sản phẩm thường: thêm 1 A vào cart

* Thêm combo khác: thêm 1 combo 1A_2B_3C vào cart

* Cập nhật combo: chỉnh số lượng combo 1A_2B lên 2, chỉnh số lượng combo 1A_2B_3C lên 3

* Xóa combo: xóa combo 1A_2B_3C

## Các bước:

> Lưu ý: field `__title` không có trong dữ liệu thật, được bổ sung để dễ đọc

### Thêm combo: thêm 1 combo 1A_2B vào cart

----------

#### FE thêm sản phẩm ảo có property [PE-combo-set] và cart

----------

#### Cart proxy gọi App
* data
  ```
  items:
    1   | virtual    | 0        đ | properties: {"PE-combo-set":"{ COMBO_1A_2B: 1 }"}
  attributes:
  ```

----------

#### App xử lý cart

* Dữ liệu trả về:
  ```
  items:
    1   | A          | 100000   đ | properties: {"PE-combo-item":"COMBO_1A_2B | Combo 1 A và 2 B"}
    2   | B          | 0        đ | properties: {"PE-combo-item":"COMBO_1A_2B | Combo 1 A và 2 B"}
  attributes:
    "PE-combo-detail COMBO_1A_2B" : "1"
  ```

### Thêm sản phẩm thường: thêm 1 A vào cart

----------

#### Cart proxy gọi App
* data
  ```
  items:
    1   | A          | 100000   đ | properties: {"PE-combo-item":"COMBO_1A_2B | Combo 1 A và 2 B"}
    2   | B          | 0        đ | properties: {"PE-combo-item":"COMBO_1A_2B | Combo 1 A và 2 B"}
    1   | A          | 100000   đ | 
  attributes:
    "PE-combo-detail COMBO_1A_2B" : "1"
  ```

----------

#### App xử lý cart

* Dữ liệu trả về:
  ```
  items:
    1   | A          | 100000   đ | properties: {"PE-combo-item":"COMBO_1A_2B | Combo 1 A và 2 B"}
    2   | B          | 0        đ | properties: {"PE-combo-item":"COMBO_1A_2B | Combo 1 A và 2 B"}
    1   | A          | 100000   đ | 
  attributes:
    "PE-combo-detail COMBO_1A_2B" : "1"
  ```

----------

### Thêm combo khác: thêm 1 combo 1A_2B_3C vào cart

----------

#### FE thêm sản phẩm ảo có property [PE-combo-set] và cart

----------

#### Cart proxy gọi App
* data
  ```
  items:
    1   | A          | 100000   đ | properties: {"PE-combo-item":"COMBO_1A_2B | Combo 1 A và 2 B"}
    2   | B          | 0        đ | properties: {"PE-combo-item":"COMBO_1A_2B | Combo 1 A và 2 B"}
    1   | A          | 100000   đ | 
    1   | virtual    | 0        đ | properties: {"PE-combo-set":"{ COMBO_1A_2B_3C: 1 }"}
  attributes:
    "PE-combo-detail COMBO_1A_2B" : "1"
  ```

----------

#### App xử lý cart

* Dữ liệu trả về:
  ```
  items:
    1   | A          | 100000   đ | properties: {"PE-combo-item":"COMBO_1A_2B | Combo 1 A và 2 B"}
    2   | B          | 0        đ | properties: {"PE-combo-item":"COMBO_1A_2B | Combo 1 A và 2 B"}
    1   | A          | 100000   đ | 
    1   | A          | 90000    đ | properties: {"PE-combo-item":"COMBO_1A_2B_3C | Combo 1 sp A và 2 sp B và 3 sp C"}
    2   | B          | 90000    đ | properties: {"PE-combo-item":"COMBO_1A_2B_3C | Combo 1 sp A và 2 sp B và 3 sp C"}
    3   | C          | 0        đ | properties: {"PE-combo-item":"COMBO_1A_2B_3C | Combo 1 sp A và 2 sp B và 3 sp C"}
  attributes:
    "PE-combo-detail COMBO_1A_2B" : "1"
    "PE-combo-detail COMBO_1A_2B_3C" : "1"
  ```

### Cập nhật combo: chỉnh số lượng combo 1A_2B lên 2, chỉnh số lượng combo 1A_2B_3C lên 3

----------

#### FE thêm sản phẩm ảo có property [PE-combo-set] và cart

----------

#### Cart proxy gọi App
* data
  ```
  items:
    1   | A          | 100000   đ | properties: {"PE-combo-item":"COMBO_1A_2B | Combo 1 A và 2 B"}
    2   | B          | 0        đ | properties: {"PE-combo-item":"COMBO_1A_2B | Combo 1 A và 2 B"}
    1   | A          | 100000   đ | 
    1   | A          | 90000    đ | properties: {"PE-combo-item":"COMBO_1A_2B_3C | Combo 1 sp A và 2 sp B và 3 sp C"}
    2   | B          | 90000    đ | properties: {"PE-combo-item":"COMBO_1A_2B_3C | Combo 1 sp A và 2 sp B và 3 sp C"}
    3   | C          | 0        đ | properties: {"PE-combo-item":"COMBO_1A_2B_3C | Combo 1 sp A và 2 sp B và 3 sp C"}
    1   | virtual    | 0        đ | properties: {"PE-combo-set":"{ 'COMBO_1A_2B': 2, 'COMBO_1A_2B_3C': 3 }"}
  attributes:
    "PE-combo-detail COMBO_1A_2B" : "1"
    "PE-combo-detail COMBO_1A_2B_3C" : "1"
  ```

----------

#### App xử lý cart

* Dữ liệu trả về:

  ```
  items:
    2   | A          | 100000   đ | properties: {"PE-combo-item":"COMBO_1A_2B | Combo 1 A và 2 B"}
    4   | B          | 0        đ | properties: {"PE-combo-item":"COMBO_1A_2B | Combo 1 A và 2 B"}
    1   | A          | 100000   đ | 
    3   | A          | 90000    đ | properties: {"PE-combo-item":"COMBO_1A_2B_3C | Combo 1 sp A và 2 sp B và 3 sp C"}
    6   | B          | 90000    đ | properties: {"PE-combo-item":"COMBO_1A_2B_3C | Combo 1 sp A và 2 sp B và 3 sp C"}
    9   | C          | 0        đ | properties: {"PE-combo-item":"COMBO_1A_2B_3C | Combo 1 sp A và 2 sp B và 3 sp C"}
  attributes:
    "PE-combo-detail COMBO_1A_2B" : "2"
    "PE-combo-detail COMBO_1A_2B_3C" : "3"
  ```

### Xóa combo: xóa combo 1A_2B_3C

----------

#### FE thêm sản phẩm ảo có property [PE-combo-set] và cart

----------

#### Cart proxy gọi App
* data
  ```
  items:
    1   | A          | 100000   đ | properties: {"PE-combo-item":"COMBO_1A_2B | Combo 1 A và 2 B"}
    2   | B          | 0        đ | properties: {"PE-combo-item":"COMBO_1A_2B | Combo 1 A và 2 B"}
    1   | A          | 100000   đ | 
    1   | A          | 90000    đ | properties: {"PE-combo-item":"COMBO_1A_2B_3C | Combo 1 sp A và 2 sp B và 3 sp C"}
    2   | B          | 90000    đ | properties: {"PE-combo-item":"COMBO_1A_2B_3C | Combo 1 sp A và 2 sp B và 3 sp C"}
    3   | C          | 0        đ | properties: {"PE-combo-item":"COMBO_1A_2B_3C | Combo 1 sp A và 2 sp B và 3 sp C"}
    1   | virtual    | 0        đ | properties: {"PE-combo-set":"{ 'COMBO_1A_2B_3C': 0 }"}
  attributes:
    "PE-combo-detail COMBO_1A_2B" : "1"
    "PE-combo-detail COMBO_1A_2B_3C" : "1"
  ```

----------

#### App xử lý cart

* Dữ liệu trả về:
  ```
  items:
    2   | A          | 100000   đ | properties: {"PE-combo-item":"COMBO_1A_2B | Combo 1 A và 2 B"}
    4   | B          | 0        đ | properties: {"PE-combo-item":"COMBO_1A_2B | Combo 1 A và 2 B"}
    1   | A          | 100000   đ | 
  attributes:
    "PE-combo-detail COMBO_1A_2B" : "2"
  ```