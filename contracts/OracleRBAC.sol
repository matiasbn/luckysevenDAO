pragma solidity >=0.5.0 <0.7.0;

import "@openzeppelin/contracts/access/Roles.sol";

contract OracleRBAC {
    using Roles for Roles.Role;
    Roles.Role private _randomAgent;
    ///@dev Constructor
    constructor(address _newAgent) public {
        _randomAgent.add(msg.sender);
        _randomAgent.add(_newAgent);
    }

    ///@dev Modifiers
    modifier onlyRandomAgent() {
        require(_randomAgent.has(msg.sender));
        _;
    }

    ///@dev Events
    event LogNumberAsked(address indexed owner);
    event LogNumberDelivered(
        address indexed owner,
        address indexed generator,
        uint256 value
    );

    ///@dev RBAC functions
    function addRandomAgent(address _newRandomAgent)
        public
        onlyRandomAgent
        returns (bool)
    {
        _randomAgent.add(_newRandomAgent);
        return true;
    }

    ///@dev Random number functions
    function askForNumber() public returns (bool) {
        emit LogNumberAsked(msg.sender);
        return true;
    }

    function deliverNumber(address _owner, uint256 _value)
        public
        onlyRandomAgent
        returns (bool)
    {
        emit LogNumberDelivered(_owner, msg.sender, _value);
        return true;
    }
}
