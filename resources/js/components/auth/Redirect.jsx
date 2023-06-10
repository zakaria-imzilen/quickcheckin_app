import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Redirect = ({ path }) => {
    const navigate = useNavigate();

    useEffect(() => {
        navigate(path);
    }, []);
};

export default Redirect;
