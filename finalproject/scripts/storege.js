/*****************************************************
 * scripts/storage.js
 * WDD231 – Final Project
 * Local Storage Management
 * Author: Emerson Ronald Pereira
 * Location: Curitiba, Brazil
 *****************************************************/

export function saveToStorage(key,value){
localStorage.setItem(key,JSON.stringify(value));
}

export function getFromStorage(key){
return JSON.parse(localStorage.getItem(key));
}
