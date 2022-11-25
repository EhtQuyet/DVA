import React, {useState} from "react";
import {ethers} from "ethers"
import {create as ipfsClient} from "ipfs-http-client"
import {useRouter} from "next/router";
import {VotingAddress, VotingAddressABI} from "./constant";
import Web3Modal from 'web3modal'

const projectId = '2HzfyoPQLfulrFGCGLmhAPDWRKj';   // <---------- your Infura Project ID
const projectSecret = 'f39e71db6af5274cc7d6d147307c0a6f';  // <---------- your Infura Secret

const auth = 'Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64');

const client = ipfsClient({
  host: 'ipfs.infura.io',
  port: 5001,
  protocol: 'https',
  headers: {
    authorization: auth,
  },
});


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
      return `https://infura-ipfs.io/ipfs/${added.path}`
    } catch (e) {
      console.log(e)
      setError('Error Uploading file to IPFS');
    }
  }

  // create voter
  async function createVoter(formInput, fileUrl, router) {
    try {
      const {name, address, position} = formInput;
      console.log(name, address, position, fileUrl)
      if (!name || !address || !position) {
        console.log('Create fail')
        return setError('aaaa')
      }
      // connecting smartcontract
      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();
      const contract = fetchContract(signer);
      console.log(contract);
      const data = JSON.stringify({name, address, position, image: fileUrl});
      const added = await client.add(data);
      const resultUrl = `https://infura-ipfs.io/ipfs/${added.path}`
      const voter = await contract.voterRight(address, name, resultUrl, fileUrl);
      voter.wait();
      console.log('voter', voter)
      // router.push("/voterList")
    } catch (e) {
      console.log(e)
      setError('Error in creating Voter');
    }
  }

  return (
      <VotingContext.Provider
          value={{
            votingTitle,
            checkIfWalletIsConnected,
            uploadToIPFS,
            connectWallet,
            createVoter
          }}>
        {children}
      </VotingContext.Provider>
  )
}
