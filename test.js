// const properties = {
//   'promotioncombo-add': '+COMBO_1A_2B'
// };

// console.log(JSON.stringify({ properties }, null, 2));


// const properties = {
//   'promotioncombo-item': 'COMBO_1A_2B'
// };

// console.log(JSON.stringify({ properties }, null, 2));

const properties = {
  '[PE] combo item': { combo_code: 'COMBO_1A_2B', item_quantity: 2 }
};

console.log(JSON.stringify({ properties }, null, 2));

const properties = {
  '[PE] combo item': JSON.stringify({ combo_code: 'COMBO_1A_2B', item_quantity: 2 })
};

console.log(JSON.stringify({ properties }, null, 2));

const properties = {
  '[PE] combo item': 'COMBO_1A_2B'
};

console.log(JSON.stringify({ properties }, null, 2));

// const attributes = {
//   '[PE] combo COMBO_1A_2B': JSON.stringify({ "title":"Combo 1A va 2B","quantity":1,"total_lines":2,"at":"2021-11-30T06:52:07.235Z"}),
//   '[PE] combo COMBO_1A_2B_3C': JSON.stringify({ "title":"Combo 1A va 2B và 3C","quantity":2,"total_lines":3,"at":"2021-12-30T06:52:07.235Z"})
// };

// console.log(JSON.stringify({ attributes }, null, 2));

// const attributes = {
//   'promotioncombo-detail': JSON.stringify({
//     COMBO_1A_2B: 1,
//     COMBO_1A_2B_3C: 2 
//   })
// };

// console.log(JSON.stringify({ attributes }, null, 2));

// const attributes = {
//   '[PE] combo COMBO_1A_2B': { "title":"Combo 1A va 2B","quantity":1},
//   '[PE] combo COMBO_1A_2B_3C': { "title":"Combo 1A va 2B và 3C","quantity":2}
// };

// console.log(JSON.stringify({ attributes }, null, 2));

// const attributes = {
//   '[PE] combo COMBO_1A_2B': JSON.stringify({ "title":"Combo 1A va 2B","quantity":1}),
//   '[PE] combo COMBO_1A_2B_3C': JSON.stringify({ "title":"Combo 1A va 2B và 3C","quantity":2})
// };

// console.log(JSON.stringify({ attributes }, null, 2));

const attributes = {
  '[PE] combo COMBO_1A_2B': '1 | Combo 1A va 2B',
  '[PE] combo COMBO_1A_2B_3C': '2 | Combo 1A va 2B'
};

console.log(JSON.stringify({ attributes }, null, 2));