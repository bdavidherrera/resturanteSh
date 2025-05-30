import { registrarUsuario, loginUsuario} from '../apiConnection/consumeApi.js';


document.addEventListener("DOMContentLoaded", () => {

    const formulario = document.getElementById("formRegistro");
    const formularioLogin = document.getElementById("loginForm");

    if(formulario){
        formulario.addEventListener("submit", async (e) => {
        e.preventDefault(); // Evita que el formulario se recargue

        const datosUsuario = {
            cedula: document.getElementById("cedula").value,
            nombre_completo: document.getElementById("nombre_completo").value,
            correo: document.getElementById("correo").value,
            numero: document.getElementById("numero").value,
            contraseña: document.getElementById("contraseña").value,
            estado: "1", // Asignamos un estado por defecto
            roles: document.getElementById("roles").value
        };

        try {
            const resultado = await registrarUsuario(datosUsuario);
            if (resultado.affectedRows > 0) {
                console.log("Registro exitoso");
                 alert("Usuario registrado con éxito.");
                 window.location.href = "login.html"; 
                formulario.reset();
            } else {
                alert("El usuario no se pudo registrar . Datos duplicados.");
                console.log("El resultado no fue válido:", resultado);
            }
        } catch (error) {
            console.error("Error en el registro:", error);
            alert("Hubo un error al registrar el usuario. Datos duplicados revisar tus datos");
        }
    });
    }

   if(formularioLogin){          
    formularioLogin.addEventListener("submit", async (e) => {         
        e.preventDefault();           
        
        const datosLogin = {             
            correo: document.getElementById("correo").value,             
            contraseña: document.getElementById("contraseña").value         
        };          

        try {             
            const resultado = await loginUsuario(datosLogin);              
            console.log("Usuario logueado:");

            let usuario;
            
            if (Array.isArray(resultado)) {
                usuario = resultado[0]; 
            } else {
                usuario = resultado; 
            }
            
            if (!usuario) {
                alert("No se encontró información del usuario.");
                return;
            }
            
            const rol = (usuario.roles || "").toLowerCase().trim();

            sessionStorage.setItem("idUsuario", usuario.idusuarios);
            sessionStorage.setItem("rol", usuario.roles);
            console.log("Usuario:", usuario);                   
            if (rol === "admin") {  

                alert("Bienvenido Administrador"); 

                window.location.href = "admin.html";  

            } else if (rol === "cliente") {                      
                alert("Bienvenido Cliente");

                window.location.href = "cliente.html";  

            } else {                     
                alert("Rol desconocido: " + rol);                 
            }                  
            
            formularioLogin.reset();                       
            
        } catch (error) {             
            console.error("Error en el login:", error);             
            alert("Hubo un error al iniciar sesión.");         
        }     
    });     
}
    
});


