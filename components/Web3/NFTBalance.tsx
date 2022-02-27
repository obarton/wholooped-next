import React, { useState } from "react";
import { useMoralis, useNFTBalances } from "react-moralis";
import { Card, Tooltip, Modal, Input, Skeleton, Descriptions } from "antd";
import { Button, Image, Stack, Row, Col, Container } from "react-bootstrap"
import {
	FileSearchOutlined,
	ShoppingCartOutlined,
} from "@ant-design/icons";
import { getExplorer } from "../../helper/networks"
import AddressInput from "./AddressInput";
import AudioPlayer from "react-h5-audio-player"
import 'react-h5-audio-player/lib/styles.css';
import { getEllipsisTxt } from "../../helper/formatters";
import { CONTRACT_ADDRESS } from '../../helper/nft';
import { useRouter } from "next/router";
import TokenPrice from "./TokenPrice";
import NativeBalance from "./NativeBalance";
import Account from "./Account";
const { Meta } = Card;

const styles = {
	NFTs: {
		display: "flex",
		flexWrap: "wrap",
		WebkitBoxPack: "start",
		justifyContent: "flex-start",
		margin: "0 auto",
		maxWidth: "1000px",
		width: "100%",
		gap: "10px",
	},
    headerRight: {
		display: "flex",
		gap: "20px",
		alignItems: "center",
		fontSize: "15px",
		fontWeight: "600",
	},
};

function NFTBalance() {
	const { data: NFTBalances } = useNFTBalances();
    const router = useRouter();
	const { Moralis, chainId } = useMoralis();
	const [visible, setVisibility] = useState(false);
	const [receiverToSend, setReceiver] = useState(null);
	const [amountToSend, setAmount] = useState(null);
	const [nftToSend, setNftToSend] = useState(null);
	const [isPending, setIsPending] = useState(false);

	async function transfer(nft: any, amount: any, receiver: any) {
		const options = {
			type: nft.contract_type,
			tokenId: nft.token_id,
			receiver: receiver,
			contractAddress: nft.token_address,
		};

		if (options.type === "erc1155") {
			(options as any).amount = amount;
		}

		setIsPending(true);
		await Moralis.transfer(options)
			.then((tx) => {
				console.log(tx);
				setIsPending(false);
			})
			.catch((e) => {
				alert(e.message);
				setIsPending(false);
			});
	}

	const handleTransferClick = (nft: any) => {
		setNftToSend(nft);
		setVisibility(true);
	};

	const handleChange = (e: any) => {
		setAmount(e.target.value);
	};

    React.useEffect(() => {
        console.log("NFTBalances", NFTBalances);
        console.log(`CONTRACT_ADDRESS ${CONTRACT_ADDRESS}`)
    }, [NFTBalances])

    React.useEffect(() => {
        console.log("chainId", chainId);
    
    }, [chainId])
    
	return (
		<>
			<div style={{width: "100%"}}>
                <Container>
                <Row style={{padding: "2rem"}}>
                    <Col>
                    <div>
                        <h2>Collectible NFTs</h2>
                    </div>
                    </Col>
                    <Col>
                    <div style={{display: "flex", justifyContent: "right"}}>
                        <div style={styles.headerRight}>
                            <Stack direction="horizontal" gap={2}>
                            { NFTBalances && <TokenPrice
                                address='0x1f9840a85d5af5bf1d1762f925bdaddc4201f984'
                                chain='eth'
                                image='https://cloudflare-ipfs.com/ipfs/QmXttGpZrECX5qCyXbBQiqgQNytVGeZW5Anewvh2jc4psg/'
                                size='40px'
                            />}
                            { NFTBalances &&  <NativeBalance /> }
                            <Account />
                        </Stack>
                        </div>
                    </div>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <div style={{textAlign: "center", marginBottom: "2rem"}}>
                            <Button onClick={()=> router.push(`/createnft`)}>Create New NFT</Button> 
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col>
				<Skeleton loading={!NFTBalances?.result}>
                    <Container style={{paddingLeft: "5%", paddingRight: "5%"}}>
                    {NFTBalances?.result && (
                        NFTBalances.result.sort((a, b) => (a.token_id > b.token_id) ? 1 : -1).filter(nft => nft.token_address.toLowerCase() === CONTRACT_ADDRESS.toLowerCase()).length == 0 ? (
                            <p>No NFTs Found!</p>
                        ):(<></>)
                        
                        )}

					{NFTBalances?.result ? (
						NFTBalances.result.sort((a, b) => (a.token_id > b.token_id) ? 1 : -1).filter(nft => nft.token_address.toLowerCase() === CONTRACT_ADDRESS.toLowerCase()).map((nft, index) => {
                            return (
                            <Row key={index} style={{marginBottom: "2rem", padding: "2em", borderRadius: "14px", backgroundColor: "white"}}> 
                                <Col key={index} lg={4}>
                                <Card
                                    hoverable
                                    key={index}
                                    actions={[
                                        <Tooltip
                                            title='View On Blockexplorer'
                                            key={index}>
                                            <FileSearchOutlined
                                                onClick={() =>
                                                    window.open(
                                                        `${getExplorer(
                                                            chainId,
                                                        )}address/${
                                                            nft.token_address
                                                        }`,
                                                        "_blank",
                                                    )
                                                }
                                            />
                                        </Tooltip>,
                                        // <Tooltip title='Transfer NFT' key={index}>
                                        //     <SendOutlined
                                        //         onClick={() =>
                                        //             handleTransferClick(nft)
                                        //         }
                                        //     />
                                        // </Tooltip>,
                                        <Tooltip
                                            title='Sell On OpenSea'
                                            key={index}>
                                            <ShoppingCartOutlined
                                                key={index}
                                                onClick={() =>
                                                    alert(
                                                        "OPENSEA INTEGRATION COMING!",
                                                    )
                                                }
                                            />
                                        </Tooltip>,
                                    ]}
                                    style={{
                                        width: 300,
                                        border: "2px solid #e7eaf3",
                                    }}
                                    cover={
                                        <Image
                                            src={(nft as any)?.image || ""}
                                            alt=''
                                            height={300}
                                            width={300}
                                            key={index}
                                        />
                                    }>
                                    <Meta
                                        title={(nft.name || nft.metadata?.name) || "N/A"}
                                        description={`Address: ${getEllipsisTxt(nft.token_address)}`}
                                    />
                                    { nft.metadata?.animation_url &&  <AudioPlayer style={{width: "100%", marginTop: "2em"}} src={nft.metadata?.animation_url} customAdditionalControls={[]} /> }
                                </Card>
                                </Col>
                                <Col lg={8}>
                                    <div>
                                        <Descriptions
                                        // title="NFT Details"
                                        bordered
                                        column={{ xxl: 1, xl: 1, lg: 1, md: 1, sm: 1, xs: 1 }}
                                        >
                                        <Descriptions.Item label="Address">{nft.token_address}</Descriptions.Item>
                                        <Descriptions.Item label="Owner">{nft.owner_of}</Descriptions.Item>
                                        <Descriptions.Item label="ID">{nft.token_id}</Descriptions.Item>
                                        <Descriptions.Item label="Name">{nft.metadata?.name}</Descriptions.Item>
                                        <Descriptions.Item label="Description">{nft.metadata?.description}</Descriptions.Item>
                                        {/* <Descriptions.Item label="Amount">{nft.amount}</Descriptions.Item> */}
                                        </Descriptions>
                                    </div>
                                    {/* <div style={{textAlign: "center", marginTop: "2rem"}}>
                                    <Button onClick={() => router.push(`/mint?nftId=${nft.token_id}`)}>Mint</Button>
                                    </div> */}
                                </Col>
                            </Row>
                            )
                        }
                        )
					) : (
						<>NO NFTs found!</>
					)}
                    </Container>
				</Skeleton>
                </Col>
                </Row>
                </Container>
			</div>
			<Modal
				title={`Transfer ${(nftToSend as any)?.name || "NFT"}`}
				visible={visible}
				onCancel={() => setVisibility(false)}
				onOk={() => transfer(nftToSend, amountToSend, receiverToSend)}
				confirmLoading={isPending}
				okText='Send'>
				<AddressInput
					autoFocus
					placeholder='Receiver'
					onChange={setReceiver}
				/>
				{nftToSend && (nftToSend as any).contract_type === "erc1155" && (
					<Input
						placeholder='amount to send'
						onChange={(e) => handleChange(e)}
					/>
				)}
			</Modal>
		</>
	);
}

export default NFTBalance;
