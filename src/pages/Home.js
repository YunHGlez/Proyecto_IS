import React from "react";

import Banner from "../components/Banner";
import Header from "../components/Header";

const Home = (props) => {
    return (
        <>
            <Header 
                isThereButton={true}
                logoutButton={false}
                logout={props.logout}
            />
            <main>
                <Banner />
            </main>
        </>
    );
};

export default Home;
