import {Router} from "express";
import {methodHTPP as categoriaController} from "../controllers/categorias.controllers.js";

/*Creamos el enrutador */
const router = Router();

/*get */
/*Configuramos respuesta desde server metodo http get */
router.get("/", categoriaController.getCategorias);

export default router;
