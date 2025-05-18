/*importamos al framework express */

import express, { request } from "express";
import categoriasRoutes from "./routers/categorias.routes.js"
import rollosRoutes from "./routers/rollos.routes.js"
import usuariosRoutes from "./routers/usuarios.routes.js"
import promocionesRoutes from "./routers/promociones.routes.js"
import cors from "cors"

/*Asignamos a app toda funcionalidad para mi server web */
const app = express();

/*setear un puerto ami web server */
app.set("port",8000);

/*routers */
app.use(cors()); 

app.use("/api/categorias",categoriasRoutes)

app.use("/api/rollos", rollosRoutes)

app.use("/admin", usuariosRoutes)

app.use("/api/Promociones", promocionesRoutes)


app.get("/",(req,res)=>{
    res.send("Manuel Isaac Gomez Galvis y Herrera Barajas Brayan David B191")
});

export default app;