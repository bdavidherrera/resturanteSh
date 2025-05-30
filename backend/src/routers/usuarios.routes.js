import {Router} from "express";
import { methodHTPP as usuariosController} from "../controllers/usuarios.controllers.js";

/*Creamos el enrutador */
const router = Router();

router.post("/", usuariosController.postUsuarios);

router.get("/admin", usuariosController.getUsuriosAdmin);




export default router;