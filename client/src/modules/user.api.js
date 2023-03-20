import privateClient from '../api/client/private.client.js';
import publicClient from '../api/client/public.client.js';

const userEndpoints = {
    singIn: "user/singin",
    singUp: "user/singup",
    getInfo: "user/info",
    passwordUpdated: "user/update-password",
    getFavorites: "user/favorites",
    addFavorites: "user/favorites",
};

const userApi = {
    singIn: async ({ username, password }) => {
        try {
            const response = await publicClient.post(
                userEndpoints.singIn,
                { username, password }
            );

            return { response };
        } catch (err) {
            return { err }
        }
    },
    singUp: async ({ username, password, confirmPassword, displayName }) => {
        try {
            const response = await publicClient.post(
                userEndpoints.singUp,
                { username, password, confirmPassword, displayName }
            );
            return { response };
        } catch (err) {
            return { err }
        }
    },
    getInfo: async ({ }) => {
        try {
            const response = await publicClient.get(userEndpoints.getInfo)

            return { response }
        } catch (err) {
            return { err }
        }
    },
    passwordUpdate: async ({ password, newPassword, confirmNewPassword }) => {
        try {
            const response = await privateClient.post(
                userEndpoints.passwordUpdated,
                { password, newPassword, confirmNewPassword }
            )

            return { response }
        } catch (err) {
            return { err }
        }
    },
}

export default userApi;