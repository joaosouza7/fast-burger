import { Router } from "express";

// CONTROLLERS
import { CreateUserController } from "./controllers/user/CreateUserController";
import { AuthUserController } from "./controllers/user/AuthUserController";
import { DetailUserController } from "./controllers/user/DetailUserController";

// MIDDLEWARE DE AUTENTICAÇÃO
import isAuthenticated from "./middlewares/isAuthenticated";

const router = Router();

//-- ROTAS USER --
router.post("/users", new CreateUserController().handle);

router.post("/session", new AuthUserController().handle);

router.get("/me", isAuthenticated, new DetailUserController().handle);


export { router };