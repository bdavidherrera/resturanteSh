import {Router} from "express";
import {methodHTPP as PromocionesController} from "../controllers/Promociones.controllers.js";

/*Creamos el enrutador */
const router = Router();

/*get */
/*Configuramos respuesta desde server metodo http get */
router.get("/", PromocionesController.getPromociones);

router.post("/Registrar", PromocionesController.postPromociones);

router.put("/Actualizar", PromocionesController.upatePromociones);

router.delete("/EliminarPromociones/:idPromociones", PromocionesController.deletePromociones);

export default router;