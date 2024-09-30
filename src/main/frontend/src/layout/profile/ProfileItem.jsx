import React from "react";
import theme from "../../styles/theme"
import styled from "@emotion/styled";
import * as P from "./ProfileStyle";

export default function ProfileItem(props) {
    console.log("qewrqr: " + props.id);
    return (
        <P.ProfileCard>
            <P.ProfileHeader>
                {props.profile.id}
            </P.ProfileHeader>
            <P.ProfileImg>
                <img src="../../../public/img/gyulobal1.png"></img>
            </P.ProfileImg>
            <P.ProfileBody>
                <P.UserName>{props.profile.name}</P.UserName>
                <P.UserEmail>kjw101147@gmail.com</P.UserEmail>
                <P.ProfileIcons>
                    <P.Icon>🔑</P.Icon>
                    <P.Icon>💳</P.Icon>
                    <P.Icon>📍</P.Icon>
                </P.ProfileIcons>
            </P.ProfileBody>
        </P.ProfileCard>
    );
}