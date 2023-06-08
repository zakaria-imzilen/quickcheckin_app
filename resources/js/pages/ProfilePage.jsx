import React, { useState } from "react";
import Header from "../components/profile/Header";
import Content from "../components/profile/Content";
import TableOrders from "../components/profile/TableOrders";
import Hero from "../components/profile/Hero";

const ProfilePage = () => {
    const [orders, setOrders] = useState([
        {
            idOrder: 1,
            img_ticket:
                "https://demos.creative-tim.com/argon-dashboard/assets-old/img/theme/team-4.jpg",
            name_ticket: "mo9awil",
            price_ticket: 200,
            category_ticket: "First Class",
            Quantity_ticket: 10,
            date_command: "20-05-2022",
        },
        {
            idOrder: 2,
            img_ticket:
                "https://demos.creative-tim.com/argon-dashboard/assets-old/img/theme/team-4.jpg",
            name_ticket: "mo9awil",
            price_ticket: 200,
            category_ticket: "First Class",
            Quantity_ticket: 10,
            date_command: "20-05-2022",
        },
        {
            idOrder: 3,
            img_ticket:
                "https://demos.creative-tim.com/argon-dashboard/assets-old/img/theme/team-4.jpg",
            name_ticket: "mo9awil",
            price_ticket: 200,
            category_ticket: "First Class",
            Quantity_ticket: 10,
            date_command: "20-05-2022",
        },
        {
            idOrder: 4,
            img_ticket:
                "https://demos.creative-tim.com/argon-dashboard/assets-old/img/theme/team-4.jpg",
            name_ticket: "mo9awil",
            price_ticket: 200,
            category_ticket: "First Class",
            Quantity_ticket: 10,
            date_command: "20-05-2022",
        },
    ]);
    const [total_info_command_ticket, set_total_info_command_ticket] = useState(
        [
            {
                id_total_info_command_ticket: 1,
                total_number_orders: 20,
                total_ticket_quantity: 50,
                total_The_Amount_Paid: 1500,
                date_inscription: "02/02/2022",
            },
        ]
    );
    const [infoUser, setInfoUser] = useState([
        {
            userId: 1,
            userFirstName: "abdelhamid",
            userLastName: "benchakir",
            userEmail: "hamid@gmail.com",
            userPassord: "123456hjfoj",
            sexe: "man",
            birthDate: "03/04/2005",
            photoURL: "https://images.alphacoders.com/957/957128.jpg",
        },
    ]);

    return (
        <main
            id="profile"
            className="bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-blue-600 via-slate-200 to-slate-100 h-full"
        >
            <Header infoUser={infoUser} />
            <Hero />
            <div className="md:max-w-5xl mx-auto">
                <TableOrders order={orders} />
                <Content
                    infoUser={infoUser}
                    total_info_cammend_ticket={total_info_command_ticket}
                />
            </div>
        </main>
    );
};

export default ProfilePage;
