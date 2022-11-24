import React, {useState} from "react";
import {ethers} from "ethers"
import {create as ipfsHttpClient} from "ipfs-http-client"
import {useRouter} from "next/router";
import {VotingAddress, VotingAddressABI} from "./constant";

const client = ipfsHttpClient('https://ipfs.infura.io:5001/api/v0');
const fetchContract = (signerOrProvider) => new ethers.Contract(VotingAddress, VotingAddressABI, signerOrProvider)

export const VotingContext = React.createContext();

export const VotingProvider = ({children}) => {
    const votingTitle = 'DVA smart contract app'
    const router = useRouter();
    const [currentAccount, setCurrentAccount] = useState('');
    const [candidateLength, setCandidateLength] = useState('');
    const pushCandidate = [];
    const candidateIndex = [];
    const [candidateArray, setCandidateArray] = useState(pushCandidate);

    const [error, setError] = useState('');
    const higestVote = [];

    //-------voter section
    const pushVoter = [];
    const [voterArray, setVoterArray] = useState(pushVoter);
    const [voterLength, setVoterLength] = useState('');
    const [voterAddress, setVoterAddress] = useState([]);

    //-------conneccting metamask
    async function checkIfWalletIsConnected() {
        if (!window.ethereum) return setError("Please install metamask");

        const account = await window.ethereum.request({
            method: 'eth_accounts'
        })

        if (account.length) {
            setCurrentAccount(account[0]);
        } else {
            setError("Please Install MetaMask & Connect, Reload");
        }
    }

    //-------Connect wallet
    async function connectWallet() {
        if (!window.ethereum) return setError("Please install metamask");

        const account = await window.ethereum.request({
            method: 'eth_requestAccount'
        })

        setCurrentAccount(account[0]);
    }

    async function uploadToIPFS(file) {
        try {
            const added = await client.add({content: file});
            return `https://ipfs.infura.io/ipfs/${added.path}`
        } catch (e) {
            setError('Error Uploading file to IPFS');
        }
    }

    return (
        <VotingContext.Provider value={{votingTitle}}>
            {children}
        </VotingContext.Provider>
    )
}
