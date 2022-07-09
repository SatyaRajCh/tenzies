import React from "react";

export default function Die(props) {
    const styles = {
        backgroundColor: props.isHeld ? "#59E391" : "white"
    }
    return (
        <div className="die-block" style={styles} onClick={props.handleClick}>
            <h3>{props.value}</h3>
        </div>
    )
}