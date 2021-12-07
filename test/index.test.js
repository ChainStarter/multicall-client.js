const { expect } = require("chai");
const { ethers } = require("hardhat");

const deployMulticall =async () => {
  const Multicall = await ethers.getContractFactory("Multicall");
  const multicall = await Multicall.deploy();
  await multicall.deployed();
  return multicall
}

describe("multicall", function () {
  let muticallContract;
  before(async function() {
    muticallContract = await deployMulticall()
  });

  it("call", async function () {
    console.log(muticallContract)
  });
});