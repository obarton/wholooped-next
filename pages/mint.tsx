import React, { useState, useEffect } from 'react'
import { useRouter } from "next/router";
import { useFormik } from 'formik';
import { Form, FormControl, Button, Stack, Container } from 'react-bootstrap';
import { useMoralis } from 'react-moralis';
import Web3Layout from "../components/Web3/Web3Layout";
import { contractAbi } from '../helper/abi';
import { CONTRACT_ADDRESS } from '../helper/nft';
const Web3EthContract = require('web3-eth-contract');
const web3 = require('web3')

// Set provider for all later instances to use
Web3EthContract.setProvider(web3.currentProvider) //('ws://localhost:8546');

const Mint = () => {
    const { account } = useMoralis();
    const { query } = useRouter();
    const nftId = query.nftId as string;
    console.log(`query ${JSON.stringify(query, null, 2)}`);

    const [tokenId, setTokenId] = useState(nftId)
    const [amount, setAmount] = useState()
    const [address, setAddress] = useState(account)

    useEffect(() => {
        setTokenId(nftId)

    }, [])

    useEffect(() => {
        console.log(`account ${JSON.stringify(account, null, 2)}`)
        if(account) {
            setAddress(account)
        }

    }, [account])
    

    const onTokenInput = ({ target: { value }}: any)  => {
        setTokenId(value)
    }

    const onAmountInput = ({ target: { value }}: any)  => {
        setAmount(value)
    }

    const onAddressInput = ({ target: { value }}: any)  => {
        setAddress(value)
    }
    
    const formik = useFormik({
        initialValues: {
            tokenId: nftId,
            amount: '',
            address: ''
        },
        onSubmit: (values: any) => {
            const contract = new Web3EthContract(contractAbi, CONTRACT_ADDRESS);
            console.log(`address ${JSON.stringify(address)}`);
            console.log(`tokenId ${JSON.stringify(tokenId)}`);
            console.log(`amount ${JSON.stringify(amount)}`);
            console.log(`account ${JSON.stringify(account)}`);

            contract.methods.mint(address, tokenId, amount).send({from: account, value: 0}).on("receipt", (receipt: any) => {
                alert("Mint done")
                console.log(receipt)
            })
        },
      });

  return (
    <Web3Layout>
    <div>
        <Container>
        <div style={{ display: "flex", justifyContent: "center"}}>
        <Form className="d-flex" onSubmit={formik.handleSubmit}>
            <Stack gap={2}>
             <Form.Group style={{width: "100%"}}>
                <Form.Label>
                <b>Token ID</b>
                </Form.Label>
                <FormControl
                    id="token_id_input"
                    name="tokenIdInput"
                    type="number"
                    placeholder="Token Id"
                    className="me-2"
                    aria-label="tokenId"
                    value={tokenId}
                    onChange={onTokenInput}
                />
            </Form.Group>
            <Form.Group style={{width: "100%"}}>
                <Form.Label>
                <b>Amount</b>
                </Form.Label>
                <FormControl
                    id="amount"
                    name="amountInput"
                    type="number"
                    placeholder="Amount"
                    className="me-2"
                    aria-label="amountId"
                    value={amount}
                    onChange={onAmountInput}
                />
            </Form.Group>
            <Form.Group style={{width: "100%"}}>
                <Form.Label>
                <b>Address</b>
                </Form.Label>
                <FormControl
                    id="address"
                    name="addressInput"
                    type="string"
                    placeholder="Address"
                    className="me-2"
                    aria-label="addressId"
                    value={address as string}
                    onChange={onAddressInput}
                />
            </Form.Group>
            <Button type="submit">Mint</Button>
            </Stack>
            {/* <Button variant="success" type="submit">Search</Button> */}
        </Form>
        </div>
        </Container>
    </div>
    </Web3Layout>
  )
}

export default Mint