import React from "react";
import {Alert} from "@mui/material";
import {Link} from "react-router-dom";

export default function Notice() {
    return (
        <div className={"notice con-right"}>
            <a href="https://gitcoin.co/grants/7450/eth-auth-ethereum-user-authentication-tokens-for-" target={"_self"}>
                <Alert severity="info">
                    Support us at GitCoin GR15!
                </Alert>
            </a>
        </div>
    );
}