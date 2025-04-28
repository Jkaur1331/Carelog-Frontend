import React from 'react'
import avatar from "../images/avatar.png"

const Header = () => {
  return (
    <header className="main-header">
        <div className="user-profile">
        <img src={avatar} alt="User Avatar" className="avatar" />
        <div className="user-info">
            <span className="user-role">Admin</span>
            <span className="user-name">Sam Smith</span>
        </div>
        </div>
    </header>
  )
}

export default Header