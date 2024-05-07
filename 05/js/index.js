import { leer, escribir, jsonToObject, objectToJson } from "./local-storage.js";
import { Casa } from "./casa.js";

const KEY_STORAGE = "casas";
let items = [];

document.addEventListener("DOMContentLoaded", onInit); // importante no poner parentesis, es un callback

function onInit() {
  loadItems();
  rellenarTabla();

  escuchandoFormulario();
}

function loadItems() {
  let str = leer(KEY_STORAGE);
  const objetos = jsonToObject(str) || [];

  objetos.forEach((objeto) => {
    const model = new Casa(objeto.id, objeto.titulo, objeto.precio);
    items.push(model);
  });
}

function rellenarTabla() {
  const tabla = document.getElementById("table-items");
  var tbody = tabla.getElementsByTagName('tbody')[0];

  // 
  tbody.innerHTML = ''; // Me aseguro que esté vacio, hago referencia al agregar otro

  const celdas = ["id", "titulo", "precio"];

  items.forEach((item) => {
    var nuevaFila = document.createElement("tr");

    celdas.forEach((celda) => {
      var nuevaCelda = document.createElement("td");
      nuevaCelda.textContent = item[celda];

      nuevaFila.appendChild(nuevaCelda);
    });

    // Agregar la fila al tbody
    tbody.appendChild(nuevaFila);
  });
}

function escuchandoFormulario() {
  const form = document.getElementById("form-item");

  form.addEventListener("submit", (e) => {
    // Luego del primer parcial, comenzaremos a enviar los datos a un externo
    // evito el comportamiento que realiza por defecto
    e.preventDefault();

    const model = new Casa(
      form.querySelector("#id").value,
      form.querySelector("#titulo").value,
      form.querySelector("#precio").value
    );

    const rta = model.verify();

    if (rta) {
      items.push(model);
      const str = objectToJson(items);

      escribir(KEY_STORAGE, str);
      actualizarFormulario();
      rellenarTabla();
    }
  });
}

function actualizarFormulario(model = null) {
  const form = document.getElementById("form-item");

  if (model) {
    form.querySelector("#id").value = model.id;
    form.querySelector("#titulo").value = model.titulo;
    form.querySelector("#precio").value = model.precio;
  } else {
    form.reset();
  }
}