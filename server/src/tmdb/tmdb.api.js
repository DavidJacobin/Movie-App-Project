import axiosClient from '../axios/axios.client.js';
import tmdbEndPoints from './tmdb.endpoints.js';


const tmdbApi = {
    mediaList: async ({ mediaType, mediaCategory, page }) => await axiosClient.get(
        tmdbEndPoints.mediaList({ mediaType, mediaCategory, page })
    ),
    mediaDetails: async ({ mediaType, page }) => await axiosClient.get(
        tmdbEndPoints.mediaDetails({ mediaType, page })
    ),
    mediaGenres: async ({ mediaType }) => await axiosClient.get(
        tmdbEndPoints.mediaGenres({ mediaType })
    ),
    mediaCredits: async ({ mediaType, mediaId }) => await axiosClient.get(
        tmdbEndPoints.mediaCredits({ mediaType, mediaId })
    ),
    mediaVideos: async ({ mediaType, mediaId }) => await axiosClient.get(
        tmdbEndPoints.mediaVideos({ mediaType, mediaId })
    ),
    mediaImages: async ({ mediaType, mediaId }) => await axiosClient.get(
        tmdbEndPoints.mediaImages({ mediaType, mediaId })
    ),
    mediaRecomendations: async ({ mediaType, mediaId }) => await axiosClient.get(
        tmdbEndPoints.mediaRecomendations({ mediaType, mediaId })
    ),
    mediaSearch: async ({ mediaType, query, page }) => await axiosClient.get(
        tmdbEndPoints.mediaSearch({ mediaType, query, page })
    ),
    personMedias: async ({ personId }) => await axiosClient.get(
        tmdbEndPoints.personMedias({ personId })
    ),
    personDetails: async ({ personId }) => await axiosClient.get(
        tmdbEndPoints.personMedias({ personId })
    ),
}

export default tmdbApi;