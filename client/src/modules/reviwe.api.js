import privateClient from "../api/client/private.client.js";

const reviewEndpoints = {
    list: 'reviews',
    add: 'reviews',
    remove: ({ reviewId }) => `reviews/${reviewId}`
};

const reviweApi = {
    add: async ({
        mediaId,
        mediaType,
        mediaTitle,
        mediaPoster,
        content
    }) => {
        try {
            const response = await privateClient.post(
                reviewEndpoints.add,
                {
                    mediaId,
                    mediaType,
                    mediaTitle,
                    mediaPoster,
                    content
                }
            );
            return { response }
        } catch (error) {
            return {error}
        }
    },
    remove: async ({ reviewId}) => {
        try {
            const response = await privateClient.post(reviewEndpoints.remove({reviewId}),);
            return { response }
        } catch (error) {
            return {error}
        }
    },
    getList: async () => {
        try {
            const response = await privateClient.post(reviewEndpoints.list);
            return { response }
        } catch (error) {
            return {error}
        }
    },
};

export default reviweApi;