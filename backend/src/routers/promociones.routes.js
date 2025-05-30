import {Router} from "express";
import {methodHTPP as PromocionesController} from "../controllers/Promociones.controllers.js";

/*Creamos el enrutador */
const router = Router();

/*get */
/*Configuramos respuesta desde server metodo http get */
router.get("/", PromocionesController.getPromociones);

router.post("/Registrar", PromocionesController.postPromociones);

export default router;