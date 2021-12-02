# FLOW.CART.COMBO.NORMAL

- [FLOW.CART.COMBO.NORMAL](#flowcartcombonormal)
  - [Tổng quan](#tổng-quan)
  - [Các bước:](#các-bước)
    - [Thêm combo: thêm 1 combo 1A_2B gồm 1 A (giá 90k) và 2 B (giá 0) vào cart](#thêm-combo-thêm-1-combo-1a_2b-gồm-1-a-giá-90k-và-2-b-giá-0-vào-cart)
      - [FE thêm sản phẩm ảo có property [PE-combo-set] và cart](#fe-thêm-sản-phẩm-ảo-có-property-pe-combo-set-và-cart)
      - [Cart proxy gọi App](#cart-proxy-gọi-app)
      - [App xử lý cart](#app-xử-lý-cart)
    - [Thêm sản phẩm thường: thêm 1 A (giá 100k) vào cart](#thêm-sản-phẩm-thường-thêm-1-a-giá-100k-vào-cart)
      - [Cart proxy gọi App](#cart-proxy-gọi-app-1)
      - [App xử lý cart](#app-xử-lý-cart-1)
    - [Thêm combo khác: thêm 1 combo 1A_2B_3C gồm 1 A (giá 100k) và 2 B (giá 90k) và 3 C (giá 0) vào cart](#thêm-combo-khác-thêm-1-combo-1a_2b_3c-gồm-1-a-giá-100k-và-2-b-giá-90k-và-3-c-giá-0-vào-cart)
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
* Thêm combo: thêm 1 combo 1A_2B gồm 1 A (giá 90k) và 2 B (giá 0) vào cart

* Thêm sản phẩm thường: thêm 1 A (giá 100k) vào cart

* Thêm combo khác: thêm 1 combo 1A_2B_3C gồm 1 A (giá 100k) và 2 B (giá 90k) và 3 C (giá 0) vào cart

* Cập nhật combo: chỉnh số lượng combo 1A_2B lên 2, chỉnh số lượng combo 1A_2B_3C lên 3
  * Ta được cart như sau:
    ```
    2 A (giá 90k) thuộc combo 1A_2B
    4 B (giá 0) thuộc combo 1A_2B
    1 A (giá 100k)
    3 A (giá 100k) thuộc combo 1A_2B_3C
    6 B (giá 90k) thuộc combo 1A_2B_3C
    9 C (giá 0) thuộc combo 1A_2B_3C
    ```

* Xóa combo: xóa combo 1A_2B_3C
  * Ta được cart như sau:
    ```
    2 A (giá 90k) thuộc combo 1A_2B
    4 B (giá 0) thuộc combo 1A_2B
    1 A (giá 100k)
    ```

## Các bước:

> Lưu ý: field `__title` không có trong dữ liệu thật, được bổ sung để dễ đọc

### Thêm combo: thêm 1 combo 1A_2B gồm 1 A (giá 90k) và 2 B (giá 0) vào cart

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

  ```json
  {
    "items": [
      {
        "__title": "virtual",
        "_id": 10000,
        "price_original": 0,
        "price": 0,
        "line_price": 0,
        "quantity": 1,
        "variant_id": 9999,
        "product_id": 9999,
        "not_allow_promotion": false,
        "PromotionRef": null,
        "PromotionByProductId": null,
        "properties": {
          "PE-combo-set": "{ COMBO_1A_2B: 1 }"
        },
      }
    ],
    "items_recommended": [],
    "has_promotion": false,
    "attributes": {},
    "is_allow_coupon": true,
    "customer_id": null,
    "customer_group_ids": [],
    "source_name": "web",
    "location_id": null,
    "token": "619b4219a8a30c19dce80196"
  }
  ```

----------

#### App xử lý cart
* Thực hiện
  * Phân tích thông tin combo trong cart
    * Tìm thấy
      * COMBO_1A_2B:
        * có sản phẩm ảo hợp lệ
  * Lấy danh sách combo [COMBO_1A_2B] từ DB
  * Kiểm tra combo khả dụng: hợp lệ
  * Thêm combo COMBO_1A_2B vào cart
    * Thêm combo item
    * Ghi attribute
  * Xóa sản phẩm ảo

* Dữ liệu trả về:
  ```
  items:
    1   | A          | 100000   đ | properties: {"PE-combo-item":"COMBO_1A_2B | Combo 1 A và 2 B"}
    2   | B          | 0        đ | properties: {"PE-combo-item":"COMBO_1A_2B | Combo 1 A và 2 B"}
  attributes:
    "PE-combo-detail COMBO_1A_2B" : "1"
  ```

  ```json
  {
    "items": [
      {
        "__title": "A",
        "_id": 0,
        "not_allow_promotion": false,
        "PromotionRef": "COMBO_1A_2B",
        "PromotionByProductId": null,
        "properties": {
          "PE-combo-item": "COMBO_1A_2B | Combo 1 A và 2 B"
        },
        "product_id": 1,
        "variant_id": 1,
        "price_original": 100000,
        "price": 100000,
        "quantity": 1
      },
      {
        "__title": "B",
        "_id": 0,
        "not_allow_promotion": false,
        "PromotionRef": "COMBO_1A_2B",
        "PromotionByProductId": null,
        "properties": {
          "PE-combo-item": "COMBO_1A_2B | Combo 1 A và 2 B"
        },
        "product_id": 2,
        "variant_id": 2,
        "price_original": 90000,
        "price": 0,
        "quantity": 2
      }
    ],
    "items_recommended": [],
    "has_promotion": false,
    "attributes": {
      "PE-combo-detail COMBO_1A_2B": "1"
    },
    "is_allow_coupon": true,
    "customer_id": null,
    "customer_group_ids": [],
    "source_name": "web",
    "location_id": null,
    "token": "619b4219a8a30c19dce80196"
  }
  ```

### Thêm sản phẩm thường: thêm 1 A (giá 100k) vào cart

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

  ```json
  {
    "items": [
      {
        "__title": "A",
        "_id": 1002,
        "not_allow_promotion": false,
        "PromotionRef": null,
        "PromotionByProductId": null,
        "properties": {
          "PE-combo-item": "COMBO_1A_2B | Combo 1 A và 2 B"
        },
        "product_id": 1,
        "variant_id": 1,
        "price_original": 100000,
        "price": 100000,
        "quantity": 1
      },
      {
        "__title": "B",
        "_id": 1001,
        "not_allow_promotion": false,
        "PromotionRef": null,
        "PromotionByProductId": null,
        "properties": {
          "PE-combo-item": "COMBO_1A_2B | Combo 1 A và 2 B"
        },
        "product_id": 2,
        "variant_id": 2,
        "price_original": 90000,
        "price": 0,
        "quantity": 2
      },
      {
        "__title": "A",
        "_id": 1003,
        "not_allow_promotion": false,
        "PromotionRef": null,
        "PromotionByProductId": null,
        "properties": {},
        "product_id": 1,
        "variant_id": 1,
        "price_original": 100000,
        "price": 100000,
        "quantity": 1
      },
    ],
    "items_recommended": [],
    "has_promotion": false,
    "attributes": {
      "PE-combo-detail COMBO_1A_2B": "1"
    },
    "is_allow_coupon": true,
    "customer_id": null,
    "customer_group_ids": [],
    "source_name": "web",
    "location_id": null,
    "token": "619b4219a8a30c19dce80196"
  }
  ```

----------

#### App xử lý cart
* Thực hiện
  * Phân tích thông tin combo trong cart
    * Tìm thấy
      * COMBO_1A_2B:
        * có attribute hợp lệ
        * có property combo item hợp lệ
  * Lấy danh sách combo [COMBO_1A_2B] từ DB
  * Kiểm tra combo khả dụng: hợp lệ
  * trả kết quả

* Dữ liệu trả về:
  ```
  items:
    1   | A          | 100000   đ | properties: {"PE-combo-item":"COMBO_1A_2B | Combo 1 A và 2 B"}
    2   | B          | 0        đ | properties: {"PE-combo-item":"COMBO_1A_2B | Combo 1 A và 2 B"}
    1   | A          | 100000   đ | 
  attributes:
    "PE-combo-detail COMBO_1A_2B" : "1"
  ```

  ```json
  {
    "items": [
      {
        "__title": "A",
        "_id": 1002,
        "not_allow_promotion": false,
        "PromotionRef": "COMBO_1A_2B",
        "PromotionByProductId": null,
        "properties": {
          "PE-combo-item": "COMBO_1A_2B | Combo 1 A và 2 B"
        },
        "product_id": 1,
        "variant_id": 1,
        "price_original": 100000,
        "price": 100000,
        "quantity": 1
      },
      {
        "__title": "B",
        "_id": 1001,
        "not_allow_promotion": false,
        "PromotionRef": "COMBO_1A_2B",
        "PromotionByProductId": null,
        "properties": {
          "PE-combo-item": "COMBO_1A_2B | Combo 1 A và 2 B"
        },
        "product_id": 2,
        "variant_id": 2,
        "price_original": 90000,
        "price": 0,
        "quantity": 2
      },
      {
        "__title": "A",
        "_id": 1003,
        "not_allow_promotion": false,
        "PromotionRef": null,
        "PromotionByProductId": null,
        "properties": {},
        "product_id": 1,
        "variant_id": 1,
        "price_original": 100000,
        "price": 100000,
        "quantity": 1
      },
    ],
    "items_recommended": [],
    "has_promotion": false,
    "attributes": {
      "PE-combo-detail COMBO_1A_2B": "1"
    },
    "is_allow_coupon": true,
    "customer_id": null,
    "customer_group_ids": [],
    "source_name": "web",
    "location_id": null,
    "token": "619b4219a8a30c19dce80196"
  }
  ```

----------

### Thêm combo khác: thêm 1 combo 1A_2B_3C gồm 1 A (giá 100k) và 2 B (giá 90k) và 3 C (giá 0) vào cart

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

  ```json
  {
    "items": [
      {
        "__title": "A",
        "_id": 1001,
        "not_allow_promotion": false,
        "PromotionRef": null,
        "PromotionByProductId": null,
        "properties": {
          "PE-combo-item": "COMBO_1A_2B | Combo 1 A và 2 B"
        },
        "product_id": 1,
        "variant_id": 1,
        "price_original": 100000,
        "price": 100000,
        "quantity": 1
      },
      {
        "__title": "B",
        "_id": 1002,
        "not_allow_promotion": false,
        "PromotionRef": null,
        "PromotionByProductId": null,
        "properties": {
          "PE-combo-item": "COMBO_1A_2B | Combo 1 A và 2 B"
        },
        "product_id": 2,
        "variant_id": 2,
        "price_original": 90000,
        "price": 0,
        "quantity": 2
      },
      {
        "__title": "A",
        "_id": 1003,
        "not_allow_promotion": false,
        "PromotionRef": null,
        "PromotionByProductId": null,
        "properties": {},
        "product_id": 1,
        "variant_id": 1,
        "price_original": 100000,
        "price": 100000,
        "quantity": 1
      },
      {
        "__title": "virtual",
        "_id": 1004,
        "price_original": 0,
        "price": 0,
        "line_price": 0,
        "quantity": 1,
        "variant_id": 9999,
        "product_id": 9999,
        "not_allow_promotion": false,
        "PromotionRef": null,
        "PromotionByProductId": null,
        "properties": {
          "PE-combo-set": "{ COMBO_1A_2B_3C: 1 }"
        }
      }
    ],
    "items_recommended": [],
    "has_promotion": false,
    "attributes": {
      "PE-combo-detail COMBO_1A_2B": "1"
    },
    "is_allow_coupon": true,
    "customer_id": null,
    "customer_group_ids": [],
    "source_name": "web",
    "location_id": null,
    "token": "619b4219a8a30c19dce80196"
  }
  ```

----------

#### App xử lý cart
* Thực hiện
  * Phân tích thông tin combo trong cart
    * Tìm thấy
      * COMBO_1A_2B:
        * có attribute hợp lệ
        * có property combo item hợp lệ
      * COMBO_1A_2B_3C:
        * có sản phẩm ảo hợp lệ
  * Lấy danh sách combo [COMBO_1A_2B, COMBO_1A_2B_3C] từ DB
  * Kiểm tra combo khả dụng: hợp lệ
  * Thêm combo COMBO_1A_2B_3C vào cart
    * Thêm combo item
    * Ghi attribute
  * Xóa sản phẩm ảo

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

  ```json
  {
    "items": [
      {
        "__title": "A",
        "_id": 1001,
        "not_allow_promotion": false,
        "PromotionRef": "COMBO_1A_2B",
        "PromotionByProductId": null,
        "properties": {
          "PE-combo-item": "COMBO_1A_2B | Combo 1 A và 2 B"
        },
        "product_id": 1,
        "variant_id": 1,
        "price_original": 100000,
        "price": 100000,
        "quantity": 1
      },
      {
        "__title": "B",
        "_id": 1002,
        "not_allow_promotion": false,
        "PromotionRef": "COMBO_1A_2B",
        "PromotionByProductId": null,
        "properties": {
          "PE-combo-item": "COMBO_1A_2B | Combo 1 A và 2 B"
        },
        "product_id": 2,
        "variant_id": 2,
        "price_original": 90000,
        "price": 0,
        "quantity": 2
      },
      {
        "__title": "A",
        "_id": 1003,
        "not_allow_promotion": false,
        "PromotionRef": null,
        "PromotionByProductId": null,
        "properties": {},
        "product_id": 1,
        "variant_id": 1,
        "price_original": 100000,
        "price": 100000,
        "quantity": 1
      },
      {
        "__title": "A",
        "_id": 0,
        "not_allow_promotion": false,
        "PromotionRef": "COMBO_1A_2B_3C",
        "PromotionByProductId": null,
        "properties": {
          "PE-combo-item": "COMBO_1A_2B_3C | Combo 1 sp A và 2 sp B và 3 sp C"
        },
        "product_id": 1,
        "variant_id": 1,
        "price_original": 100000,
        "price": 90000,
        "quantity": 1
      },
      {
        "__title": "B",
        "_id": 0,
        "not_allow_promotion": false,
        "PromotionRef": "COMBO_1A_2B_3C",
        "PromotionByProductId": null,
        "properties": {
          "PE-combo-item": "COMBO_1A_2B_3C | Combo 1 sp A và 2 sp B và 3 sp C"
        },
        "product_id": 2,
        "variant_id": 2,
        "price_original": 90000,
        "price": 90000,
        "quantity": 2
      },
      {
        "__title": "C",
        "_id": 0,
        "not_allow_promotion": false,
        "PromotionRef": "COMBO_1A_2B_3C",
        "PromotionByProductId": null,
        "properties": {
          "PE-combo-item": "COMBO_1A_2B_3C | Combo 1 sp A và 2 sp B và 3 sp C"
        },
        "product_id": 3,
        "variant_id": 3,
        "price_original": 80000,
        "price": 0,
        "quantity": 3
      }
    ],
    "items_recommended": [],
    "has_promotion": false,
    "attributes": {
      "PE-combo-detail COMBO_1A_2B": "1",
      "PE-combo-detail COMBO_1A_2B_3C": "1"
    },
    "is_allow_coupon": true,
    "customer_id": null,
    "customer_group_ids": [],
    "source_name": "web",
    "location_id": null,
    "token": "619b4219a8a30c19dce80196"
  }
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

  ```json
  {
    "items": [
      {
        "__title": "A",
        "_id": 1001,
        "not_allow_promotion": false,
        "PromotionRef": null,
        "PromotionByProductId": null,
        "properties": {
          "PE-combo-item": "COMBO_1A_2B | Combo 1 A và 2 B"
        },
        "product_id": 1,
        "variant_id": 1,
        "price_original": 100000,
        "price": 100000,
        "quantity": 1
      },
      {
        "__title": "B",
        "_id": 1002,
        "not_allow_promotion": false,
        "PromotionRef": null,
        "PromotionByProductId": null,
        "properties": {
          "PE-combo-item": "COMBO_1A_2B | Combo 1 A và 2 B"
        },
        "product_id": 2,
        "variant_id": 2,
        "price_original": 90000,
        "price": 0,
        "quantity": 2
      },
      {
        "__title": "A",
        "_id": 1003,
        "not_allow_promotion": false,
        "PromotionRef": null,
        "PromotionByProductId": null,
        "properties": {},
        "product_id": 1,
        "variant_id": 1,
        "price_original": 100000,
        "price": 100000,
        "quantity": 1
      },
      {
        "__title": "A",
        "_id": 1005,
        "not_allow_promotion": false,
        "PromotionRef": null,
        "PromotionByProductId": null,
        "properties": {
          "PE-combo-item": "COMBO_1A_2B_3C | Combo 1 sp A và 2 sp B và 3 sp C"
        },
        "product_id": 1,
        "variant_id": 1,
        "price_original": 100000,
        "price": 90000,
        "quantity": 1
      },
      {
        "__title": "B",
        "_id": 1006,
        "not_allow_promotion": false,
        "PromotionRef": null,
        "PromotionByProductId": null,
        "properties": {
          "PE-combo-item": "COMBO_1A_2B_3C | Combo 1 sp A và 2 sp B và 3 sp C"
        },
        "product_id": 2,
        "variant_id": 2,
        "price_original": 90000,
        "price": 90000,
        "quantity": 2
      },
      {
        "__title": "C",
        "_id": 1007,
        "not_allow_promotion": false,
        "PromotionRef": null,
        "PromotionByProductId": null,
        "properties": {
          "PE-combo-item": "COMBO_1A_2B_3C | Combo 1 sp A và 2 sp B và 3 sp C"
        },
        "product_id": 3,
        "variant_id": 3,
        "price_original": 80000,
        "price": 0,
        "quantity": 3
      },
      {
        "__title": "virtual",
        "_id": 1008,
        "price_original": 0,
        "price": 0,
        "line_price": 0,
        "quantity": 1,
        "variant_id": 9999,
        "product_id": 9999,
        "not_allow_promotion": false,
        "PromotionRef": null,
        "PromotionByProductId": null,
        "properties": {
          "PE-combo-set": "{ 'COMBO_1A_2B': 2, 'COMBO_1A_2B_3C': 3 }",
        },
      }
    ],
    "items_recommended": [],
    "has_promotion": false,
    "attributes": {
      "PE-combo-detail COMBO_1A_2B": "1",
      "PE-combo-detail COMBO_1A_2B_3C": "1"
    },
    "is_allow_coupon": true,
    "customer_id": null,
    "customer_group_ids": [],
    "source_name": "web",
    "location_id": null,
    "token": "619b4219a8a30c19dce80196"
  }
  ```

----------

#### App xử lý cart
* Thực hiện
  * Phân tích thông tin combo trong cart
    * Tìm thấy
      * COMBO_1A_2B:
        * có attribute hợp lệ
        * có property combo item hợp lệ
        * có sản phẩm ảo hợp lệ
      * COMBO_1A_2B_3C:
        * có attribute hợp lệ
        * có property combo item hợp lệ
        * có sản phẩm ảo hợp lệ
  * Lấy danh sách combo [COMBO_1A_2B, COMBO_1A_2B_3C] từ DB
  * Kiểm tra combo khả dụng: hợp lệ
  * Chỉnh số lượng COMBO_1A_2B lên 2
    * Xóa toàn bộ combo item cũ của COMBO_1A_2B
    * Thêm combo item mới
    * Ghi attribute mới
  * Chỉnh số lượng COMBO_1A_2B_3C lên 3
    * Xóa toàn bộ combo item cũ của COMBO_1A_2B_3C
    * Thêm combo item mới
    * Ghi attribute mới
  * Xóa sản phẩm ảo

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

  ```json
  {
    "items": [
      {
        "__title": "A",
        "_id": 1001,
        "not_allow_promotion": false,
        "PromotionRef": null,
        "PromotionByProductId": null,
        "properties": {
          "PE-combo-item": "COMBO_1A_2B | Combo 1 A và 2 B"
        },
        "product_id": 1,
        "variant_id": 1,
        "price_original": 100000,
        "price": 100000,
        "quantity": 2
      },
      {
        "__title": "B",
        "_id": 1002,
        "not_allow_promotion": false,
        "PromotionRef": null,
        "PromotionByProductId": null,
        "properties": {
          "PE-combo-item": "COMBO_1A_2B | Combo 1 A và 2 B"
        },
        "product_id": 2,
        "variant_id": 2,
        "price_original": 90000,
        "price": 0,
        "quantity": 4
      },
      {
        "__title": "A",
        "_id": 1003,
        "not_allow_promotion": false,
        "PromotionRef": null,
        "PromotionByProductId": null,
        "properties": {},
        "product_id": 1,
        "variant_id": 1,
        "price_original": 100000,
        "price": 100000,
        "quantity": 1
      },
      {
        "__title": "A",
        "_id": 1005,
        "not_allow_promotion": false,
        "PromotionRef": null,
        "PromotionByProductId": null,
        "properties": {
          "PE-combo-item": "COMBO_1A_2B_3C | Combo 1 sp A và 2 sp B và 3 sp C"
        },
        "product_id": 1,
        "variant_id": 1,
        "price_original": 100000,
        "price": 90000,
        "quantity": 3
      },
      {
        "__title": "B",
        "_id": 1006,
        "not_allow_promotion": false,
        "PromotionRef": null,
        "PromotionByProductId": null,
        "properties": {
          "PE-combo-item": "COMBO_1A_2B_3C | Combo 1 sp A và 2 sp B và 3 sp C"
        },
        "product_id": 2,
        "variant_id": 2,
        "price_original": 90000,
        "price": 90000,
        "quantity": 6
      },
      {
        "__title": "C",
        "_id": 1007,
        "not_allow_promotion": false,
        "PromotionRef": null,
        "PromotionByProductId": null,
        "properties": {
          "PE-combo-item": "COMBO_1A_2B_3C | Combo 1 sp A và 2 sp B và 3 sp C"
        },
        "product_id": 3,
        "variant_id": 3,
        "price_original": 80000,
        "price": 0,
        "quantity": 9
      }
    ],
    "items_recommended": [],
    "has_promotion": false,
    "attributes": {
      "PE-combo-detail COMBO_1A_2B": "2",
      "PE-combo-detail COMBO_1A_2B_3C": "3"
    },
    "is_allow_coupon": true,
    "customer_id": null,
    "customer_group_ids": [],
    "source_name": "web",
    "location_id": null,
    "token": "619b4219a8a30c19dce80196"
  }
  ```

### Xóa combo: xóa combo 1A_2B_3C

----------

#### FE thêm sản phẩm ảo có property [PE-combo-set] và cart

```json
{
  "__title": "virtual",
  "properties": {
    "PE-combo-set": "{ 'COMBO_1A_2B_3C': 0 }",
  },
}
```

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

  ```json
  {
    "items": [
      {
        "__title": "A",
        "_id": 1001,
        "not_allow_promotion": false,
        "PromotionRef": null,
        "PromotionByProductId": null,
        "properties": {
          "PE-combo-item": "COMBO_1A_2B | Combo 1 A và 2 B"
        },
        "product_id": 1,
        "variant_id": 1,
        "price_original": 100000,
        "price": 100000,
        "quantity": 1
      },
      {
        "__title": "B",
        "_id": 1002,
        "not_allow_promotion": false,
        "PromotionRef": null,
        "PromotionByProductId": null,
        "properties": {
          "PE-combo-item": "COMBO_1A_2B | Combo 1 A và 2 B"
        },
        "product_id": 2,
        "variant_id": 2,
        "price_original": 90000,
        "price": 0,
        "quantity": 2
      },
      {
        "__title": "A",
        "_id": 1003,
        "not_allow_promotion": false,
        "PromotionRef": null,
        "PromotionByProductId": null,
        "properties": {},
        "product_id": 1,
        "variant_id": 1,
        "price_original": 100000,
        "price": 100000,
        "quantity": 1
      },
      {
        "__title": "A",
        "_id": 1005,
        "not_allow_promotion": false,
        "PromotionRef": null,
        "PromotionByProductId": null,
        "properties": {
          "PE-combo-item": "COMBO_1A_2B_3C | Combo 1 sp A và 2 sp B và 3 sp C"
        },
        "product_id": 1,
        "variant_id": 1,
        "price_original": 100000,
        "price": 90000,
        "quantity": 1
      },
      {
        "__title": "B",
        "_id": 1006,
        "not_allow_promotion": false,
        "PromotionRef": null,
        "PromotionByProductId": null,
        "properties": {
          "PE-combo-item": "COMBO_1A_2B_3C | Combo 1 sp A và 2 sp B và 3 sp C"
        },
        "product_id": 2,
        "variant_id": 2,
        "price_original": 90000,
        "price": 90000,
        "quantity": 2
      },
      {
        "__title": "C",
        "_id": 1007,
        "not_allow_promotion": false,
        "PromotionRef": null,
        "PromotionByProductId": null,
        "properties": {
          "PE-combo-item": "COMBO_1A_2B_3C | Combo 1 sp A và 2 sp B và 3 sp C"
        },
        "product_id": 3,
        "variant_id": 3,
        "price_original": 80000,
        "price": 0,
        "quantity": 3
      },
      {
        "__title": "virtual",
        "_id": 1008,
        "price_original": 0,
        "price": 0,
        "line_price": 0,
        "quantity": 1,
        "variant_id": 9999,
        "product_id": 9999,
        "not_allow_promotion": false,
        "PromotionRef": null,
        "PromotionByProductId": null,
        "properties": {
          "PE-combo-set": "{ 'COMBO_1A_2B_3C': 0 }",
        },
      }
    ],
    "items_recommended": [],
    "has_promotion": false,
    "attributes": {
      "PE-combo-detail COMBO_1A_2B": "1",
      "PE-combo-detail COMBO_1A_2B_3C": "1"
    },
    "is_allow_coupon": true,
    "customer_id": null,
    "customer_group_ids": [],
    "source_name": "web",
    "location_id": null,
    "token": "619b4219a8a30c19dce80196"
  }
  ```

----------

#### App xử lý cart
* Thực hiện
  * Phân tích thông tin combo trong cart
    * Tìm thấy
      * COMBO_1A_2B:
        * có attribute hợp lệ
        * có property combo item hợp lệ
      * COMBO_1A_2B_3C:
        * có attribute hợp lệ
        * có property combo item hợp lệ
        * có sản phẩm ảo hợp lệ
  * Lấy danh sách combo [COMBO_1A_2B, COMBO_1A_2B_3C] từ DB
  * Kiểm tra combo khả dụng: hợp lệ
  * Xóa COMBO_1A_2B_3C ra khỏi cart
    * Xóa toàn bộ combo item của COMBO_1A_2B_3C
    * Xóa attribute
  * Xóa sản phẩm ảo

* Dữ liệu trả về:
  ```
  items:
    2   | A          | 100000   đ | properties: {"PE-combo-item":"COMBO_1A_2B | Combo 1 A và 2 B"}
    4   | B          | 0        đ | properties: {"PE-combo-item":"COMBO_1A_2B | Combo 1 A và 2 B"}
    1   | A          | 100000   đ | 
  attributes:
    "PE-combo-detail COMBO_1A_2B" : "2"
  ```

  ```json
  {
    "items": [
      {
        "__title": "A",
        "_id": 1001,
        "not_allow_promotion": false,
        "PromotionRef": null,
        "PromotionByProductId": null,
        "properties": {
          "PE-combo-item": "COMBO_1A_2B | Combo 1 A và 2 B"
        },
        "product_id": 1,
        "variant_id": 1,
        "price_original": 100000,
        "price": 100000,
        "quantity": 2
      },
      {
        "__title": "B",
        "_id": 1002,
        "not_allow_promotion": false,
        "PromotionRef": null,
        "PromotionByProductId": null,
        "properties": {
          "PE-combo-item": "COMBO_1A_2B | Combo 1 A và 2 B"
        },
        "product_id": 2,
        "variant_id": 2,
        "price_original": 90000,
        "price": 0,
        "quantity": 4
      },
      {
        "__title": "A",
        "_id": 1003,
        "not_allow_promotion": false,
        "PromotionRef": null,
        "PromotionByProductId": null,
        "properties": {},
        "product_id": 1,
        "variant_id": 1,
        "price_original": 100000,
        "price": 100000,
        "quantity": 1
      }
    ],
    "items_recommended": [],
    "has_promotion": false,
    "attributes": {
      "PE-combo-detail COMBO_1A_2B": "2"
    },
    "is_allow_coupon": true,
    "customer_id": null,
    "customer_group_ids": [],
    "source_name": "web",
    "location_id": null,
    "token": "619b4219a8a30c19dce80196"
  }
  ```