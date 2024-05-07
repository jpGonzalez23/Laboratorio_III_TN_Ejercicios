import { Casa } from "./casa.js";
import { leer, escribir, limpiar, jsonToObject, objectToJson } from "./local-storage.js";

const KEY_STORAGE = "casas";
const items = [];
const formulario = document.getElementById("form-item");

document.addEventListener("DOMContentLoaded", onInit); // importante no poner parentesis, es un callback

function onInit() {
  loadItems();
  rellenarTabla();

  escuchandoFormulario();
  escuchandoBtnDeletaAll();
}

function loadItems() {
  let str = leer(KEY_STORAGE);
  const objetos = jsonToObject(str) || [];
  objetos.forEach( obj => {
    const model = new Casa(
      obj.id,
      obj.titulo,
      obj.precio
    );
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
  formulario.addEventListener("submit", (e) => {
    e.preventDefault();

    var fechaActual = new Date();

    const model = new Casa(
      fechaActual.getTime(),
      formulario.querySelector("#titulo").value,
      formulario.querySelector("#precio").value
    );

    const respuesta = model.verify();

    if (respuesta.succes) {
      items.push(model);
      const str = objectToJson(items);
      escribir(KEY_STORAGE, str);

      actualizarFormulario()
      rellenarTabla();
    } else {
      alert(respuesta.rta);
    }

  });
}

function actualizarFormulario() {
  formulario.reset();
}

function escuchandoBtnDeletaAll() {
  const btn = document.getElementById("btn-delete-all");

  btn.addEventListener("click", (e) => {
    const rta = confirm('¿Desea eliminar todos los Items?');

    if (rta) {
      items.splice(0, items.length);

      limpiar(KEY_STORAGE);
      rellenarTabla();
    }
  });
}