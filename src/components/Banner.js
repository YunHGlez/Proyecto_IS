import React from 'react';

import Banner1 from '../assets/images/banner/call_of_duty_warzone.jpg';
import Banner2 from '../assets/images/banner/fall_guys.png';
import Banner3 from '../assets/images/banner/fornite.jpg';
import Banner4 from '../assets/images/banner/forza_horizon_5.jpg';
import Banner5 from '../assets/images/banner/gta_v.webp';
import Banner6 from '../assets/images/banner/halo_infinite.jpg';
import Banner7 from '../assets/images/banner/hot_wheels_2.jpg';
import Banner8 from '../assets/images/banner/rocket_league.jpg';
import Banner9 from '../assets/images/banner/street_fighter_v.jpg';

import '../assets/styles/components/Banner.css'

const Banner = () => {
    const banner = [Banner1, Banner2, Banner3, Banner4, Banner5, Banner6, Banner7, Banner8, Banner9];
    return (
        <div className="banner-div">
            {
                banner.map((image, index) => (
                    <img key={index} src={image} alt={`Banner ${index}`} />
                    )
                )
            }
        </div>
    );
};

export default Banner;
