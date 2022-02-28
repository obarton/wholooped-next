import NFTBalance from "../components/Web3/NFTBalance"
import React from "react";
import Web3Layout from "../components/Web3/Web3Layout";
import Layout from "../components/Layout";
import { Tabs } from 'antd';
import { StockOutlined, PlusOutlined } from '@ant-design/icons';
import SidebarWrapper from '../components/SidebarWrapper';
import CreateNFT from "../components/Web3/CreateNFT"

const { TabPane } = Tabs;


function nftBalance() {
	return (
        <Layout>
            <SidebarWrapper>
                <Tabs defaultActiveKey="1">
                    <TabPane
                    tab={
                        <span>
                        <StockOutlined />
                        My Loop NFTs
                        </span>
                    }
                    key="1"
                    >
                    <Web3Layout>
                        <NFTBalance />
                    </Web3Layout>
                    </TabPane>
                    <TabPane
                    tab={
                        <span>
                        <PlusOutlined />
                        Create New Loop NFT
                        </span>
                    }
                    key="2"
                    >
                        <CreateNFT />
                    </TabPane>
                </Tabs>
            </SidebarWrapper>
        </Layout>
    )
}

export default nftBalance;
