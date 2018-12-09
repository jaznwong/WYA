import React from 'react'
import ReactLoading from 'react-loading';

const LoadingPage = () =>{
    let fullScreen = {
        // "backgroundColor": "#e8e8e8";
        "width": "100%",
        "height": "auto",
        "bottom": "0px",
        "top": "50px",
        "left": "0",
        "position": "absolute"
    }
    let centerElm = {
        "position": "absolute",
        "width": "100px",
        "height": "50px",
        "top": "50%",
        "left": "50%",
        "marginLeft": "-50px",
        "marginTop": "-25px"
    }
    return (
        <div style={fullScreen}>
            <div style={centerElm}>
                <ReactLoading type={"bars"} color={"grey"} height={'100%'} width={'100%'} />
            </div>
        </div>
    )
}

export default LoadingPage