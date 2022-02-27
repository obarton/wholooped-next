import NFTBalance from "../components/Web3/NFTBalance"
import React from "react";
import Web3Layout from "../components/Web3/Web3Layout";
import Layout from "../components/Layout";

function nftBalance() {
	return (
        <Layout>
            <Web3Layout>
                <NFTBalance />
            </Web3Layout>
        </Layout>
    )
}

export default nftBalance;
