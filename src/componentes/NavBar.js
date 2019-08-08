import React from 'react';

export default () => <nav id="navbar-main" className="navbar is-fixed-top">
    <div className="navbar-brand">
        <a className="navbar-item is-hidden-desktop">
            <span className="icon"><i className="fas fa-bars"></i>
            </span>
        </a>
    </div>
    <div className="navbar-brand is-right">
        <div className="navbar-item navbar-item-menu-toggle">
            <a>
                <span className="icon"><i className="fas fa-bars"></i>
                </span>
            </a>
        </div>
    </div>
    <div className="navbar-menu fadeIn animated faster">
        <div className="navbar-end">
            <div className="navbar-item has-dropdown has-dropdown-with-icons has-divider">
                <a className="navbar-link is-arrowless"><span className="icon"><i className="fas fa-bars"></i></span><span>Sample Menu</span><span className="icon"><i className="mdi mdi-chevron-down default"></i></span></a>
                <div className="navbar-dropdown">
                    <a href="#/profile" className="navbar-item"><span className="icon"><i className="mdi mdi-account default"></i></span><span>My Profile</span></a><a className="navbar-item"><span className="icon"><i className="mdi mdi-settings default"></i></span><span>Settings</span></a><a className="navbar-item"><span className="icon"><i className="mdi mdi-email default"></i></span><span>Messages</span></a>
                    <hr className="navbar-divider" />
                    <a className="navbar-item"><span className="icon"><i className="mdi mdi-logout default"></i></span><span>Log Out</span></a>
                </div>
            </div>
            <a href="https://justboil.me/bulma-admin-template/one" title="About" className="navbar-item" >
                <span className="icon"><i class="fas fa-users"></i></span><span>About</span>
            </a>
            <a title="Log out" className="navbar-item"><span className="icon"><i className="mdi mdi-logout default"></i></span><span>Log out</span></a>
        </div>
    </div>
</nav>