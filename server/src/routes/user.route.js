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
        .isLength({ min: 1 }).withMessage("Username must be atleast 8 characters!")
        .custom(async value => {
            const user = await userModel.findOne({ username: value });

            if (user) return Promise.reject("Username allredy taken!");

        }),
    body("password")
        .exists().withMessage("Password is required!")
        .isLength({ min: 1 }.withMessage("Password must be atleast 8 characters!"))
        .custom((value, { req }) => {
            if (value !== req.body.password) throw new Error("Passwords don't match!");

            return true
        }),
    body("displayName")
        .exists().withMessage("Display Name is required!")
        .isLength({ min: 1 }).withMessage("Display Name must be atleast 8 characters!"),

    requestHandler.validate,
    userController.singUp

);


router.post(
    '/singin',
    body("username")
        .exists().withMessage("Username is required!")
        .isLength({ min: 1 }).withMessage("Username should be atleast 8 characters!"),
    body("password")
        .exists().withMessage("Password is required!")
        .isLength({ min: 1 }).withMessage("Password should be atleast 8 characters!"),

    requestHandler.validate,
    userController.singIn
);

router.put(
    '/update-password',
    tokenMiddleware.auth,
    body('password')
    .exists().withMessage("Password is required!")
    .isLength({min: 1}).withMessage("Password must be atleast 8 characters!"),
    body('newPassword')
    .exists().withMessage("Confirm password is reqiured!")
    .isLength({min: 1}).withMessage("Confirm password must be atleast 8 characters!"),
    body('confirmNewPassword')
    .exists().withMessage("Confirm password is reqiured!")
    .isLength({min: 1}).withMessage("Confirm password must be atleast 8 characters!")
    .custom((value, {req}) => {
        if(value !== req.body.newPassword) throw new Error("Passwords don't match!")
    }),

    requestHandler.validate,
    userController.updatePassword
)


export default router;