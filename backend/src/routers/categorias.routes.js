import {Router} from "express";
import {methodHTPP as categoriaController} from "../controllers/categorias.controllers.js";

/*Creamos el enrutador */
const router = Router();

/*get */
/*Configuramos respuesta desde server metodo http get */
router.get("/", categoriaController.getCategorias);

router.post("/RegistrarAdmin", categoriaController.postCategoriasAdmin);

router.put("/ActualizarCategoria", categoriaController.putCategoriasAdmin);

export default router;
