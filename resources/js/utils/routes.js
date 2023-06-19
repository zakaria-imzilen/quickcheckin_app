import LogIn from "../components/auth/LogIn";
import Redirect from "../components/auth/Redirect";
import SignUp from "../components/auth/SignUp";
import Category from "../pages/Category";
import Checkout from "../pages/Checkout";
import DetailsEvent from "../pages/DetailsEvent";
import Home from "../pages/Home";
import ProfilePage from "../pages/ProfilePage";
import Dashboard from "../pages/dashboard";
import Organizers from "../pages/dashboard/Organizers";
import Payments from "../pages/dashboard/Payments";
import Tickets from "../pages/dashboard/Tickets";
import Users from "../pages/dashboard/Users";

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
    guest,
    user: [
        ...guest.filter((route) => route.path !== "/signup"),
        {
            id: 5,
            path: "/profile",
            element: ProfilePage,
        },
    ],
    superadmin: [
        {
            id: 1,
            path: "/",
            element: Dashboard,
        },
        {
            id: 2,
            path: "/tickets",
            element: Tickets,
        },
        {
            id: 3,
            path: "/users",
            element: Users,
        },
        {
            id: 4,
            path: "/organizers",
            element: Organizers,
        },
        {
            id: 5,
            path: "/payments",
            element: Payments,
        },
    ],
    organizer: [],
};
