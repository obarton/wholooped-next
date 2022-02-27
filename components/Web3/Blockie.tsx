import { Skeleton } from "antd";
import { useEffect } from "react";
import Blockies from "react-blockies";
import { useMoralis } from "react-moralis";

/**
 * Shows a blockie image for the provided wallet address
 * @param {*} props
 * @returns <Blockies> JSX Elemenet
 */

function Blockie(props: any) {
  const { account } = useMoralis();
  useEffect(() => {
    console.log(`Blockie account ${JSON.stringify(account)}`)
  }, [account])

  if (!props.address && !account) return <Skeleton.Avatar active size={40} />;

  return (
    <Blockies
      seed={props.currentWallet ? (account as any).toLowerCase() : props.address.toLowerCase()}
      className="identicon"
      {...props}
    />
  );
}

export default Blockie;
