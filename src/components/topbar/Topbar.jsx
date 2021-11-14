import React from 'react'
import "./topbar.css"
import {Notifications,Language,Settings} from '@mui/icons-material';

const Topbar = () => {
    return (
        <div className="topbar">
            <div className="topbarWrapper">
                <div className="topLeft">
                    <span className="logo">
                        gülayadmin
                    </span>
                </div>
                <div className="topRight">
                    <div className="topbarIconContainer">
                        <Notifications/>
                        <span className="topIconBadge">2</span>
                    </div>
                    <div className="topbarIconContainer">
                        <Language/>
                        <span className="topIconBadge">2</span>
                    </div>
                    <div className="topbarIconContainer">
                        <Settings/>
                   
                    </div>
                    <img src="https://images.pexels.com/photos/5662722/pexels-photo-5662722.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" alt="" className="topAvatar" />
                </div>
            </div>
        </div>
    )
}

export default Topbar
