# FLOW.CART.COMBO.NORMAL

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

### Thêm combo: thêm 1 combo 1A_2B gồm 1 A (giá 90k) và 2 B (giá 0) vào cart
----------
#### FE thêm sản phẩm ảo có property [combo set] và cart
----------
#### Cart proxy gọi App
* data
  ```
  items:
    1   | virtual    | 0        | properties: {"[PE] combo set":"{ COMBO_1A_2B: { quantity: 1 } }"}
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
          "[PE] combo set": "{ COMBO_1A_2B: { quantity: 1 } }"
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
    1   | A          | 100000   | properties: {"[PE] combo item":"{ combo_code: 'COMBO_1A_2B', combo_quantity: 1, item_quantity: 1, at: 1637565313256 }"}
    2   | B          | 0        | properties: {"[PE] combo item":"{ combo_code: 'COMBO_1A_2B', combo_quantity: 1, item_quantity: 2, at: 1637565313256 }"}
  attributes:
    "[PE] combo COMBO_1A_2B" : "{ title: 'Combo 1 sp A và 2 sp B', quantity: 1, total_line: 2, at: 1637565313256 }"
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
          "[PE] combo item": "{ combo_code: 'COMBO_1A_2B', combo_quantity: 1, item_quantity: 1, at: 1637565313256 }"
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
          "[PE] combo item": "{ combo_code: 'COMBO_1A_2B', combo_quantity: 1, item_quantity: 2, at: 1637565313256 }"
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
      "[PE] combo COMBO_1A_2B": "{ title: 'Combo 1 sp A và 2 sp B', quantity: 1, total_line: 2, at: 1637565313256 }"
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
    1   | A          | 100000   | properties: {"[PE] combo item":"{ combo_code: 'COMBO_1A_2B', combo_quantity: 1, item_quantity: 1, at: 1637565313256 }"}
    2   | B          | 0        | properties: {"[PE] combo item":"{ combo_code: 'COMBO_1A_2B', combo_quantity: 1, item_quantity: 2, at: 1637565313256 }"}
    1   | A          | 100000   | 
  attributes:
    "[PE] combo COMBO_1A_2B" : "{ title: 'Combo 1 sp A và 2 sp B', quantity: 1, total_line: 2, at: 1637565313256 }"
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
          "[PE] combo item": "{ combo_code: 'COMBO_1A_2B', combo_quantity: 1, item_quantity: 1, at: 1637565313256 }"
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
          "[PE] combo item": "{ combo_code: 'COMBO_1A_2B', combo_quantity: 1, item_quantity: 2, at: 1637565313256 }"
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
      "[PE] combo COMBO_1A_2B": "{ title: 'Combo 1 sp A và 2 sp B', quantity: 1, total_line: 2, at: 1637565313256 }"
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
    1   | A          | 100000   | properties: {"[PE] combo item":"{ combo_code: 'COMBO_1A_2B', combo_quantity: 1, item_quantity: 1, at: 1637565313256 }"}
    2   | B          | 0        | properties: {"[PE] combo item":"{ combo_code: 'COMBO_1A_2B', combo_quantity: 1, item_quantity: 2, at: 1637565313256 }"}
    1   | A          | 100000   | 
  attributes:
    "[PE] combo COMBO_1A_2B" : "{ title: 'Combo 1 sp A và 2 sp B', quantity: 1, total_line: 2, at: 1637565313256 }"
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
          "[PE] combo item": "{ combo_code: 'COMBO_1A_2B', combo_quantity: 1, item_quantity: 1, at: 1637565313256 }"
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
          "[PE] combo item": "{ combo_code: 'COMBO_1A_2B', combo_quantity: 1, item_quantity: 2, at: 1637565313256 }"
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
      "[PE] combo COMBO_1A_2B": "{ title: 'Combo 1 sp A và 2 sp B', quantity: 1, total_line: 2, at: 1637565313256 }"
    },
    "is_allow_coupon": true,
    "customer_id": null,
    "customer_group_ids": [],
    "source_name": "web",
    "location_id": null,
    "token": "619b4219a8a30c19dce80196"
  }
  ```

### Thêm combo khác: thêm 1 combo 1A_2B_3C gồm 1 A (giá 100k) và 2 B (giá 90k) và 3 C (giá 0) vào cart
----------
#### FE thêm sản phẩm ảo có property [combo set] và cart
----------
#### Cart proxy gọi App
* data
  ```
  items:
    1   | A          | 100000   | properties: {"[PE] combo item":"{ combo_code: 'COMBO_1A_2B', combo_quantity: 1, item_quantity: 1, at: 1637565313256 }"}
    2   | B          | 0        | properties: {"[PE] combo item":"{ combo_code: 'COMBO_1A_2B', combo_quantity: 1, item_quantity: 2, at: 1637565313256 }"}
    1   | A          | 100000   | 
    1   | virtual    | 0        | properties: {"[PE] combo set":"{ COMBO_1A_2B_3C: { quantity: 1 } }"}
  attributes:
    "[PE] combo COMBO_1A_2B" : "{ title: 'Combo 1 sp A và 2 sp B', quantity: 1, total_line: 2, at: 1637565313256 }"
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
          "[PE] combo item": "{ combo_code: 'COMBO_1A_2B', combo_quantity: 1, item_quantity: 1, at: 1637565313256 }"
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
          "[PE] combo item": "{ combo_code: 'COMBO_1A_2B', combo_quantity: 1, item_quantity: 2, at: 1637565313256 }"
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
          "[PE] combo set": "{ COMBO_1A_2B_3C: { quantity: 1 } }"
        }
      }
    ],
    "items_recommended": [],
    "has_promotion": false,
    "attributes": {
      "[PE] combo COMBO_1A_2B": "{ title: 'Combo 1 sp A và 2 sp B', quantity: 1, total_line: 2, at: 1637565313256 }"
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
    1   | A          | 100000   | properties: {"[PE] combo item":"{ combo_code: 'COMBO_1A_2B', combo_quantity: 1, item_quantity: 1, at: 1637565313256 }"}
    2   | B          | 0        | properties: {"[PE] combo item":"{ combo_code: 'COMBO_1A_2B', combo_quantity: 1, item_quantity: 2, at: 1637565313256 }"}
    1   | A          | 100000   | 
    1   | A          | 90000    | properties: {"[PE] combo item":"{ combo_code: 'COMBO_1A_2B_3C', combo_quantity: 1, item_quantity: 1, at: 1637565314000 }"}
    2   | B          | 90000    | properties: {"[PE] combo item":"{ combo_code: 'COMBO_1A_2B_3C', combo_quantity: 1, item_quantity: 2, at: 1637565314000 }"}
    3   | C          | 0        | properties: {"[PE] combo item":"{ combo_code: 'COMBO_1A_2B_3C', combo_quantity: 1, item_quantity: 3, at: 1637565314000 }"}
  attributes:
    "[PE] combo COMBO_1A_2B" : "{ title: 'Combo 1 sp A và 2 sp B', quantity: 1, total_line: 2, at: 1637565313256} "
    "[PE] combo COMBO_1A_2B_3C" : "{ title: 'Combo 1 sp A và 2 sp B và 3 sp C', quantity: 1, total_line: 3, at: 1637565314000 }"
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
          "[PE] combo item": "{ combo_code: 'COMBO_1A_2B', combo_quantity: 1, item_quantity: 1, at: 1637565313256 }"
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
          "[PE] combo item": "{ combo_code: 'COMBO_1A_2B', combo_quantity: 1, item_quantity: 2, at: 1637565313256 }"
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
          "[PE] combo item": "{ combo_code: 'COMBO_1A_2B_3C', combo_quantity: 1, item_quantity: 1, at: 1637565314000 }"
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
          "[PE] combo item": "{ combo_code: 'COMBO_1A_2B_3C', combo_quantity: 1, item_quantity: 2, at: 1637565314000 }"
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
          "[PE] combo item": "{ combo_code: 'COMBO_1A_2B_3C', combo_quantity: 1, item_quantity: 3, at: 1637565314000 }"
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
      "[PE] combo COMBO_1A_2B": "{ title: 'Combo 1 sp A và 2 sp B', quantity: 1, total_line: 2, at: 1637565313256} ",
      "[PE] combo COMBO_1A_2B_3C": "{ title: 'Combo 1 sp A và 2 sp B và 3 sp C', quantity: 1, total_line: 3, at: 1637565314000 }"
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
#### FE thêm sản phẩm ảo có property [combo set] và cart
----------
#### Cart proxy gọi App
* data
  ```
  items:
    1   | A          | 100000   | properties: {"[PE] combo item":"{ combo_code: 'COMBO_1A_2B', combo_quantity: 1, item_quantity: 1, at: 1637565313256 }"}
    2   | B          | 0        | properties: {"[PE] combo item":"{ combo_code: 'COMBO_1A_2B', combo_quantity: 1, item_quantity: 2, at: 1637565313256 }"}
    1   | A          | 100000   | 
    1   | A          | 90000    | properties: {"[PE] combo item":"{ combo_code: 'COMBO_1A_2B_3C', combo_quantity: 1, item_quantity: 1, at: 1637565314000 }"}
    2   | B          | 90000    | properties: {"[PE] combo item":"{ combo_code: 'COMBO_1A_2B_3C', combo_quantity: 1, item_quantity: 2, at: 1637565314000 }"}
    3   | C          | 0        | properties: {"[PE] combo item":"{ combo_code: 'COMBO_1A_2B_3C', combo_quantity: 1, item_quantity: 3, at: 1637565314000 }"}
    1   | virtual    | 0        | properties: {"[PE] combo set":"{ 'COMBO_1A_2B': { quantity: 2 }, 'COMBO_1A_2B_3C': { quantity: 3 } }"}
  attributes:
    "[PE] combo COMBO_1A_2B" : "{ title: 'Combo 1 sp A và 2 sp B', quantity: 1, total_line: 2, at: 1637565313256} "
    "[PE] combo COMBO_1A_2B_3C" : "{ title: 'Combo 1 sp A và 2 sp B và 3 sp C', quantity: 1, total_line: 3, at: 1637565314000 }"
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
          "[PE] combo item": "{ combo_code: 'COMBO_1A_2B', combo_quantity: 1, item_quantity: 1, at: 1637565313256 }"
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
          "[PE] combo item": "{ combo_code: 'COMBO_1A_2B', combo_quantity: 1, item_quantity: 2, at: 1637565313256 }"
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
          "[PE] combo item": "{ combo_code: 'COMBO_1A_2B_3C', combo_quantity: 1, item_quantity: 1, at: 1637565314000 }"
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
          "[PE] combo item": "{ combo_code: 'COMBO_1A_2B_3C', combo_quantity: 1, item_quantity: 2, at: 1637565314000 }"
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
          "[PE] combo item": "{ combo_code: 'COMBO_1A_2B_3C', combo_quantity: 1, item_quantity: 3, at: 1637565314000 }"
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
          "[PE] combo set": "{ 'COMBO_1A_2B': { quantity: 2 }, 'COMBO_1A_2B_3C': { quantity: 3 } }",
        },
      }
    ],
    "items_recommended": [],
    "has_promotion": false,
    "attributes": {
      "[PE] combo COMBO_1A_2B": "{ title: 'Combo 1 sp A và 2 sp B', quantity: 1, total_line: 2, at: 1637565313256} ",
      "[PE] combo COMBO_1A_2B_3C": "{ title: 'Combo 1 sp A và 2 sp B và 3 sp C', quantity: 1, total_line: 3, at: 1637565314000 }"
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
    2   | A          | 100000   | properties: {"[PE] combo item":"{ combo_code: 'COMBO_1A_2B', combo_quantity: 2, item_quantity: 1, at: 1637565315000 }"}
    4   | B          | 0        | properties: {"[PE] combo item":"{ combo_code: 'COMBO_1A_2B', combo_quantity: 2, item_quantity: 2, at: 1637565315000 }"}
    1   | A          | 100000   | 
    3   | A          | 90000    | properties: {"[PE] combo item":"{ combo_code: 'COMBO_1A_2B_3C', combo_quantity: 3, item_quantity: 1, at: 1637565316000 }"}
    6   | B          | 90000    | properties: {"[PE] combo item":"{ combo_code: 'COMBO_1A_2B_3C', combo_quantity: 3, item_quantity: 2, at: 1637565316000 }"}
    9   | C          | 0        | properties: {"[PE] combo item":"{ combo_code: 'COMBO_1A_2B_3C', combo_quantity: 3, item_quantity: 3, at: 1637565316000 }"}
  attributes:
    "[PE] combo COMBO_1A_2B" : "{ title: 'Combo 1 sp A và 2 sp B', quantity: 2, total_line: 2, at: 1637565315000} "
    "[PE] combo COMBO_1A_2B_3C" : "{ title: 'Combo 1 sp A và 2 sp B và 3 sp C', quantity: 3, total_line: 3, at: 1637565316000 }"
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
          "[PE] combo item": "{ combo_code: 'COMBO_1A_2B', combo_quantity: 2, item_quantity: 1, at: 1637565315000 }"
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
          "[PE] combo item": "{ combo_code: 'COMBO_1A_2B', combo_quantity: 2, item_quantity: 2, at: 1637565315000 }"
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
          "[PE] combo item": "{ combo_code: 'COMBO_1A_2B_3C', combo_quantity: 3, item_quantity: 1, at: 1637565316000 }"
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
          "[PE] combo item": "{ combo_code: 'COMBO_1A_2B_3C', combo_quantity: 3, item_quantity: 2, at: 1637565316000 }"
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
          "[PE] combo item": "{ combo_code: 'COMBO_1A_2B_3C', combo_quantity: 3, item_quantity: 3, at: 1637565316000 }"
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
      "[PE] combo COMBO_1A_2B": "{ title: 'Combo 1 sp A và 2 sp B', quantity: 2, total_line: 2, at: 1637565315000} ",
      "[PE] combo COMBO_1A_2B_3C": "{ title: 'Combo 1 sp A và 2 sp B và 3 sp C', quantity: 3, total_line: 3, at: 1637565316000 }"
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
#### FE thêm sản phẩm ảo có property [combo set] và cart

```json
{
  "__title": "virtual",
  "properties": {
    "[PE] combo set": "{ 'COMBO_1A_2B_3C': { quantity: 0 } }",
  },
}
```
----------
#### Cart proxy gọi App
* data
  ```
  items:
    1   | A          | 100000   | properties: {"[PE] combo item":"{ combo_code: 'COMBO_1A_2B', combo_quantity: 1, item_quantity: 1, at: 1637565313256 }"}
    2   | B          | 0        | properties: {"[PE] combo item":"{ combo_code: 'COMBO_1A_2B', combo_quantity: 1, item_quantity: 2, at: 1637565313256 }"}
    1   | A          | 100000   | 
    1   | A          | 90000    | properties: {"[PE] combo item":"{ combo_code: 'COMBO_1A_2B_3C', combo_quantity: 1, item_quantity: 1, at: 1637565314000 }"}
    2   | B          | 90000    | properties: {"[PE] combo item":"{ combo_code: 'COMBO_1A_2B_3C', combo_quantity: 1, item_quantity: 2, at: 1637565314000 }"}
    3   | C          | 0        | properties: {"[PE] combo item":"{ combo_code: 'COMBO_1A_2B_3C', combo_quantity: 1, item_quantity: 3, at: 1637565314000 }"}
    1   | virtual    | 0        | properties: {"[PE] combo set":"{ 'COMBO_1A_2B_3C': { quantity: 0 } }"}
  attributes:
    "[PE] combo COMBO_1A_2B" : "{ title: 'Combo 1 sp A và 2 sp B', quantity: 1, total_line: 2, at: 1637565313256} "
    "[PE] combo COMBO_1A_2B_3C" : "{ title: 'Combo 1 sp A và 2 sp B và 3 sp C', quantity: 1, total_line: 3, at: 1637565314000 }"
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
          "[PE] combo item": "{ combo_code: 'COMBO_1A_2B', combo_quantity: 1, item_quantity: 1, at: 1637565313256 }"
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
          "[PE] combo item": "{ combo_code: 'COMBO_1A_2B', combo_quantity: 1, item_quantity: 2, at: 1637565313256 }"
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
          "[PE] combo item": "{ combo_code: 'COMBO_1A_2B_3C', combo_quantity: 1, item_quantity: 1, at: 1637565314000 }"
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
          "[PE] combo item": "{ combo_code: 'COMBO_1A_2B_3C', combo_quantity: 1, item_quantity: 2, at: 1637565314000 }"
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
          "[PE] combo item": "{ combo_code: 'COMBO_1A_2B_3C', combo_quantity: 1, item_quantity: 3, at: 1637565314000 }"
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
          "[PE] combo set": "{ 'COMBO_1A_2B_3C': { quantity: 0 } }",
        },
      }
    ],
    "items_recommended": [],
    "has_promotion": false,
    "attributes": {
      "[PE] combo COMBO_1A_2B": "{ title: 'Combo 1 sp A và 2 sp B', quantity: 1, total_line: 2, at: 1637565313256} ",
      "[PE] combo COMBO_1A_2B_3C": "{ title: 'Combo 1 sp A và 2 sp B và 3 sp C', quantity: 1, total_line: 3, at: 1637565314000 }"
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
    2   | A          | 100000   | properties: {"[PE] combo item":"{ combo_code: 'COMBO_1A_2B', combo_quantity: 2, item_quantity: 1, at: 1637565315000 }"}
    4   | B          | 0        | properties: {"[PE] combo item":"{ combo_code: 'COMBO_1A_2B', combo_quantity: 2, item_quantity: 2, at: 1637565315000 }"}
    1   | A          | 100000   | 
  attributes:
    "[PE] combo COMBO_1A_2B" : "{ title: 'Combo 1 sp A và 2 sp B', quantity: 2, total_line: 2, at: 1637565315000} "
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
          "[PE] combo item": "{ combo_code: 'COMBO_1A_2B', combo_quantity: 2, item_quantity: 1, at: 1637565315000 }"
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
          "[PE] combo item": "{ combo_code: 'COMBO_1A_2B', combo_quantity: 2, item_quantity: 2, at: 1637565315000 }"
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
      "[PE] combo COMBO_1A_2B": "{ title: 'Combo 1 sp A và 2 sp B', quantity: 2, total_line: 2, at: 1637565315000} "
    },
    "is_allow_coupon": true,
    "customer_id": null,
    "customer_group_ids": [],
    "source_name": "web",
    "location_id": null,
    "token": "619b4219a8a30c19dce80196"
  }
  ```