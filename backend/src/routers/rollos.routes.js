import {Router} from "express";
import { methodHTPP as rollosController} from "../controllers/rollos.controllers.js";

/*Creamos el enrutador */
const router = Router();

/*get */
/*Configuramos respuesta desde server metodo http get */
router.get("/", rollosController.getRollos);
router.post("/RegistrarRollos", rollosController.postRollos);
router.put("/ActualizarRollos", rollosController.putRollos);

export default router;
