let lista = [];

function agregarAtributo() {
  // Obtener los valores de los inputs
  let nombre = document.getElementById("nombre").value;
  let valor = document.getElementById("valor").value;
  
  // Crear un objeto con el nombre y valor
  let atributo = {nombre: nombre, valor: valor};
  
  // Agregar el objeto a la lista
  lista.push(atributo);
  
  // Mostrar la lista actualizada
  mostrarLista();
}

function mostrarLista() {
  let ul = document.getElementById("listaAtributos");
  ul.innerHTML = "";  // Limpiar la lista anterior
  
  lista.forEach((item, index) => {
    let li = document.createElement("li");
    li.textContent = `Atributo: ${item.nombre}, Valor: ${item.valor}`;
    ul.appendChild(li);
  });
}
