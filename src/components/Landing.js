import React from "react";
import Footer from "./Layouts/Footer";

export default function Landing() {
    return (
        <div>
            <div className={"hero-lights"}>
                <div className={"hero-light hero-light-1"}></div>
                <div className={"hero-light hero-light-2"}></div>
                <div className={"hero-light hero-light-3"}></div>
                {/*<div className={"hero-light hero-light-4"}></div>*/}
            </div>
            <div className={"main"}>
                <div className={"hero con-mid"}>
                    <div className={"hero-container"}>
                        <div className={"row"}>
                            <div className={"col"}>
                                <div className={"hero-brand"}>
                                    <h3>
                                        <span>
                                            <img src={"/img/logo192.png"} className={"hero-eth-auth-logo"}
                                                 alt={"eth-auth logo"}/>
                                        </span>
                                        eth-auth
                                    </h3>
                                </div>
                                <h1 className={"margin-bottom-40"}>
                                    The way how dApps authenticate<br/>their users
                                </h1>
                                <span className={"npm-i"}>
                                    npm i eth-auth
                                </span>
                                <span className={"yarn-add"}>
                                    yarn add eth-auth
                                </span>
                                <div className={"twitter-badge"}>
                                    <a className={"link"} href={"https://twitter.com/sathnindu"} target={"_blank"}>
                                    <span><svg
                                        className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium MuiSvgIcon-root MuiSvgIcon-fontSizeLarge css-1shn170"
                                        focusable="false" aria-hidden="true" viewBox="0 0 24 24" height={16} width={16}
                                        data-testid="TwitterIcon" tabIndex="-1" title="Twitter"><path
                                        d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"></path></svg></span> @sathnindu
                                    </a>
                                </div>
                            </div>
                            <div className={"col col-lg-2"}>
                                demo
                                <span className={"open-source-badge"}>open-source</span>
                                <span className={"github-badge"}>GitHub</span>
                            </div>
                        </div>

                    </div>

                </div>

                <div className={"blocks"}>
                    Blocks
                </div>
                <div className={"overview"}>
                    Overview
                </div>
                <Footer/>
            </div>
        </div>
    );
}