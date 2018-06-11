import React, { Component } from "react";


//MySuperCoolComponent -> WgInputWithSlider

/*
class MySuperCoolComponent extends Component {
    handleClick = () => {
	console.log("Click!");
    };

    render() {
	const { color, children } = this.props;
	return (
	    <button onClick={this.handleClick} style={{ color }}>
	      {children}
	    </button>
	);
    }
}
*/


var _ = require('lodash');

import Draggable from 'react-draggable';


class MySuperCoolComponent extends React.PureComponent {

    constructor() {
	super();

	this.state = {
	    isSliderDragging: false,
	    isMouseOver: false
	};
	
	this.handleSliderDrag = this.handleSliderDrag.bind(this);
	this.handleInputElemChange = this.handleInputElemChange.bind(this);
	this.handleInputElemBlur = this.handleInputElemBlur.bind(this);
    }

    handleSliderDrag(e, data){
	const width = this.props.width;
	const min = this.props.slideMin;
	const max = this.props.slideMax;

	const R = (data.x+this.HPW) / width;
	const newValue = min + (max - min) * R;

	const vRounded = _.round(newValue, 1);

	this.inputElement.focus();
	this.props.onChange(vRounded);
    }

    handleInputElemChange(event){
	const rawStr = event.target.value;
	this.props.onChange(rawStr);
    }

    handleInputElemBlur(event){
	const rawStr = event.target.value;
	const parsedStr = rawStr[0] === '=' ? rawStr : (isNaN(rawStr) ? 0 : _.round(Number(rawStr), 1));
	// Note that here I call an onChange handler on a blur event. OK?
	this.props.onChange(parsedStr);
    }
    
    render() {
	const inputElementPassthruProps = _.pick(this.props, "className");

	const value = this.props.value;	
	const width = this.props.width;
	const min = this.props.slideMin;
	const max = this.props.slideMax;

	const R = (value - min) / (max - min);
	const R_val = isNaN(R) ? 0 : _.clamp(R, 0, 1); // validated version of R

	const isInvalid = R < 0 || R > 1 || isNaN(R);
	const posn = width * R_val;

	// <input> element has a border width. Include this in scale
	//	const IBW = 1;

	// 'sliderSize' = false : no slider. 'sliderSize' = undefined = use default size
	const sliderSize = this.props.sliderSize || 18;// prop is optional. 
	this.HPW = sliderSize/2; // Half Pointer Width

	const isSliderVisible = this.props.sliderSize !== false && (this.state.isMouseOver || this.state.isSliderDragging);

	const sliderColour = isInvalid ? "red" : (this.props.sliderColour || "rgba(0,0,0,0.5)");
	
	return (
	    <div className="MySuperCoolComponent"
		 onMouseEnter={()=>{this.setState({isMouseOver: true}); }}
		 onMouseLeave={()=>{this.setState({isMouseOver: false});}}
		 >

		<input type="text"
		       ref={ node => { this.inputElement = node; }}
		       value={value.toString()}
		       style={{width}}
		       onChange={this.handleInputElemChange}
		       onBlur={this.handleInputElemBlur}
		  {...inputElementPassthruProps}
		  />

		{isSliderVisible &&
 		    <Draggable
		       bounds={{left: -this.HPW, top: 0, right: width-this.HPW, bottom: 0}}
		       position={{x: posn, y: 0}}
		       onDrag={this.handleSliderDrag}
		       onStart={()=>{this.setState({isSliderDragging: true}); }}
		       onStop={ ()=>{this.setState({isSliderDragging: false});}}
		      >

		      <svg height={sliderSize*0.7} width={sliderSize} viewBox="0 0 10 10">
			<polyline points="0,10 5,0 10,10" fill={sliderColour}/>
		      </svg>
		  
		</Draggable>
		}
	    </div>

	);
    }
    
}


export default MySuperCoolComponent;
