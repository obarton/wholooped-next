import React, { useEffect } from "react";
import { useNativeBalance } from "react-moralis";

function NativeBalance(props: any) {
  const { data: balance } = useNativeBalance(props);

  useEffect(() => {
    console.log(`NativeBalance balance ${JSON.stringify(balance, null, 2)}`)
  }, [balance])
  

  return <div style={{ textAlign: "center", whiteSpace: "nowrap" }}>{balance.formatted}</div>;
}

export default NativeBalance;
