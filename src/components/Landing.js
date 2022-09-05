import React, {useEffect, useState} from "react";
import Footer from "./Layouts/Footer";
import axios from "axios";
import {ethers} from "ethers";
import Helmet from "react-helmet";
import Keys from "../config/Keys";
import CircularProgress from '@mui/material/CircularProgress';

export default function Landing() {

    const [data, setData] = useState("");
    const [authenticity, setAuthenticity] = useState(null);

    const connectWallet = async () => {
        try {
            const {ethereum} = window;
            if (!ethereum) {
                console.log("please install MetaMask");
            }
            const accounts = await ethereum.request({
                method: 'eth_requestAccounts'
            });
            if (accounts[0]) {
                await fetchData();
            }
        } catch (error) {
            console.log(error);
        }
    }


    async function fetchData() {
        try {
            const {ethereum} = window;
            if (!ethereum) {
                return new Error("No crypto wallet found. Please install it.");
            } else {
                const provider = new ethers.providers.Web3Provider(ethereum, "mainnet");
                const signer = provider.getSigner();
                const address = await signer.getAddress();

                // HTTP callback - GET
                axios.get(Keys.API_URL + '/get/' + address).then(function (response) {
                    setData(response.data)
                    console.log(response.data);
                });
            }
        } catch (err) {
            console.log(err.message);
        }
    }

    const sendData = async () => {
        try {
            const {ethereum} = window;
            if (!ethereum) {
                return new Error("No crypto wallet found. Please install it.");
            } else {
                const provider = new ethers.providers.Web3Provider(ethereum, "mainnet");
                const signer = provider.getSigner();

                const signature = await signer.signMessage(data);
                const address = await signer.getAddress();

                let signatureData = {
                    // key: data,
                    key: document.getElementById("jwt_signing_key").value,
                    signature: signature,
                    address: address
                };

                // HTTP callback - POST
                await axios.post(Keys.API_URL + '/send', signatureData).then(async function (response) {
                    console.log(response.data.authorized);
                    if (response.data.authorized === true) {
                        setAuthenticity(true);
                        let statusElement = document.getElementById("status");
                        statusElement.innerHTML = "<span style=\"text-align: center\"><svg height=\"16\" width=\"16\" fill=\"#4caf50\" class=\"MuiSvgIcon-root MuiSvgIcon-fontSizeMedium MuiSvgIcon-root MuiSvgIcon-fontSizeLarge css-zjt8k\" focusable=\"false\" aria-hidden=\"true\" viewBox=\"0 0 24 24\" data-testid=\"VerifiedIcon\" tabindex=\"-1\" title=\"Verified\"><path d=\"m23 12-2.44-2.79.34-3.69-3.61-.82-1.89-3.2L12 2.96 8.6 1.5 6.71 4.69 3.1 5.5l.34 3.7L1 12l2.44 2.79-.34 3.7 3.61.82L8.6 22.5l3.4-1.47 3.4 1.46 1.89-3.19 3.61-.82-.34-3.69L23 12zm-12.91 4.72-3.8-3.81 1.48-1.48 2.32 2.33 5.85-5.87 1.48 1.48-7.33 7.35z\"></path></svg>&nbsp;&nbsp;<span>Authorized</span></span>";

                        let authorizedDiv = document.getElementById("authorized-div").style;
                        authorizedDiv.display = "flex";
                        authorizedDiv.border = "1px dashed #4caf50";
                        authorizedDiv.backgroundColor = "rgb(237, 247, 237)";
                        statusElement.style.color = "#4caf50";
                    } else {
                        setAuthenticity(false);
                        let statusElement = document.getElementById("status");
                        statusElement.innerHTML = "<span style=\"text-align: center\"><svg height=\"16\" width=\"16\" fill=\"#ef5350\" class=\"MuiSvgIcon-root MuiSvgIcon-fontSizeMedium MuiSvgIcon-root MuiSvgIcon-fontSizeLarge css-zjt8k\" focusable=\"false\" aria-hidden=\"true\" viewBox=\"0 0 24 24\" data-testid=\"CancelIcon\" tabindex=\"-1\" title=\"Cancel\"><path d=\"M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z\"></path></svg>&nbsp;&nbsp;<span>Unauthorized</span></span>";
                        document.getElementById("authorized-div").style.display = "flex";

                        let authorizedDiv = document.getElementById("authorized-div").style;
                        authorizedDiv.display = "flex";
                        authorizedDiv.border = "1px dashed #ef5350";
                        authorizedDiv.backgroundColor = "rgb(253, 237, 237)";
                        statusElement.style.color = "#ef5350";
                    }
                }).catch(async error => {
                    console.log(error);
                    setAuthenticity(false);
                    let statusElement = document.getElementById("status");
                    statusElement.innerHTML = "<span style=\"text-align: center\"><svg height=\"16\" width=\"16\" fill=\"#ef5350\" class=\"MuiSvgIcon-root MuiSvgIcon-fontSizeMedium MuiSvgIcon-root MuiSvgIcon-fontSizeLarge css-zjt8k\" focusable=\"false\" aria-hidden=\"true\" viewBox=\"0 0 24 24\" data-testid=\"CancelIcon\" tabindex=\"-1\" title=\"Cancel\"><path d=\"M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z\"></path></svg>&nbsp;&nbsp;<span>Unauthorized</span></span>";
                    document.getElementById("authorized-div").style.display = "flex";

                    let authorizedDiv = document.getElementById("authorized-div").style;
                    authorizedDiv.display = "flex";
                    authorizedDiv.border = "1px dashed #ef5350";
                    authorizedDiv.backgroundColor = "rgb(253, 237, 237)";
                    statusElement.style.color = "#ef5350";
                });
            }
        } catch (err) {
            console.log(err.message);
        }
    };

    const onTokenKeyChange = (e) => {
        setData(e.target.value);
    }

    useEffect(() => {
        fetchData().then(() => {});
        axios.get(Keys.API_URL + '/start').then(function (response) {
            console.log(response.data);
            document.getElementById("server-banner").style.display = "none";
        });
    }, []); // eslint-disable-line no-use-before-define

    useEffect(() => {
        if (data) {
            console.log("exist")
            document.getElementById("metamask-div").style.border = "none";
        } else {
            console.log("init")
        }
    }, [data]);

    useEffect(() => {
        console.log(authenticity)
    }, [authenticity]);

    return (
        <div>
            <Helmet>
                <title>Ethereum Authentication Tokens | eth-auth</title>
            </Helmet>
            <div id={"server-banner"} className={"con-mid"}>
                    <CircularProgress size="1rem" color={"inherit"} style={{marginBottom: "20px"}}/>
                    <p style={{
                        marginBottom: "0",
                        fontFamily: "Segoe UI,SegoeUI,Helvetica Neue,Helvetica,Arial,sans-serif"
                    }}>The backend is loading at Heroku</p>
                    <span style={{
                        color: "#606060",
                        fontSize: "10px",
                        fontFamily: "Segoe UI,SegoeUI,Helvetica Neue,Helvetica,Arial,sans-serif"
                    }}>Ethereum Authentication Tokens | eth-auth</span>
            </div>
            <div className={"hero-lights"}>
                <div className={"hero-light hero-light-1"}></div>
                <div className={"hero-light hero-light-2"}></div>
                <div className={"hero-light hero-light-3"}></div>
                {/*<div className={"hero-light hero-light-4"}></div>*/}
            </div>
            <div className={"main"}>
                <div className={"hero con-mid"}>
                    <div className={"hero-container"}>
                        <div className={"row hero-row"}>
                            <div className={"con-mid-vertical col"}>
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
                                    The way how dApps<br/>authenticate users
                                </h1>

                                <div>
                                    <span className={"npm-i"}>
                                        npm i ethauth-server
                                    </span>
                                    <a href={"https://github.com/project-evilcodes/ethauth-server"} target={"_self"}
                                       className={"github-open-source"}>
                                        <span style={{marginRight: "10px"}}>
                                            <svg
                                                fill={"#fff"}
                                                className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium MuiSvgIcon-root MuiSvgIcon-fontSizeLarge css-zjt8k"
                                                height={16} width={16}
                                                focusable="false" aria-hidden="true" viewBox="0 0 24 24"
                                                data-testid="GitHubIcon" tabIndex="-1" title="GitHub"><path
                                                d="M12 1.27a11 11 0 00-3.48 21.46c.55.09.73-.28.73-.55v-1.84c-3.03.64-3.67-1.46-3.67-1.46-.55-1.29-1.28-1.65-1.28-1.65-.92-.65.1-.65.1-.65 1.1 0 1.73 1.1 1.73 1.1.92 1.65 2.57 1.2 3.21.92a2 2 0 01.64-1.47c-2.47-.27-5.04-1.19-5.04-5.5 0-1.1.46-2.1 1.2-2.84a3.76 3.76 0 010-2.93s.91-.28 3.11 1.1c1.8-.49 3.7-.49 5.5 0 2.1-1.38 3.02-1.1 3.02-1.1a3.76 3.76 0 010 2.93c.83.74 1.2 1.74 1.2 2.94 0 4.21-2.57 5.13-5.04 5.4.45.37.82.92.82 2.02v3.03c0 .27.1.64.73.55A11 11 0 0012 1.27"></path></svg>
                                        </span>
                                        Open-Source
                                    </a>
                                </div>

                                <div className={"twitter-badge"}>
                                    <a className={"link"} href={"https://twitter.com/sathnindu"} target={"_blank"}
                                       rel={"noopener noreferrer"}>
                                    <span><svg
                                        className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium MuiSvgIcon-root MuiSvgIcon-fontSizeLarge css-1shn170"
                                        focusable="false" aria-hidden="true" viewBox="0 0 24 24" height={16} width={16}
                                        data-testid="TwitterIcon" tabIndex="-1" title="Twitter"><path
                                        d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"></path></svg></span> @sathnindu
                                    </a>
                                </div>
                            </div>
                            <div className={"con-mid demo-col col col-lg-2"}>
                                <div className={"con-mid metamask-div"} id={"metamask-div"}>
                                    {/*<span className={"open-source-badge"}>open-source</span>*/}
                                    {/*<span className={"github-badge"}>GitHub</span>*/}
                                    {data ? "" :
                                        <div className={"demo-card-connect"}>
                                            <div style={{width: "100%", height: "100%"}} className={"con-mid"}>
                                                <button className={"metamask-btn"} onClick={connectWallet}>
                                                <span>
                                                    <img className={"metamask-logo"} src={"/img/metamask.svg"}
                                                         alt={"metamask"}/>
                                                </span>
                                                    <span className={"metamask-btn-txt"} style={{marginTop: "3px"}}>
                                                    Connect MetaMask
                                                </span>
                                                </button>
                                            </div>
                                        </div>
                                    }
                                    {!data ? "" :
                                        <div className={"demo-card"}>
                                            <div>
                                                <p style={{color: "#4900a4"}}>JWT-Ethereum Signing Key</p>
                                                <div>

                                                    <div id={"authorized-div"} style={{display: "none"}}
                                                         className={"authorized con-mid"}>
                                                        <p className={"authenticity-status"}
                                                           style={{zIndex: "11", margin: "0"}}
                                                           id={"status"}></p>
                                                    </div>

                                                    <textarea id={"jwt_signing_key"} rows="7" value={data}
                                                              onChange={onTokenKeyChange}></textarea>
                                                </div>

                                                <button style={{display: "inline-block"}}
                                                        className={"hero-auth-check-btn"}
                                                        onClick={sendData}>Validate
                                                </button>
                                            </div>
                                        </div>}
                                </div>
                            </div>
                        </div>

                    </div>

                </div>

                <div className={"blocks con-mid"}>
                    <div className={"container"}>
                        <div className={"row"}>

                            <div className={"col secondary-card"}>
                                <div className={"row"} style={{height: "100%"}}>
                                    <div className={"col con-mid block-icon"}>
                                        <a href={"https://sathnindu-kottage.gitbook.io/eth-auth/"}>
                                        <span>
                                            <img src={"/img/gitbook.svg"} style={{width: "30px", height: "auto"}}
                                                 alt={"gitbook"}/>
                                        </span>
                                        </a>
                                    </div>
                                    <div className={"block-text-div col con-mid-vertical"}>
                                        <a href={"https://sathnindu-kottage.gitbook.io/eth-auth/"} target={"_self"} className={"link"}>
                                            <h5>Documentation</h5>
                                        </a>
                                        <span>
                                            Our GitBook contains all of the eth-auth documentation.
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className={"col secondary-card"}>
                                <div className={"row"} style={{height: "100%"}}>
                                    <div className={"col con-mid block-icon"}>
                                        <a href={"https://github.com/project-evilcodes/ethauth-server"}>
                                        <span>
                                            <img src={"/img/github.svg"} style={{width: "30px", height: "auto"}}
                                                 alt={"github"}/>
                                        </span>
                                        </a>
                                    </div>
                                    <div className={"block-text-div col con-mid-vertical"}>
                                        <a href={"https://github.com/project-evilcodes/ethauth-server"}
                                           className={"link"}>
                                            <h5>GitHub</h5>
                                        </a>
                                        <span>
                                            The source code is available on GitHub. Please create an issue if you run into one.
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className={"col secondary-card"}>
                                <div className={"row"} style={{height: "100%"}}>
                                    <div className={"col con-mid block-icon"}>
                                        <a href={"https://stackoverflow.com/questions/tagged/eth-auth"}>
                                        <span>
                                            <img src={"/img/stackoverflow.svg"} style={{width: "30px", height: "auto"}}
                                                 alt={"stackoverflow"}/>
                                        </span>
                                        </a>
                                    </div>
                                    <div className={"block-text-div col con-mid-vertical"}>
                                        <a href={"https://stackoverflow.com/questions/tagged/eth-auth"}
                                           className={"link"}>
                                            <h5>Stackoverflow</h5>
                                        </a>
                                        <span>
                                            There are Stackoverflow discussions if you need assistance.
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={"row"} id={"overview"}>
                            <div className={"col secondary-card"}>
                                <div className={"row overview-row"} style={{height: "100%"}}>
                                    <div className={"col overview-col con-mid-vertical"}>
                                        <p className={"overview-body overview-text"}>
                                            <span style={{color: "#000", fontSize: "16px"}}>Overview</span>
                                            <br/>
                                            <br/>
                                            eth-auth is a secure package for password-less authenticating users on
                                            node.js
                                            decentralized
                                            applications (dApps) by signing a JWT token with the user's Ethereum private
                                            key.
                                        </p>
                                    </div>
                                    <div className={"block-text-div li-col col col-lg-2 con-mid-vertical"}>
                                        <ul className={"overview-li"}>
                                            <li>Decentralised</li>
                                            <li>Anonymous</li>
                                            <li>Secured</li>
                                        </ul>
                                    </div>
                                    <div className={"block-text-div li-col col col-lg-2 con-mid-vertical"}>
                                        <ul className={"overview-li"}>
                                            <li>Anti-phishing</li>
                                            <li>Breach-less</li>
                                            <li>Password-less</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer/>
            </div>
        </div>
    )
        ;
}