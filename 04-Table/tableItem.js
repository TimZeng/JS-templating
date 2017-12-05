class TableItem extends Component {
	constructor(props, parent) {
		super(props);
		this.state = this.props;
		this.parent = parent;
		
		this.componentWillMount();
		this.render();
	}
	
	render() {
		const { name, gender, age, index, onclick } = this.state;
		
		if ( this.status === 0 ) {
			
			console.log('Rendering table items', name);
			
			const content = `<tr>
								<td>${name}</td>
								<td>${gender}</td>
								<td>${age}</td>
							</tr>`;
							
			const temp = document.createElement('table');
			temp.innerHTML = content;
			this.component = temp.children[0];
			this.component.onclick = function(){ onclick(index, age) };
			this.mountComponent();
		} else if ( this.status === 1 ) {
			console.log('Updating table item', name);
			
			this.component.innerHTML = `
								<td>${name}</td>
								<td>${gender}</td>
								<td>${age}</td>
							`
			this.component.onclick = function(){ onclick(index, age) };
		}
	}
}