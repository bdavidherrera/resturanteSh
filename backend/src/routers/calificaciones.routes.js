import {Router} from "express";
import {methodHTPP as calificacionesController} from "../controllers/calificacion.controllers.js";

/*Creamos el enrutador */
const router = Router();

/*get */
/*Configuramos respuesta desde server metodo http get */
router.get("/", calificacionesController.getCalificaciones);
router.get("/admin", calificacionesController.getCalificacionesAdmin);
router.delete("/admindeleteCal/:idcalificacion", calificacionesController.deleteCalificacionAdmin);


export default router;