import HomePage from "../pages/HomePage";
import PersonDetails from "../pages/PersonDetails";
import MediaList from "../pages/MediaList";
import MediaDetail from "../pages/MediaDetail";
import FavoriteList from "../pages/FavoriteList";
import MediaSearch from "../pages/MediaSearch";
import PasswordUpdate from "../pages/PasswordUpdate";
import ReviewList from "../pages/ReviewList";
import ProtectPage from "../components/common/ProtectedPage.jsx";


export const routesGen = {
    home: "/",
    mediaList: (type) => `/${type}`,
    mediaDetail: (type, id) => `/${type}/${id}`,
    mediaSerach: "/search",
    person: (id) => `/person/${id}`,
    favoriteList: "/favorites",
    reviewList: "/reviews",
    passwordUpdate: "/password-update"
};



const routes = [
    {
        index: true,
        element: <HomePage/>,
        state: "home"
    },
    {
        path: "/person/:personId",
        element: <PersonDetails/>,
        state: "person.detail"
    },
    {
        path: "/search",
        element: <MediaSearch/>,
        state: "search"
    },
    {
        path: "/password-update",
        element: (
            <ProtectPage>
                <PasswordUpdate/>
            </ProtectPage>
        ),
        state: "password.update"
    },
    {
        path: "/favorites",
        element: (
            <ProtectPage>
                <FavoriteList/>
            </ProtectPage>
        ),
        state: "favorite.list"
    },
    {
        path: "/reviews",
        element: (
            <ProtectPage>
                <ReviewList/>
            </ProtectPage>
        ),
        state: "reviews"
    },
    {
        path: "/:mediaType",
        element: <MediaList/>,
    },
    {
        path: "/:mediaType/:mediaId",
        element: <MediaDetail/>
    }
];

const routers = {
    routes,
    routesGen
}

export default routers;
