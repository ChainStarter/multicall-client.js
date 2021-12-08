const { expect } = require("chai");
const { ethers } = require("hardhat");

let multicall, MuticallArtifact;

const deployMulticall =async () => {
  const MulticallContract = await ethers.getContractFactory("Multicall");
  const multicall = await MulticallContract.deploy();
  MuticallArtifact = await hre.artifacts.readArtifact("Multicall")
  await multicall.deployed();
  return multicall
}



describe("multicall", function () {

  before(async function() {
    multicall = await deployMulticall()
  });

  it("test call", async function () {
    const address = multicall.address
    const abi = MuticallArtifact.abi

    console.log(address, abi)

  });
});