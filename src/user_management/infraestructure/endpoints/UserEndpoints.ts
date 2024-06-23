import { Express, Router } from "express";
import { activateUserController, deleteUserController, getByUuidController, listUsersController, singInUserController, singOutUserController, singUpUserController, updateUserController, activatePromotionController, getPromotionStatusController } from "../Dependencies";

export function setupUserEndpoints(app: Express) {
    const router = Router();

    router.get(`/health`, (req, res) => {
        res.status(200).json({ status: 'OK' });
    });
    router.post(`/sign_up`, singUpUserController.execute.bind(singUpUserController));
    router.post(`/sign_in`, singInUserController.execute.bind(singInUserController));
    router.get(`/:uuid`, getByUuidController.execute.bind(getByUuidController));
    router.delete(`/:uuid`, deleteUserController.execute.bind(deleteUserController));
    router.get(`/activate/:uuid`, activateUserController.execute.bind(activateUserController));
    router.get(`/promotion/:uuid`, (req, res) => activatePromotionController.execute(req, res));
    router.get(`/promotion/status/:uuid`, (req, res) => getPromotionStatusController.execute(req, res));
    router.get(`/`, listUsersController.execute.bind(listUsersController));
    router.get(`/sign_out/:uuid`, singOutUserController.execute.bind(singOutUserController));

    app.use('/users', router);
}
