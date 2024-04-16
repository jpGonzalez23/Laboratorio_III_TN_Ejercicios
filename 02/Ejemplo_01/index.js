console.log("Entro al index.js");

document.addEventListener("DOMContentLoaded", onInit);

// document.addEventListener("DOMContentLoaded", () => {
//     // console.log("Ya cargo la pagina");
//     // const form = document.getElementById('form-usuario');
//     // console.log(form);
//     onInit();
// });

function onInit() {
    console.log("entro al init")
    
    sumar(2, 5);
    cargarPaises();
    onSubmit();
}

function sumar(param1, param2) {
    console.log(param1 + param2);
}

function cargarPaises() {
    console.log("Cargó los paises");
}

function onSubmit() {
    console.log("entro al submit");
    
    const form = document.getElementById("form-usuario");

    form.addEventListener("submit", (event) => {

        event.preventDefault();
        let arrData = [];

        for (let i = 0; i < form.elements.length; i++) {
            const element = form.elements[i];
            let val = element.value;

            //let str = element.name + ": " + element.value;

            if (element.type === 'radio') {
                str = element.name + ": " + element.checked == 'on';
            }

            const aux = { key: element.name, value: element.value };
            arrData.push(aux);
        }

        const rta = checkDatosDelFormulario(arrData);

        if (rta) {
            console.log("directo al bakc");
        }
        else { 
            console.log("ups!");
        }
    });
}

function checkDatosDelFormulario(array) {
    console.log(array);

    return true;
}