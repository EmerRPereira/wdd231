/*****************************************************
 * scripts/storage.js
 * WDD231 – Final Project
 * Local Storage Management
 * Author: Emerson Ronald Pereira
 * Location: Curitiba, Brazil
 *****************************************************/

const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
cart = savedCart;

localStorage.setItem("cart", JSON.stringify(cart));

export function saveToStorage(key,value){
localStorage.setItem(key,JSON.stringify(value));
}

export function getFromStorage(key){
return JSON.parse(localStorage.getItem(key));
}

let orders = JSON.parse(localStorage.getItem("orders")) || [];

orders.push(newOrder);

localStorage.setItem("orders", JSON.stringify(orders));
