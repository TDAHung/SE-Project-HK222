import React from 'react';
import './Profile.css';
const Profile = () => {
    return (
        <div className="popup">
            <div className="profile-body">
              <div> <img className="profile-img" src="https://helios-i.mashable.com/imagery/articles/03BFwHOQ1dzjtArO1cmYU50/hero-image.fill.size_1248x702.v1628521216.jpg" alt="Profile"/></div> 
                <div className="profile-info">
                    <p className="profile-name">John Doe</p>
                    <p className="profile-email">johndoe@example.com</p>
                    <p className="profile-bio">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ac enim quis risus fringilla congue ac id metus.</p>
                </div>
            </div>
        </div>
    );
};

export default Profile;
