import React from "react";

export default function RollDice(props) {
    return (
        <button className="roll-dice-btn btn btn-primary" onClick={props.handleClick}>{props.btnText || "Roll"}</button>
    )
}