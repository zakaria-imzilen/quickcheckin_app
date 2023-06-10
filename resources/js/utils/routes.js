import LogIn from "../components/auth/LogIn";
import Redirect from "../components/auth/Redirect";
import SignUp from "../components/auth/SignUp";
import Category from "../pages/Category";
import Checkout from "../pages/Checkout";
import DetailsEvent from "../pages/DetailsEvent";
import Home from "../pages/Home";
import ProfilePage from "../pages/ProfilePage";

const guest = [
    {
        id: 1,
        path: "/",
        element: Home,
    },
    {
        id: 2,
        path: "/category/:categoryId",
        element: Category,
    },
    {
        id: 3,
        path: "/event/:slug",
        element: DetailsEvent,
    },
    {
        id: 4,
        path: "/checkout",
        element: Checkout,
    },
    {
        id: 5,
        path: "/signup",
        element: SignUp,
    },
    {
        id: 6,
        path: "/login",
        element: LogIn,
    },
    {
        id: 7,
        path: "*",
        element: Redirect,
    },
];

export default {
    /*
        <Route exact path="/" element={<Home />} />
        <Route path="/category/:categoryId" element={<Category />} />
        <Route path="/event/:slug" element={<DetailsEvent />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<LogIn />} />

        <Route path="/profile" element={<ProfilePage />} />
    */
    guest,
    user: [
        ...guest.filter((route) => route.path !== "/signup"),
        {
            id: 5,
            path: "/profile",
            element: ProfilePage,
        },
    ],
    superadmin: [],
    organizer: [],
};
