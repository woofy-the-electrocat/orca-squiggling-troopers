import React from "react";
import { render } from "react-dom";
import MyComponent from "../../lib";
import "./styles.css";


class Demo extends React.Component {

    constructor() {
	super();

	this.state = {
	    myValue: 30
	};
    }
    
    render() {
	return (
	    <div>
	      <h1>Demo with examples of the component</h1>

	      <MyComponent
		 className={"formulaX errorX"}
		 value={this.state.myValue}
		 onChange={ value => {
		     this.setState({myValue: value});
		}}
		width={136}
		sliderSize={15}
		sliderColour={"rgba(16, 102, 239, 0.52)"}
		slideMin={-200}
		slideMax={200}
		/>

	    </div>
	);
    }
}


render(<Demo />, document.getElementById("app"));
