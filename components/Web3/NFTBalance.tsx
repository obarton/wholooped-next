import { useMoralis, useERC20Balances } from "react-moralis";
import { Skeleton, Table } from "antd";
import { getEllipsisTxt } from "../../helper/formatters"
const styles = {
	title: {
		fontSize: "30px",
		fontWeight: "700",
	},
};
function ERC20Balance(props: any) {
	const { data: assets } = useERC20Balances(props);
	const { Moralis } = useMoralis();

	const columns = [
		{
			title: "",
			dataIndex: "logo",
			key: "logo",
			render: (logo: string | null) => (
				<img
					src={
						logo ||
						"https://etherscan.io/images/main/empty-token.png"
					}
					alt='nologo'
					width='28px'
					height='28px'
				/>
			),
		},
		{
			title: "Name",
			dataIndex: "name",
			key: "name",
			render: (name: string) => name,
		},
		{
			title: "Symbol",
			dataIndex: "symbol",
			key: "symbol",
			render: (symbol: string) => symbol,
		},
		{
			title: "Balance",
			dataIndex: "balance",
			key: "balance",
			render: (value: any, item: any) =>
				parseFloat(
					Moralis.Units.FromWei(value, item.decimals).toFixed(6),
				),
		},
		{
			title: "Address",
			dataIndex: "token_address",
			key: "token_address",
			render: (address: string) => getEllipsisTxt(address, 5),
		},
	];

	return (
		<div style={{ width: "65vw", padding: "15px" }}>
			<h1 style={styles.title}>💰Token Balances</h1>
			<Skeleton loading={!assets}>
				<Table
					dataSource={assets as any}
					columns={columns}
					rowKey={(record) => {
						return record.token_address;
					}}
				/>
			</Skeleton>
		</div>
	);
}
export default ERC20Balance;
