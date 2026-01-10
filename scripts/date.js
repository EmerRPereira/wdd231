// Atualizar ano atual
document.getElementById("currentyear").textContent = new Date().getFullYear();

// Atualizar data da última modificação
const lastModifiedElement = document.getElementById("lastModified");
if (lastModifiedElement) {
  // Verificar se já tem o texto "Last Modified:"
  let currentText = lastModifiedElement.textContent.trim();
  
  if (currentText === "Last Modified:") {
    // Se só tem o texto, adicionar a data
    lastModifiedElement.textContent = `Last Modified: ${document.lastModified}`;
  } else if (!currentText.includes(document.lastModified)) {
    // Se não contém a data, adicionar
    lastModifiedElement.textContent = `Last Modified: ${document.lastModified}`;
  }
} else {
  // Caso o elemento não exista, criar um log
  console.log("Elemento 'lastModified' não encontrado");
  console.log("Última modificação do documento:", document.lastModified);
}

// Debug: mostrar no console para verificar
console.log("Data da última modificação:", document.lastModified);
