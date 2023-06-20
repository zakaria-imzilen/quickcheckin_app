import React, { useEffect } from "react";
import Header from "../components/profile/Header";
import TableOrders from "../components/profile/TableOrders";
import Hero from "../components/profile/Hero";
import Form from "../components/profile/Form";
import Stats from "../components/profile/Stats";
import { useDispatch, useSelector } from "react-redux";
import { fetchMyStats } from "../store/userSlice";

const ProfilePage = () => {
    const { info, status } = useSelector((state) => state.user.loggedIn);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchMyStats(info.id));
    }, []);

    return (
        <main
            id="profile"
            className="bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-blue-600 via-slate-200 to-slate-100 h-full"
        >
            <Header />
            <Hero />
            <div className="md:max-w-5xl mx-auto">
                <Stats />
                <TableOrders />
                {/* <Form /> */}
            </div>
        </main>
    );
};

export default ProfilePage;
