let cart = {
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
      "price": 90000,
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

const cart_to_text = ({ cart }) => {
  const lines = [];

  lines.push('items:');

  if (Array.isArray(cart.items) && cart.items.length > 0) {
    for (let cart_item of cart.items) {
      const tokens = [];

      tokens.push(String(cart_item.quantity).padEnd(3, ' '));
      tokens.push(String(cart_item.__title).padEnd(10, ' '));
      tokens.push(String(cart_item.price).padEnd(8, ' '));

      // if (cart_item.PromotionRef) {
      //   tokens.push(`PromotionRef: ${cart_item.PromotionRef}`);
      // }

      if (cart_item.properties) {
        if (Object.keys(cart_item.properties).length > 0) {
          tokens.push(`properties: ${JSON.stringify(cart_item.properties)}`);
        }
        else {
          tokens.push('');
        }
      }

      const line = '\t' + tokens.join(' | ');

      lines.push(line);
    }
  }

  lines.push('attributes:');
  if (cart.attributes) {
    if (Object.keys(cart.attributes)) {
      for (let attribute_key in cart.attributes) {
        const attribute_value = cart.attributes[attribute_key];

        const line = '\t' + `"${attribute_key}" : "${attribute_value}"`;

        lines.push(line);
      }
    }
  }

  const text = lines.join('\n');

  return { text };
}

const { text } = cart_to_text({ cart });

console.log(text);