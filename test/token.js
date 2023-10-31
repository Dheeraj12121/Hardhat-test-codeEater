const { expect } = require("chai");
const { ethers } = require("hardhat");

// describe("Token contract", function () {
//     it("Desployment should assign the total supply of tokens to the owner",async function(){
//         const [owner] = await ethers.getSigners();
//         console.log('Signer object:',owner);

//         const Token = await ethers.getContractFactory('Token');  //instance contract

//         const hardhatToken = await Token.deploy(); //deploy contract

//         const ownerBalance = await hardhatToken.balanceof(owner.address);  //owerBalance = 10000
//         console.log('Owner Address:',owner.address);

//         expect(await hardhatToken.totalSupply()).to.equal(ownerBalance); // total Supply = 1000
//     })

//     it('Should transfer tokens between accounts',async function(){
//         const [owner,addr1,addr2] = await ethers.getSigners();

//         const Token = await ethers.getContractFactory('Token'); //instance contract

//         const hardhatToken = await Token.deploy(); //deploy contract

//         // Transfer 10 tokens from owner to addr1

//         await hardhatToken.transfer(addr1.address,10);
//         expect(await hardhatToken.balanceof(addr1.address)).to.equal(10);

//         // Transfer 5 tokens from addr1 to addr2
//         await hardhatToken.connect(addr1).transfer(addr2.address, 5);
//         expect(await hardhatToken.balanceof(addr2.address)).to.equal(5);
//     })
// });

// How professional do the work

describe("Token Contract", function () {
  let Token;
  let hardhatToken;
  let owner;
  let addr1;
  let addr2;
  let addr3;

  beforeEach(async function () {
    Token = await ethers.getContractFactory("Token");
    [owner, addr1, addr2, ...addrs] = await ethers.getSigners();
    hardhatToken = await Token.deploy();
  });

  describe("Deployment", function () {
    it("should set the right owner", async function () {
      expect(await hardhatToken.owner()).to.equal(owner.address);
    });
    it("should assign he total supply of tokens to the owner", async function () {
      const ownerBalance = await hardhatToken.balanceof(owner, address);
      expect(await hardhatToken.totalSupply()).to.equal(ownerBalance);
    });
  });

  describe("Transactions", function () {
    it("should transfer tokens between accounts", async function () {
      // owner account o addr1.address
      await hardhatToken.transfer(addr1.address, 5);
      const addr1Bala = await hardhatToken.balanceof(addr1.address);
      expect(addr1Bala).to.equal(5);

      await hardhatToken.connect(add1r).transfer(add2r.address, 5);
      const addr2Bala = await hardhatToken.balanceof(add2r.address);
      expect(addr2Balance).to.equal(5);
    });

    it("should fail if sender does not have enough tokens", async function () {
      const initialOwnerBalance = await hardhatToken.balanceof(owner.address);
      await expect(hardhatToken.connect(addr1).transfer(owner.address, 1)).to.be.reverted('Not enough tokens')
    });
  });
});
