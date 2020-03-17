pragma solidity ^0.6.0;

contract OraclePOC {
    event LogNumberAsked(address indexed owner);
    event LogNumberDelivered(
        address indexed owner,
        address indexed generator,
        uint256 value
    );

    function askForNumber() public returns (bool) {
        emit LogNumberAsked(msg.sender);
        return true;
    }

    function deliverNumber(address _owner, uint256 _value)
        public
        returns (bool)
    {
        emit LogNumberDelivered(_owner, msg.sender, _value);
        return true;
    }
}
