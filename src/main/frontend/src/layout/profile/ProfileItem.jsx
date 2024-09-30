import React from "react";
import theme from "../../styles/theme"
import styled from "@emotion/styled";
import * as P from "./ProfileStyle";
import { HomeOutlined, UserOutlined } from "@ant-design/icons";

export default function ProfileItem(props) {
    console.log("qewrqr: " + props.id);
    return (
        <P.ProfileCard>
            <P.ProfileHeader>
                {props.profile.id}
            </P.ProfileHeader>
            <P.ProfileImg>
                <P.ProfileText>{props.profile.url}</P.ProfileText>
            </P.ProfileImg>
            <P.ProfileBody>
                <P.UserName>{props.profile.name}</P.UserName>
                <P.UserEmail>kjw101147@gmail.com</P.UserEmail>
                <P.ProfileIcons>
                    <P.Icon><HomeOutlined/></P.Icon>
                    <P.Icon><UserOutlined/></P.Icon>
                </P.ProfileIcons>
            </P.ProfileBody>
        </P.ProfileCard>
    );
}