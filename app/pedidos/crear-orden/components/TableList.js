import {
	Table,
	TableBody,
	TableCell,
	TableColumn,
	TableHeader,
	TableRow,
	getKeyValue,
} from "@nextui-org/react";

export default function TableList({ columns, productsToOrder }) {
	
	return (
		<Table isHeaderSticky aria-label="List of products" classNames={{base: 'overflow-visible'}}>
			<TableHeader columns={columns}>
				{(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
			</TableHeader>
			<TableBody items={productsToOrder}>
				{(item) => (
					<TableRow key={item.key}>
						{(columnKey) => (
							<TableCell>{getKeyValue(item, columnKey)}</TableCell>
						)}
					</TableRow>
				)}
			</TableBody>
		</Table>
	);
}
