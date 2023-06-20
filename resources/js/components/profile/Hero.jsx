import React from "react";
import { useSelector } from "react-redux";

const Hero = () => {
    const { info, status } = useSelector((state) => state.user.loggedIn);

    return (
        <section className="bg-transparent mb-8">
            <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-12">
                <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
                    Welcome {info.firstName} to your profile
                </h1>
                <p className="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">
                    🎟️ Discover the World of Events 🌍
                </p>
            </div>
        </section>
    );
};

export default Hero;
