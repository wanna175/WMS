import React from "react";
import theme from "../styles/theme"
import styled from "@emotion/styled";

export default function ProfileItem(props) {
    console.log("qewrqr: " + props.id);
    return (
        <>
            <div>{props.id}</div>
            <div>{props.url}</div>
            <div>{props.name}</div>
            <div></div>
            <div></div>
        </>
    )
}