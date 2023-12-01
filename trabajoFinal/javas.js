	
function nobackbutton(){
window.location.hash="no-back-button";
window.location.hash="Again-No-back-button";
window.onhashchange=function(){window.location.hash="no-back-button";}
} /*no funciona*/

let listaEmpleados = [];

const objEmpleado = {
    id: '',
    nombre: '',
    plan: '',
    nombreComp:'',
    indust:'',
    celular:'',
    estado:'',
    city:'',
    mail:''

}

let editando = false;

const formulario = document.querySelector('#formulario');
const nombreInput = document.querySelector('#nombre');
const puestoInput = document.querySelector('#plan');
const compInput= document.querySelector('#nombreComp');
const induInput= document.querySelector('#indust');
const telInput=document.querySelector('#celular');
const estadoInput=document.querySelector('#estado');
const cityInput=document.querySelector('#city');
const emailInput=document.querySelector('#mail');
const btnAgregarInput = document.querySelector('#btnAgregar');

formulario.addEventListener('submit', validarFormulario);

function validarFormulario(e) {
    e.preventDefault();

    if(nombreInput.value === '' || puestoInput.value === ''|| compInput.value === ''|| induInput.value === ''|| telInput.value === ''|| estadoInput.value === ''|| cityInput.value === ''|| emailInput.value === '') {
        alert('Todos los campos se deben llenar');
        return;
    }

    if(editando) {
        editarEmpleado();
        editando = false;
    } else {
        objEmpleado.id = Date.now();
        objEmpleado.nombre = nombreInput.value;
        objEmpleado.plan = puestoInput.value;
        objEmpleado.nombreComp=compInput.value;
        objEmpleado.indust=induInput.value;
        objEmpleado.celular=telInput.value;
        objEmpleado.estado=estadoInput.value;
        objEmpleado.city=cityInput.value;
        objEmpleado.mail=emailInput.value;

        agregarEmpleado();
    }
}

function Glocalstorage(listaEmpleados){
  localStorage.setItem('companias', JSON.stringify(listaEmpleados))
}

function ObtLocalStorage(){
    listaEmpleados=JSON.parse(localStorage.getItem('companias'))
    mostrarEmpleados()
}

function agregarEmpleado() {

    listaEmpleados.push({...objEmpleado});

    Glocalstorage(listaEmpleados)
    ObtLocalStorage()

    formulario.reset();
    limpiarObjeto();
}

function limpiarObjeto() {
    objEmpleado.id = '';
    objEmpleado.nombre = '';
    objEmpleado.plan = '';
    objEmpleado.nombreComp='';
    objEmpleado.indust='';
    objEmpleado.celular='';
    objEmpleado.estado='';
    objEmpleado.city='';
    objEmpleado.mail='';
}

function mostrarEmpleados() {
    limpiarHTML();

    const divEmpleados = document.querySelector('.div-empleados');
    
    listaEmpleados.forEach(empleado => {
        const {id, nombre, plan, nombreComp, indust, celular, estado, city, mail} = empleado;

        const parrafo = document.createElement('p');
        parrafo.textContent = `| ${nombre} | ${plan} | ${nombreComp} | ${indust} | ${celular} | ${estado} | ${city} | ${mail} | `;

        const editarBoton = document.createElement('button');
        editarBoton.onclick = () => cargarEmpleado(empleado);
        editarBoton.textContent = 'Editar';
        editarBoton.classList.add('btn', 'btn-editar');
        parrafo.append(editarBoton);

        const eliminarBoton = document.createElement('button');
        eliminarBoton.onclick = () => eliminarEmpleado(id);
        eliminarBoton.textContent = 'Eliminar';
        eliminarBoton.classList.add('btn', 'btn-eliminar');
        parrafo.append(eliminarBoton);

        const hr = document.createElement('hr');

        divEmpleados.appendChild(parrafo);
        divEmpleados.appendChild(hr);
    });
}

function cargarEmpleado(empleado) {
    const {id, nombre, plan, nombreComp, indust, celular, estado, city, mail } = empleado;

    nombreInput.value = nombre;
    puestoInput.value = plan;
    compInput.value=nombreComp;
    induInput.value=indust;
    telInput.value=celular;
    estadoInput.value=estado;
    cityInput.value=city;
    emailInput.value=mail;


    objEmpleado.id = id;

    formulario.querySelector('button[type="submit"]').textContent = 'Actualizar';
    
    editando = true;
}

function editarEmpleado() {

    objEmpleado.nombre = nombreInput.value;
    objEmpleado.plan = puestoInput.value;
    objEmpleado.nombreComp=compInput.value;
    objEmpleado.indust=induInput.value;
    objEmpleado.celular=telInput.value;
    objEmpleado.estado=estadoInput.value;
    objEmpleado.city=cityInput.value;
    objEmpleado.mail=emailInput.value;

    listaEmpleados.map(empleado => {

        if(empleado.id === objEmpleado.id) {
            empleado.id = objEmpleado.id;
            empleado.nombre = objEmpleado.nombre;
            empleado.plan = objEmpleado.puesto;
            empleado.nombreComp=objEmpleado.nombreComp;
            empleado.indust=objEmpleado.indust;
            empleado.celular=objEmpleado.celular;
            empleado.estado=objEmpleado.estado;
            empleado.city=objEmpleado.city;
            empleado.mail=objEmpleado.mail;

        }

    });

    Glocalstorage(listaEmpleados)
    ObtLocalStorage()
    formulario.reset();

    formulario.querySelector('button[type="submit"]').textContent = 'Agregar';
    
    editando = false;
}

function eliminarEmpleado(id) {

    listaEmpleados = listaEmpleados.filter(empleado => empleado.id !== id);
        
    Glocalstorage(listaEmpleados)
    ObtLocalStorage()

}

function limpiarHTML() {
    const divEmpleados = document.querySelector('.div-empleados');
    while(divEmpleados.firstChild) {
        divEmpleados.removeChild(divEmpleados.firstChild);
    }
}

ObtLocalStorage()

