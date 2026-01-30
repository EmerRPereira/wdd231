/*****************************************************
 * scripts/date.js
 * WDD231 – Chamber Home Page
 * Date and Last Modified Script
 * Author: Emerson Ronald Pereira
 *****************************************************/

// Atualizar ano atual
document.getElementById("currentyear").textContent = new Date().getFullYear();

// Atualizar data da última modificação
document.getElementById("lastModified").textContent += document.lastModified;
