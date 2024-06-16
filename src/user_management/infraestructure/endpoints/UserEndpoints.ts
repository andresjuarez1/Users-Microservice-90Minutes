import { Express } from "express";
import { activateUserController, deleteUserController, getByUuidController, listUsersController, singInUserController, singOutUserController, singUpUserController, updateUserController, activatePromotionController, getPromotionStatusController } from "../Dependencies";

export function setupUserEndpoints(app: Express) {
    app.get(`/health`, (req, res) => {
        res.status(200).json({ status: 'OK' });
    });
    app.post(`/sign_up`, singUpUserController.execute.bind(singUpUserController));
    app.post(`/sign_in`, singInUserController.execute.bind(singInUserController));
    app.get(`/:uuid`, getByUuidController.execute.bind(getByUuidController));
    app.delete(`/:uuid`, deleteUserController.execute.bind(deleteUserController));
    app.get(`/activate/:uuid`, activateUserController.execute.bind(activateUserController));
    app.get(`/promotion/:uuid`, (req, res) => activatePromotionController.execute(req, res));
    app.get(`/promotion/status/:uuid`, (req, res) => getPromotionStatusController.execute(req, res));
    app.get(`/`, listUsersController.execute.bind(listUsersController));
    app.get(`/sign_out/:uuid`, singOutUserController.execute.bind(singOutUserController));
}
