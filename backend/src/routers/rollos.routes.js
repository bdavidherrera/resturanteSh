import {Router} from "express";
import { methodHTPP as rollosController} from "../controllers/rollos.controllers.js";

/*Creamos el enrutador */
const router = Router();


router.get("/", rollosController.getRollos);
router.post("/RegistrarRollos", rollosController.postRollos);
router.put("/ActualizarRollos", rollosController.putRollos);
router.delete("/EliminarRollos/:idrollos", rollosController.deleterollos);

export default router;
