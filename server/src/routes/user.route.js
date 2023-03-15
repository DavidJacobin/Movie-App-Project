import express from "express";
import { body } from "express-validator";
import favoriteController from "../controllers/favourite.controller.js";
import userController from "../controllers/user.controller.js";
import requestHandler from "../handlers/request.handler.js";
import userModel from "../models/user.model.js";
import tokenMiddleware from "../middlewares/token.middleware.js";

const router = express.Router();

router.post(
    '/singup',
    body("username")
        .exists().withMessage("Username is required!")
        .isLength({ min: 8 }).withMessage("Username must be atleast 8 characters!")
        .custom(async value => {
            const user = await userModel.findOne({ username: value });

            if (user) return Promise.reject("Username allredy taken!");

        }),
    body("password")
        .exists().withMessage("Password is required!")
        .isLength({ min: 8 }).withMessage("Password must be atleast 8 characters!")
        .custom((value, { req }) => {
            if (value !== req.body.password) throw new Error("Passwords don't match!");

            return true
        }),
    body("displayName")
        .exists().withMessage("Display Name is required!")
        .isLength({ min: 4 }).withMessage("Display Name must be atleast 4 characters!"),

    requestHandler.validate,
    userController.singUp

);


router.post(
    '/singin',
    body("username")
        .exists().withMessage("Username is required!")
        .isLength({ min: 8 }).withMessage("Username should be atleast 8 characters!"),
    body("password")
        .exists().withMessage("Password is required!")
        .isLength({ min: 8 }).withMessage("Password should be atleast 8 characters!"),

    requestHandler.validate,
    userController.singIn
);

router.put(
    '/update-password',
    tokenMiddleware.auth,
    body('password')
        .exists().withMessage("Password is required!")
        .isLength({ min: 8 }).withMessage("Password must be atleast 8 characters!"),
    body('newPassword')
        .exists().withMessage("Confirm password is reqiured!")
        .isLength({ min: 8 }).withMessage("Confirm password must be atleast 8 characters!"),
    body('confirmNewPassword')
        .exists().withMessage("Confirm password is reqiured!")
        .isLength({ min: 8 }).withMessage("Confirm password must be atleast 8 characters!")
        .custom((value, { req }) => {
            if (value !== req.body.newPassword) throw new Error("Passwords don't match!")
        }),

    requestHandler.validate,
    userController.updatePassword
);

router.get(
    "/info",
    tokenMiddleware.auth,
    requestHandler.validate,
);

router.get(
    "/favorites",
    tokenMiddleware.auth,
    favoriteController.getFavouriteOfUser
);

router.post(
    "/favorites",
    tokenMiddleware.auth,
    body("mediatype")
        .exists().withMessage("Media Type is required!")
        .custom(type => ["movie", "tv"].includes(type).withMessage("Media Type invalid!")),
    body("mediId")
        .exists().withMessage("Media Id is required!")
        .isLength({ min: 1 }).withMessage("Media Id can not be empty!"),
    body("mediaTitle")
        .exists().withMessage("Media Title can not be empty!"),
    body("mediaPoster")
        .exists().withMessage("Media Poster can not be empty!"),
    body("mediaRate")
        .exists().withMessage("Media Rate can not be empty!"),
    favoriteController.addFavourite
);

router.delete(
    "/favoirite/:favoriteId",
    tokenMiddleware.auth,
    favoriteController.removeFavourite
);




export default router;