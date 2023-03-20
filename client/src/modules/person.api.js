import publicCliant from "../api/client/public.client.js";

const personEndpoints = {
    detail: ({ personId }) => `person/${personId}`,
    medias: ({ personId }) => `person/${personId}/medias`,
};

const personApi = {
    detail: async ({ personId }) => {
        try {
            const response = await publicCliant.get(personEndpoints.detail({ personId }))

            return { response }
        } catch (error) { return { error } }
    },
    medias: async ({ personId }) => {
        try {
            const response = await publicCliant.get(personEndpoints.medias({ personId }))

            return { response }
        } catch (error) { return { error } }
    },
};

export default personApi;