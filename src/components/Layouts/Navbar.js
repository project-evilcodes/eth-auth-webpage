import React, {useEffect} from 'react';
import {Link} from "react-router-dom";
import axios from "axios";
import Keys from "../../config/Keys";


export const Navbar = () => {

    function topFunction() {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    }

    useEffect(() => {
        axios.get(Keys.API_URL + '/start').then(function (response) {
            console.log(response.data);
        });
    }, []); // eslint-disable-line no-use-before-define

    return (
        <nav className="navbar navbar-expand-lg navbar-light navbar-bg">
            <div className={"container"}>
                <button className="navbar-toggler" type="button" data-toggle="collapse"
                        data-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false"
                        aria-label="Toggle navigation">
                    {/*<span className="navbar-toggler-icon"></span>*/}
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 16 16" fill="none"
                         className="css-1170n61">
                        <rect x="1" y="5" width="14" height="1.5" rx="1" fill="#3f0150"></rect>
                        <rect x="1" y="9" width="14" height="1.5" rx="1" fill="#3f0150"></rect>
                    </svg>
                </button>
                <Link to="/" onClick={topFunction} className="navbar-brand">
                    eth-auth
                </Link>

                <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
                    <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                        <li className="nav-item con-mid">
                            <a href={"#overview"} className="nav-link">
                                Overview
                            </a>
                        </li>
                        <li className="nav-item con-mid">
                            <a href={"https://sathnindu-kottage.gitbook.io/eth-auth/"} target={"_self"} className="nav-link">
                                Documentation
                            </a>
                        </li>
                        <li className="nav-item con-mid">
                            <a href={"https://github.com/project-evilcodes/ethauth-server"} target={"_self"} className="nav-link">
                                GitHub
                            </a>
                        </li>
                        <li className="nav-item con-mid">
                            <a href={"https://stackoverflow.com/search?q=eth-auth"} target={"_blank"}
                               rel="noopener noreferrer" className="nav-link">
                                Stackoverflow
                            </a>
                        </li>
                    </ul>

                    <div className="nav-right navbar-nav ml-auto">
                        <li className="nav-item con-mid">
                            <a href={"https://github.com/project-evilcodes/ethauth-server"} className="nav-link nav-sites-btn">
                                Fork on GitHub
                            </a>
                        </li>
                    </div>

                </div>
            </div>
        </nav>

    );
};
