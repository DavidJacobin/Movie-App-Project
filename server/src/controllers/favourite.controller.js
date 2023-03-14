import responseHandler from "../handlers/response.handler.js";
import favoriteModel from "../models/favorite.model.js";

const addFavourite = async (req, res) => {
    try {
        const isFavourite = await favoriteModel.findOne({
            user: req.user.id,
            mediaId: req.body.mediaId
        });

        if (isFavourite) return responseHandler.ok(res, isFavourite);

        const favorite = new favoriteModel({
            ...req.body,
            user: req.user.id
        });

        await favorite.save();

        responseHandler.created(res, favorite);


    } catch {
        responseHandler.error(res);
    }
}


const removeFavourite = async (req, res) => {
    try {
        const {favoriteId} = req.params;

        const favorite = await favoriteModel.findOne({
            user: req.user.id,
            _id: favoriteId
        })

        if (!favorite) return responseHandler.notfound(res);

        await favorite.remove();

        responseHandler.ok(res);

    } catch {
        
    }
};


const getFavouriteOfUser = async (req, res) => {
    try {
        const favorite = await favoriteModel.findOne({user: req.user.id}).sort("-createdAt");

        responseHandler.ok(res, favorite);
    } catch {
        responseHandler.error(res)
    }
};

export default {getFavouriteOfUser, addFavourite, removeFavourite};