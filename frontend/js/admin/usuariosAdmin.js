import {obtainUsuarios, registrarUsuario, actualizarUsuarios}  from "../../apiConnection/consumeApi.js"

document.addEventListener("DOMContentLoaded", ()=>{
    const tablaUsuarios = document.querySelector('#usuarios-tbody')
    const formAgregarUsuariof = document.getElementById("addUsuarioForm");
    const formeditarUsuariof = document.getElementById("updateUsuarioForm");
    if(tablaUsuarios){
        getUsuarios(),
        mostrarTotalUsuarios();
        
    }
    if(formAgregarUsuariof){
        registrarUsuarioAdmin();
    }
    if(formeditarUsuariof){
        editarUsuarioAdmin();
    }
})

async function getUsuarios(){
const usuariosObtained = await obtainUsuarios();
const container = document.querySelector('#usuarios-tbody')
container.innerHTML = "";

usuariosObtained.forEach((usuarios)=>{

const{idusuarios, cedula, nombre_completo, correo, contraseña, numero, estado, roles} = usuarios

const row = document.createElement('tr')
row.innerHTML=`
<td>
${idusuarios}
</td>
<td>
${cedula}
</td>
<td>
${nombre_completo}
</td>
<td>
${correo}
</td>
<td>
${contraseña}
</td>
<td>
${numero}
</td>
<td>
${estadoUsuario(estado)}
</td>
<td>
${roles}
</td>
<td>
<button class="btn btn-sm btn-edit">
<i class="fas fa-edit"></i>
</button>
<button class="btn btn-sm btn-delete">
<i class="fas fa-trash"></i>
</button>
</td>
`;
container.appendChild(row);
})
}

function estadoUsuario(estado) {
    if (estado == 1) {
        return "activo";
    } else if(estado == 0){
        return "inactivo";
    }
}

async function mostrarTotalUsuarios() {
    const usuariosObtained = await obtainUsuarios();
    const total = usuariosObtained.length;


    const totalElement = document.querySelector('#usuarios-count');

    if (totalElement) {
        totalElement.textContent = `Total de usuarios: ${total}`;
    }

    return total;
}

async function registrarUsuarioAdmin() {
    const formAgregarUsuariof = document.getElementById("addUsuarioForm");

    formAgregarUsuariof.addEventListener("submit", async (e) => {
        e.preventDefault(); // Evita que el formulario se recargue

        const datosUsuario = {
            cedula: document.getElementById("usuarioCedula").value,
            nombre_completo: document.getElementById("usuarioNombre").value,
            correo: document.getElementById("usuarioCorreo").value,
            contraseña: document.getElementById("usuarioContrasena").value,
            numero: document.getElementById("usuarioNumero").value,
            estado: document.getElementById("usuarioEstado").value,
            roles: document.getElementById("usuarioRol").value
        };

        try {
            const resultado = await registrarUsuario(datosUsuario);
           if (resultado.affectedRows > 0) {
                alert("Usuario registrado con éxito.");
                formAgregarUsuariof.reset();
                const modalElement = document.getElementById('addUsuarioModal');
                const modal = bootstrap.Modal.getInstance(modalElement);
                if (modal) modal.hide();
                getUsuarios();
                mostrarTotalUsuarios();
            } else {
                alert("El usuario no se pudo registrar . Datos duplicados.");
                console.log("El resultado no fue válido:", resultado);
                }

        } catch (error) {
            console.error("Error al registrar el usuario:", error);
            alert("Hubo un error al registrar el usuario. Revisa tus datos.");
            
        }
    });
}

async function editarUsuarioAdmin() {
    const formEditarUsuariof = document.getElementById("updateUsuarioForm"); 
    
    formEditarUsuariof.addEventListener("submit", async (e) => {
        e.preventDefault(); 
        
        const datosUsuario = {
            idusuarios: document.getElementById("updateUsuarioId").value, 
            cedula: document.getElementById("updateUsuarioCedula").value, 
            nombre_completo: document.getElementById("updateUsuarioNombre").value, 
            correo: document.getElementById("updateUsuarioCorreo").value, 
            contraseña: document.getElementById("updateUsuarioContrasena").value, 
            numero: document.getElementById("updateUsuarioNumero").value, 
            estado: document.getElementById("updateUsuarioEstado").value, 
            roles: document.getElementById("updateUsuarioRol").value 
        };
        
        try {
            const resultado = await actualizarUsuarios(datosUsuario);
            if (resultado.affectedRows > 0) {
                alert("Usuario actualizado con éxito.");
                formEditarUsuariof.reset();
                const modalElement = document.getElementById('updateUsuarioModal'); 
                const modal = bootstrap.Modal.getInstance(modalElement);
                if (modal) modal.hide();
                getUsuarios();
                mostrarTotalUsuarios();
            } else {
                alert("El usuario no se pudo actualizar. Datos duplicados.");
                console.log("El resultado no fue válido:", resultado);
            }
        } catch (error) {
            console.error("Error al actualizar el usuario:", error);
            alert("Hubo un error al actualizar el usuario. Revisa tus datos.");
        }
    });
}