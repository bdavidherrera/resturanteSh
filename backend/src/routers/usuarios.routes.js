import {Router} from "express";
import { methodHTPP as usuariosController} from "../controllers/usuarios.controllers.js";

/*Creamos el enrutador */
const router = Router();

/*get */
/*Configuramos respuesta desde server metodo http get */
router.get("/usuarios", usuariosController.getUsuarios);

export default router;
