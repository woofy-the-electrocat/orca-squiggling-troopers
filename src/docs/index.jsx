import React from "react";
import { render } from "react-dom";
import MyComponent from "../../lib";
import "./styles.css";

function Demo() {
  return (
    <div>
      <h1>Demo with examples of the component</h1>

	    <MyComponent
	       className={"formulaX errorX"}
	       value={30}
	       onChange={ ()=>{} /*value => {
		   props.modifyElem(PROP.key, value);
	      }*/}
	      width={136}
	      sliderSize={15}
	      sliderColour={"rgba(16, 102, 239, 0.52)"}
	      slideMin={-200}
	      slideMax={200}
	      />

    </div>
  );
}

render(<Demo />, document.getElementById("app"));
