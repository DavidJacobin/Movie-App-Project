import express from "express";
import personController from "../controllers/person.contreller.js";

const router = express.Router({mergeParams: true});

router.get('/:person/medias', personController.personMedias);

router.get('/:personId', personController.personDetails);

export default router;