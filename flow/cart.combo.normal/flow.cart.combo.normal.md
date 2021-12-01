# FLOW.CART.COMBO.NORMAL

- [FLOW.CART.COMBO.NORMAL](#flowcartcombonormal)
  - [Mục đích](#mục-đích)
  - [Các bước](#các-bước)
    - [Thêm 1 combo 1A_2B gồm 1 A (giá 90k) và 2 B (giá 0) vào cart](#thêm-1-combo-1a_2b-gồm-1-a-giá-90k-và-2-b-giá-0-vào-cart)
      - [FE thêm sản phẩm ảo có property [combo set] và cart](#fe-thêm-sản-phẩm-ảo-có-property-combo set-và-cart)
      - [Cart proxy gọi App](#cart-proxy-gọi-app)
      - [App xử lý cart](#app-xử-lý-cart)
    - [Thêm 1 A (giá 100k) vào cart](#thêm-1-a-giá-100k-vào-cart)
      - [Cart proxy gọi App](#cart-proxy-gọi-app-1)
      - [App xử lý cart](#app-xử-lý-cart-1)
    - [Thêm 1 combo 1A_2B_3C gồm 1 A (giá 100k) và 2 B (giá 90k) và 3 C (giá 0) vào cart](#thêm-1-combo-1a_2b_3c-gồm-1-a-giá-100k-và-2-b-giá-90k-và-3-c-giá-0-vào-cart)
      - [FE thêm sản phẩm ảo có property [combo set] và cart](#fe-thêm-sản-phẩm-ảo-có-property-combo set-và-cart-1)
      - [Cart proxy gọi App](#cart-proxy-gọi-app-2)
      - [App xử lý cart](#app-xử-lý-cart-2)
    - [Chỉnh số lượng combo 1A_2B lên 2, chỉnh số lượng combo 1A_2B_3C lên 3](#chỉnh-số-lượng-combo-1a_2b-lên-2-chỉnh-số-lượng-combo-1a_2b_3c-lên-3)
      - [FE thêm sản phẩm ảo có property [combo set] và cart](#fe-thêm-sản-phẩm-ảo-có-property-combo set-và-cart-2)
      - [Cart proxy gọi App](#cart-proxy-gọi-app-3)
      - [App xử lý cart](#app-xử-lý-cart-3)

## Mục đích
* Thêm 1 combo 1A_2B gồm 1 A (giá 90k) và 2 B (giá 0) vào cart

* Thêm 1 A (giá 100k) vào cart

* Thêm 1 combo 1A_2B_3C gồm 1 A (giá 100k) và 2 B (giá 90k) và 3 C (giá 0) vào cart

* Chỉnh số lượng combo 1A_2B lên 2
* Chỉnh số lượng combo 1A_2B_3C lên 3

* Ta được cart như sau:
  ```
  2 A (giá 90k) thuộc combo 1A_2B
  4 B (giá 0) thuộc combo 1A_2B
  1 A (giá 100k)
  3 A (giá 100k) thuộc combo 1A_2B_3C
  6 B (giá 90k) thuộc combo 1A_2B_3C
  9 C (giá 0) thuộc combo 1A_2B_3C
  ```

## Các bước

### Thêm 1 combo 1A_2B gồm 1 A (giá 90k) và 2 B (giá 0) vào cart

#### FE thêm sản phẩm ảo có property [combo set] và cart

#### Cart proxy gọi App
* data
  ```json
  {
    "items": [
      {
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
  ```json
  {
    "items": [
      {
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
        "price": 90000,
        "quantity": 1
      },
      {
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

### Thêm 1 A (giá 100k) vào cart

#### Cart proxy gọi App
* data
  ```json
  {
    "items": [
      {
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
        "price": 90000,
        "quantity": 1
      },
      {
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

#### App xử lý cart
* Thực hiện
  * Phân tích thông tin combo trong cart
    * Tìm thấy
      * COMBO_1A_2B:
        * có attribute hợp lệ
        * có property combo item hợp lệ
  * Lấy danh sách combo [COMBO_1A_2B] từ DB
  * Kiểm tra combo khả dụng: hợp lệ

* Dữ liệu trả về:
  ```json
  {
    "items": [
      {
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
        "price": 90000,
        "quantity": 1
      },
      {
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

### Thêm 1 combo 1A_2B_3C gồm 1 A (giá 100k) và 2 B (giá 90k) và 3 C (giá 0) vào cart

#### FE thêm sản phẩm ảo có property [combo set] và cart

#### Cart proxy gọi App
* data
```json
  {
    "items": [
      {
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
        "price": 90000,
        "quantity": 1
      },
      {
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
  ```json
  {
    "items": [
      {
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
        "price": 90000,
        "quantity": 1
      },
      {
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

### Chỉnh số lượng combo 1A_2B lên 2, chỉnh số lượng combo 1A_2B_3C lên 3

#### FE thêm sản phẩm ảo có property [combo set] và cart

#### Cart proxy gọi App
* data
  ```json
  {
    "items": [
      {
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
        "price": 90000,
        "quantity": 1
      },
      {
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
  ```json
  {
    "items": [
      {
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
        "price": 90000,
        "quantity": 2
      },
      {
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