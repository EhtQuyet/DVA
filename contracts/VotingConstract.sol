pragma solidity ^0.8.9;

import "@openzeppelin/constracts/utils/Counters.sol";
import "hardhat/console.sol";

contract Create {
    using Counters for Counters.Counter;

    Counters.Counter public _voterId;
    Counters.Counter public _candidateId;

    address public votingOrganizer;

    //    CANDIDATE DATA
    struct Candidate {
        uint256 candidateId;
        string age;
        string name;
        string image;
        uint256 voteCount;
        address _address;
        string ipfs;
    }

    event CandidateCreated (
        uint256 indexed candidateId,
        string age,
        string name,
        string image,
        uint256 voteCount,
        address _address,
        string ipfs
    );

    address[] public candidateAddress;

    mapping(address => Candidate) public candidates;

    //    VOTER DATA
    address[] public votedVoter;
    address[] public votersAddress;

    mapping(address => Voter) public voters;

    struct Voter {
        uint256 voter_voterId;
        string voter_name;
        string voter_image;
        address voter_address;
        bool voter_voted;
        uint256 voter_vote;
        string voter_ipfs;
    }

    event VoterCreated (
        uint256 indexed voter_voterId,
        string voter_name,
        string voter_image,
        address voter_address,
        bool voter_voted,
        uint256 voter_vote,
        string voter_ipfs
    );

   constructor (){
       votingOrganizer = msg.sender;
   }

    function setCandidate(address _address, string memory _age, )
}
