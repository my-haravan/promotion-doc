# Thông tin combo trong cart

* Các property hoặc attribute đều bắt đầu bằng prefix: `[PE]`

## property trong sản phẩm ảo
* Cấu trúc:
  * key: `[PE] set_combos`
  * value:
    * format: json string
    * data:
      ```json
      { "{combo.code}": { "quantity": integer } }
      ```

* ví dụ
  * cần set 2 combo với thông tin sau:
    ```json
    { "code": "COMBO_1A_2B", "quantity":1 }

    { "code": "COMBO_1A_2B_3C", "quantity":2 }
    ```

  * tạo property value data:
    ```json
    {
      "COMBO_1A_2B": {
        "quantity": 1
      },
      "COMBO_1A_2B_3C": {
        "quantity": 2
      }
    }
    ```

  * tạo property
    ```json
    {
      "properties": {
        "[PE] set_combos": "{\"COMBO_1A_2B\":{\"quantity\":1},\"COMBO_1A_2B_3C\":{\"quantity\":2}}"
      }
    }
    ```


## attribute
* Cấu trúc:
  * key: `[PE] combo {combo.code}`
  * value:
    * format: json string
    * data:
      ```json
      { "title": string, "quantity": integer, "total_lines": integer, "at": iso-date }
      ```

* ví dụ
  * 2 combo với thông tin sau:
    ```json
    { "code": "COMBO_1A_2B", "title":"Combo 1A va 2B","quantity":1,"total_lines":2,"at":"2021-11-30T06:52:07.235Z"}

    { "code": "COMBO_1A_2B_3C", "title":"Combo 1A va 2B và 3C","quantity":2,"total_lines":3,"at":"2021-12-30T06:52:07.235Z"}
    ```

  * tạo attribute value data:
    ```json
    { "title":"Combo 1A va 2B","quantity":1,"total_lines":2,"at":"2021-11-30T06:52:07.235Z"}

    { "title":"Combo 1A va 2B và 3C","quantity":2,"total_lines":3,"at":"2021-12-30T06:52:07.235Z"}
    ```

  * tạo attributes
    ```json
    {
      "attributes": {
        "[PE] combo COMBO_1A_2B": "{\"title\":\"Combo 1A va 2B\",\"quantity\":1,\"total_lines\":2,\"at\":\"2021-11-30T06:52:07.235Z\"}",
        "[PE] combo COMBO_1A_2B_3C": "{\"title\":\"Combo 1A va 2B và 3C\",\"quantity\":2,\"total_lines\":3,\"at\":\"2021-12-30T06:52:07.235Z\"}"
      }
    }
    ```

## property trong combo item
* Cấu trúc:
  * key: `[PE] combo_item`
  * value:
    * format: json string
    * data:
      ```json
      { "combo_code": string, "combo_quantity": integer, "item_quantity": integer, "at": iso-date }
      ```

* ví dụ
  * combo item với thông tin sau:
    ```json
    { "combo_code": "COMBO_1A_2B", "combo_quantity":1,"item_quantity":2,"at":"2021-11-30T06:52:07.235Z"}
    ```

  * sẽ tạo property
    ```json
    {
      "properties": {
        "[PE] combo_item": "{\"combo_code\":\"COMBO_1A_2B\",\"combo_quantity\":1,\"item_quantity\":2,\"at\":\"2021-12-30T06:52:07.235Z\"}"
      }
    }
    ```