class App extends Component {
	constructor(props, parent) {
		super(props);
		this.state = this.props;
		this.parent = parent;
		this.children = [];
		
		this.componentWillMount();
		this.render();
	}
	
	renderChildren() {
		const { data } = this.state;
		this.children = data.map((el, i) => new TableItem(Object.assign(el, {index: i, onclick: this.handleClick.bind(this)}), this.component));
	}
	
	handleClick(index, age) {
		const record = this.state.data[index];
		data[index] = Object.assign({}, record, {age: age + 1});
		this.setState({ data });
	}
	
	updateChildren() {
		const { data } = this.state;
		this.children.forEach((child, i) => child.setState(data[i]));
	}
	
	render() {
		if ( this.status === 0 ) {
			console.log('Rendering App component');
			const content = `
				<table>
					<tr>
						<th>Name</th>
						<th>Gender</th>
						<th>Age</th>
					</tr>
				</table>
			`;
		
			const temp = document.createElement('div');
			temp.innerHTML = content;
			this.component = temp.children[0];
			
			this.mountComponent();
			this.renderChildren();
		} else if ( this.status === 1 ) {
			console.log('Updating App component');
			this.updateChildren();
		}
	}
};