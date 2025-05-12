import {Router} from "express";
import { methodHTPP as rollosController} from "../controllers/rollos.controllers.js";

/*Creamos el enrutador */
const router = Router();

/*get */
/*Configuramos respuesta desde server metodo http get */
router.get("/", rollosController.getRollos);

export default router;
