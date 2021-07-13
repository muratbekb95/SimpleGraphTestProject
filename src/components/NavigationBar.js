import React from 'react'
import '../static/css/NavigationBar.css'
import navLogo from '../../src/static/assets/img/nav/navLogo.svg'
import navHome from '../../src/static/assets/img/nav/navHome.svg'
import navAccount from '../../src/static/assets/img/nav/navAccount.svg'
import navAvatar from '../../src/static/assets/img/nav/navAvatar.svg'
import navSettings from '../../src/static/assets/img/nav/navSettings.svg'
import navOpen from '../../src/static/assets/img/nav/navOpen.svg'

const NavigationBar = () => {
    return (
        <div className="navigationBar">
            <div className="navigationBar__top">
                <img
                    className="navigation__logo"
                    src={navLogo}/>
                <img
                    className="navigation__home"
                    src={navHome}/>
                <img
                    className="navigation__account"
                    src={navAccount}/>
            </div>
            <div className="navigationBar__bottom">
                <img
                    className="navigation__avatar"
                    src={navAvatar}/>
                <img
                    className="navigation__settings"
                    src={navSettings}/>
                <img
                    className="navigation__open"
                    src={navOpen}/>
            </div>
        </div>
    )
}

export default NavigationBar;