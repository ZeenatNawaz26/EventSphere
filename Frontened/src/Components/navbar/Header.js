import React from 'react'
import { Link } from 'react-router-dom'
// import { Link } from 'react-router-dom'
impo

const Header = () => {
    return (
        <>
            <header id="header">
                <div className="container">

                    <div id="logo" className="pull-left">

                        {/* <h1><a href="#main">C<span>o</span>nf</a></h1> */}
                        <a href="#intro" className="scrollto"><img src="img/logo.png" alt="" title="" /></a>
                    </div>

                    <nav id="nav-menu-container">
                        <ul className="nav-menu">
                            <li className="menu-active"><a href="/">Home</a></li>
                            <li><Link to="/about">About</Link></li>
                            <li><Link to="/speaker">Speakers</Link></li>
                            <li><Link to="/schedule">Schedule</Link></li>
                            <li><Link to="/sponsors">Sponsors</Link></li>
                            <li><Link to="Contact">Contact</Link></li>
                            <li className="buy-tickets"><Link to="/Buy-ticket">Buy Tickets</Link></li>
                        </ul>
                    </nav>
                </div>
            </header>
            <section id="intro">
                <div className="intro-container wow fadeIn">
                    <h1 className="mb-4 pb-0">The Annual<br /><span>Marketing</span> Conference</h1>
                    <p className="mb-4 pb-0">10-12 December, Downtown Conference Center, New York</p>
                    <a href="https://www.youtube.com/watch?v=jDDaplaOz7Q" className="venobox play-btn mb-4" data-vbtype="video"
                        data-autoplay="true"></a>
                    <a href="#about" className="about-btn scrollto">About The Event</a>
                </div>
            </section>
        </>
    )
}

export default Header
