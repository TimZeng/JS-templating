// Button component constructor
function Button({ text, className, parent, func }) {
	// save props to be rendered
	this.text = text;
	this.className = className;
	
	// get the template of button component
	this.template = document.getElementById('btn').innerHTML;
	
	// render method
	this.render = () => {
		// get the content of the component by replacing template with props
		const content = this.template.replace(/\{#(\w+)#\}/g, (match, propName) => this[propName]);
		
		// transform content from string to dom node
		// there might be a better way to do this
		const newElement = document.createElement('div');
		newElement.innerHTML = content;
		this.component = newElement.children[0];
		
		// bind actions after creating the component
		this.component.onclick = func;
		
		// insert component into parent component
		parent.appendChild(this.component);
	};
	
	// invoke render function			
	this.render();
};

// ListItem component constructor
function ListItem({ text, parent, func, checked }) {
	// save props to be rendered
	this.text = text;
	
	// get the template of ListItem component
	this.template = document.getElementById('list-item').innerHTML;
	
	// render method
	this.render = () => {
		// get the content of the component by replacing template with props
		const content = this.template.replace(/\{#(\w+)#\}/g, (match, propName) => this[propName]);
		
		// transform content from string to dom node
		// there might be a better way to do this
		const newElement = document.createElement('div');
		newElement.innerHTML = content;
		this.component = newElement.children[0];
		
		// define className to dynamically assign css style
		this.component.className = checked ? 'checked' : '';
		
		// bind actions after creating the component
		this.component.onclick = () => func(text);
		
		// insert component into parent component
		parent.appendChild(this.component);
	};
	
	// invoke render function
	this.render();
};

// constructor for List component
// this is a container with child nodes		
function List({ data, onItemClick, checked, parent }) {
	// this is only a ul component, so no template required
	this.component = document.createElement('ul');
	
	// render method
	this.render = () => {
		// render all li in ul
		this.renderChild();
		
		// insert component into parent component
		parent.appendChild(this.component);
	};
	
	// render list items
	this.renderChild = () => {
		data.forEach(text => 
			new ListItem({ 
				text, 
				parent: this.component, 
				func: onItemClick,
				checked: checked.indexOf(text) >= 0
			})
		);
	};

	// invoke render method
	this.render();
};

// Display constructor
function Display({ data, parent }) {
	// capture data and template for this component
	this.data = data;
	this.template = document.getElementById('display').innerHTML;
	
	// render method, same as other static components
	this.render = () => {
		const content = this.template.replace(/\{#(\w+)#\}/g, (match, propName) => this[propName].join(', '));
					
		const newElement = document.createElement('div');
		newElement.innerHTML = content;
		this.component = newElement.children[0];
					
		parent.appendChild(this.component);
	};
				
	this.render();
};

// this is the App component
// it has component level states
// it manages the child components to render dynamically based data
function App(data, parent) {
	// create the root div component
	this.component = document.createElement('div');
	
	// simple tracking of component lifecycle status
	this.rendered = false;
	
	// set initial value of component level state
	this.state = {
		checked: [],
		data: data
	};
	
	// define component method to update component state
	this.setState = newState => {
		// update component state
		this.state = {...this.state, ...newState};
		// invoke render method to reflect changes
		this.render();
	};
	
	// define click event handler
	// NOTE: the arrow function is binding "this" keyword
	//       when passing down and invoke in child level component
	//		 "this" keyword is still bound to App component
	this.onItemClick = (text) => {
		// get "checked" from component state
		const { checked } = this.state;
		
		// check if the current item is already checked
		const index = checked.indexOf(text);
		
		// if exist, remove it, if no, add it
		index >= 0 ? checked.splice(index, 1) : checked.push(text);
		
		// update component state
		this.setState({ checked });
	}
	
	// define component method to select all
	this.selectAll = () => this.setState({ checked: this.state.data.slice() });
	
	// define component method to reverse select
	this.selectReverse = () => {
		// get current checked state
		const { checked } = this.state;
		
		// new selection should be any item in the data but not in the checked state
		const newSelect = this.state.data.filter(ele => checked.indexOf(ele) === -1);
		
		// update component state
		this.setState({ checked: newSelect });
	};
	
	// define child components rendering
	this.renderDisplay = () => new Display({ data: this.state.checked, parent: this.component });
	
	this.renderList = () => new List({ 
		data, 
		onItemClick: this.onItemClick, 
		checked: this.state.checked, 
		parent: this.component 
	});
	
	this.renderButtons = () => {
		const { checked, data } = this.state;
		const allParams = {
			text: 'Select All',
			className: `all ${checked.length === data.length?'checked':''}`,
			parent: this.component,
			func: this.selectAll
		};
			
		const reverseParams = {
			text: 'Reverse',
			className: 'reverse',				
			parent: this.component,
			func: this.selectReverse
		};
		
		new Button(allParams);
		new Button(reverseParams);
	};
	
	// render method for App component
	this.render = () => {
		// re-render the entire App component when component level state change
		// TO-DO: only update corresponding child component 
		//        instead of re-writing entire App component
		//        to improve performance
		this.component.innerHTML = '';
		
		// invoke rendering of child component
		this.renderDisplay();
		this.renderList();
		this.renderButtons();
		
		// insert App component to the DOM for the first render
		if ( !this.rendered ) {
			parent.appendChild(this.component);
			this.rendered = true;
		}
	}
	
	// invoke render method
	this.render();
};
