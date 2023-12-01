var parametroRecuperado = localStorage.getItem("listaEmpleados"); 

function siguiente()
{
    window.location="index.html"
}

//CRUD EMPLEADOS

let listaEmpleadoss = [];

const objEmpleados = {
    id: '',
    nombreEmp: '',
    puestos: '',
    documento:'',
    domici:'',
    telef:'',
    fechaNac:'',
    tiene_licencia:''

}

let editandos = false;

const formulario = document.querySelector('#formulario');
const empleInput = document.querySelector('#nombreEmp');
const puestoEmInput = document.querySelector('#puestos');
const docuInput= document.querySelector('#documento');
const domInput= document.querySelector('#domici');
const celInput=document.querySelector('#telef');
const nacInput=document.querySelector('#fechaNac');
const licInput=document.querySelector('#tiene_licencia');
const btnAgregarInput = document.querySelector('#Btnagregar');

formulario.addEventListener('submit', validarFormulario);

function validarFormulario(e) {
    e.preventDefault();

    if(empleInput.value === '' || puestoEmInput.value === ''|| docuInput.value === ''|| domInput.value === ''|| celInput.value === ''|| nacInput.value === ''|| licInput.value === '') {
        alert('Todos los campos se deben llenar');
        return;
    }

    if(editandos) {
        editarEmpleados();
        editandos = false;
    } else {
        objEmpleados.id = Date.now();
        objEmpleados.nombreEmp = empleInput.value;
        objEmpleados.puestos = puestoEmInput.value;
        objEmpleados.documento=docuInput.value;
        objEmpleados.domici=domInput.value;
        objEmpleados.telef=celInput.value;
        objEmpleados.fechaNac=nacInput.value;
        objEmpleados.tiene_licencia=licInput.value;

        agregarEmpleados();
    }
}

function Elocalstorage(listaEmpleadoss){
  localStorage.setItem('EmpleadosAdmin', JSON.stringify(listaEmpleadoss))
}

function ObtenLocalStorage(){
    listaEmpleadoss=JSON.parse(localStorage.getItem('EmpleadosAdmin'))
    mostrarEmpleados()
}

function agregarEmpleados() {

    listaEmpleadoss.push({...objEmpleados});

    Elocalstorage(listaEmpleadoss)
    ObtenLocalStorage()

    formulario.reset();
    limpiarObjetos();
}

function limpiarObjetos() {
    objEmpleados.id = '';
    objEmpleados.nombreEmp = '';
    objEmpleados.puestos= '';
    objEmpleados.documento='';
    objEmpleados.domici='';
    objEmpleados.telef='';
    objEmpleados.fechaNac='';
    objEmpleados.tiene_licencia='';

}

function mostrarEmpleados() {
    limpiareHTML();

    const divEmpleados = document.querySelector('.div-empleados');
    
    listaEmpleadoss.forEach(empleado => {
        const {id, nombreEmp, puestos, documento, domici, telef, fechaNac, tiene_licencia} = empleado;

        const parrafo = document.createElement('p');
        parrafo.textContent = `| Nombre: ${nombreEmp} |Puesto: ${puestos} |DNI: ${documento} |Domicilio: ${domici} |CEL: ${telef} |Nac: ${fechaNac} |Autorizacion: ${tiene_licencia} | `;

        const editarBoton = document.createElement('button');
        editarBoton.onclick = () => cargarEmpleado(empleado);
        editarBoton.textContent = 'Editar';
        editarBoton.classList.add('btn', 'btn-editar');
        parrafo.append(editarBoton);

        const eliminarBoton = document.createElement('button');
        eliminarBoton.onclick = () => eliminarEmpleado(id);
        eliminarBoton.textContent = 'Borrar';
        eliminarBoton.classList.add('btn', 'btn-eliminar');
        parrafo.append(eliminarBoton);

        const hr = document.createElement('hr');

        divEmpleados.appendChild(parrafo);
        divEmpleados.appendChild(hr);
    });
}

function cargarEmpleado(empleado) {
    const {id, nombreEmp, puestos, documento, domici, telef, fechaNac, tiene_licencia} = empleado;

    empleInput.value = nombreEmp;
    puestoEmInput.value = puestos;
    docuInput.value=documento;
    domInput.value=domici;
    celInput.value=telef;
    nacInput.value=fechaNac;
    licInput.value=tiene_licencia;

    objEmpleados.id = id;

    formulario.querySelector('button[type="submit"]').textContent = 'Actualizar';
    
    editandos = true;
}

function editarEmpleados() {

    objEmpleados.nombreEmp = empleInput.value;
    objEmpleados.puestos= puestoEmInput.value;
    objEmpleados.documento=docuInput.value;
    objEmpleados.domici=domInput.value;
    objEmpleados.telef=celInput.value;
    objEmpleados.fechaNac=nacInput.value;
    objEmpleados.tiene_licencia=licInput.value;
    

    listaEmpleadoss.map(empleado => {

        if(empleado.id === objEmpleados.id) {
            empleado.id = objEmpleados.id;
            empleado.nombreEmp = objEmpleados.nombreEmp;
            empleado.puestos = objEmpleados.puestos;
            empleado.documento=objEmpleados.documento;
            empleado.domici=objEmpleados.domici;
            empleado.telef=objEmpleados.telef;
            empleado.fechaNac=objEmpleados.fechaNac;
            empleado.tiene_licencia=objEmpleados.tiene_licencia;
            
        }

    });

    Elocalstorage(listaEmpleadoss)
    ObtenLocalStorage()
    formulario.reset();

    formulario.querySelector('button[type="submit"]').textContent = 'Agregar';
    
    editandos = false;
}

function eliminarEmpleado(id) {

    listaEmpleadoss = listaEmpleadoss.filter(empleado => empleado.id !== id);
        
    Elocalstorage(listaEmpleadoss)
    ObtenLocalStorage()

}

function limpiareHTML() {
    const divEmpleados = document.querySelector('.div-empleados');
    while(divEmpleados.firstChild) {
        divEmpleados.removeChild(divEmpleados.firstChild);
    }
}

ObtenLocalStorage()

