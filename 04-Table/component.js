class Component {
	constructor(props, parent) {
		this.status = 0;
// 		console.log('calling constructor function');
		this.props = props;
	}
	
	componentWillMount() {
// 		console.log('executing componentWillMount');
	}
	
	mountComponent() {
// 		console.log('mounting component');
		this.parent.appendChild(this.component);
		this.componentDidMount();
	}
	
	componentDidMount() {
// 		console.log('executing componentDidMount');
		this.status = 1;
	}
	
	componentWillReceiveProps() {}
	
	componentDidReceiveProps() {}
	
	componentShouldUpdate(prevState, nextState) {
// 		console.log('checking if component should update');
		return prevState !== nextState;
	}
	
	setState(nextState) {
		const prevState = this.state;
		if ( this.componentShouldUpdate(prevState, nextState) ) {
			this.state = nextState;
			this.render();
		}
	}
}