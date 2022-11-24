import React, {useState, useEffect, useContext} from "react";
import Image from "next/image";
import Countdown from "react-countdown";

//internal import
import {VotingContext} from "../context/Voter"
// import Style from '../styles/index.css'
import Card from '../components/Card/Card'
import image from '../assets/images/cadidate-1.png'


const index = () => {
    const {votingTitle} = useContext(VotingContext)
    return <div>{votingTitle}</div>
}

export default index