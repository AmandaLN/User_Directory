import React from "react";

// wrapper is calling all children
function Wrapper ({ children }){
    return (
        <div className="wrapper">
            { children }
        </div>
    );
}
export default Wrapper;