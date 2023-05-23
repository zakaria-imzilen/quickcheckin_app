import React from "react";
import { useSelector } from "react-redux";

const Slide = () => {
    const events = useSelector((state) => state.event.data);

    console.log(events);

    return (
        <div
            id="carouselExampleSlidesOnly"
            className="carousel slide"
            data-bs-ride="carousel"
        >
            <div className="carousel-inner flex">
                <h1>Slide</h1>
                {events.length > 0 &&
                    events
                        // .sort()
                        // .slice(0, 4)
                        .map((event) => (
                            <img
                                src={event.event.imageURL}
                                className="d-block w-100"
                                alt={event.event.name}
                            />
                        ))}
                {/* <div className="carousel-item">
                    <img
                        src="https://gcdn.imgix.net/campaigns/cartes-abonnement-netflix-2.jpg"
                        className="d-block w-100"
                        alt="..."
                    />
                </div>
                <div className="carousel-item">
                    <img
                        src="https://gcdn.imgix.net/campaigns/pubg-mobile-2.jpg"
                        className="d-block w-100"
                        alt="..."
                    />
                </div>
                <div className="carousel-item">
                    <img
                        src="https://gcdn.imgix.net/campaigns/sweat-shirt-champions-league.jpeg"
                        className="d-block w-100"
                        alt="..."
                    />
                </div> */}
            </div>
        </div>
    );
};

export default Slide;
