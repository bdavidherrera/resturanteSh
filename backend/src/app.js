/*importamos al framework express */

import express, { request } from "express";
import categoriasRoutes from "./routers/categorias.routes.js"
import rollosRoutes from "./routers/rollos.routes.js"
import usuariosRoutes from "./routers/usuarios.routes.js"
import usuariosLoginRoutes from "./routers/usuariosLogin.routes.js"
import promocionesRoutes from "./routers/promociones.routes.js"
import calificacionesRoutes from "./routers/calificaciones.routes.js"
import cors from "cors"

/*Asignamos a app toda funcionalidad para mi server web */
const app = express();


/*setear un puerto ami web server */
app.set("port",8000);

app.use(express.json());
app.use(express.urlencoded({extended:true}));


/*routers */
app.use(cors()); 

app.use("/api/categorias",categoriasRoutes) //Mostrar categorias y ingresarlas(desde admin)

app.use("/api/rollos", rollosRoutes) //Mostrar, registrar rollos, actualizar y eliminar rollos (desde admin)


app.use("/api/Promociones", promocionesRoutes)//Mostrar promociones de los rollos en Admin, clientes, ingresarlos, actualizarlos y eliminarlos

app.use("/api/calificaciones", calificacionesRoutes) //Mostrar calificaciones de los rollos en Admin y clientes


app.use("/Registrar", usuariosRoutes); //Registrar Usuarios clientes


app.use("/Login", usuariosLoginRoutes); //Verificar datos del login

app.use("/api/usuarios", usuariosRoutes); //Mostrar Usuarios clientes



app.get("/",(req,res)=>{
    res.send("Manuel Isaac Gomez Galvis y Herrera Barajas Brayan David B191")
});

export default app;