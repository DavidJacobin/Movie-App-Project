import express from "express";
import { body } from "express-validator";
import favoriteController from "../controllers/favourite.controller.js";
import userController from "../controllers/user.controller.js";
import requestHandler from "../handlers/request.handler.js";
import userModel from "../models/user.model.js";
import tokenMiddleware from "../middlewares/token.middleware.js";

const router = express.Router();

router.post(
    "/signup",
    body("username")
      .exists().withMessage("username is required")
      .isLength({ min: 8 }).withMessage("username minimum 8 characters")
      .custom(async value => {
        const user = await userModel.findOne({ username: value });
        if (user) return Promise.reject("username already used");
      }),
    body("password")
      .exists().withMessage("password is required")
      .isLength({ min: 8 }).withMessage("password minimum 8 characters"),
    body("confirmPassword")
      .exists().withMessage("confirmPassword is required")
      .isLength({ min: 8 }).withMessage("confirmPassword minimum 8 characters")
      .custom((value, { req }) => {
        if (value !== req.body.password) throw new Error("confirmPassword not match");
        return true;
      }),
    body("displayName")
      .exists().withMessage("displayName is required")
      .isLength({ min: 8 }).withMessage("displayName minimum 8 characters"),
    requestHandler.validate,
    userController.signup
  );
  
router.post(
    "/signin",
    body("username")
      .exists().withMessage("username is required")
      .isLength({ min: 8 }).withMessage("username minimum 8 characters"),
    body("password")
      .exists().withMessage("password is required")
      .isLength({ min: 8 }).withMessage("password minimum 8 characters"),
    requestHandler.validate,
    userController.signin
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
    userController.getInfo,
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
    requestHandler.validate,
    favoriteController.addFavourite
);

router.delete(
    "/favoirite/:favoriteId",
    tokenMiddleware.auth,
    favoriteController.removeFavourite
);




export default router;