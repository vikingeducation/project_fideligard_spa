const React = require('react');
const { Table, Column, Cell } = require('fixed-data-table');

class MyTable extends React.Component {
	render() {
		return (
			<Table rowsCount={100} rowHeight={50} width={1000} height={500}>
				<Column cell={<Cell>Basic content</Cell>} width={200} />
			</Table>
		);
	}
}
