import React from "react";

export default function Footer() {
    return (
        <div className={"footer con-mid"}>
            <div className={"container"}>
                <div className={"row"}>
                    <div className={"col footer-section-1 con-left-footer"}>
                        <p>
                            ©{new Date().getFullYear()} eth-auth - a <a className={"link"} href={"https://bysatha.com"}
                                                                        target={"_self"}>Sathnindu
                            Kottage</a> production
                        </p>
                    </div>
                    <div className={"col footer-section-2 con-right-footer"}>
                        <p>
                            <a href={"./privacy"} className={"link"}>Privacy Policy</a>
                            <span>&emsp;•&emsp;</span>
                            <a href={"./terms"} className={"link"}>Terms & Conditions</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}