import hre from "hardhat";

async function main() {
    const contract = await hre.ethers.getContractFactory("DocumentVarifier");
    const contractDeploy = await contract.deploy();
    await contractDeploy.waitForDeployment();

    console.log("Contract deployed to: ", await contractDeploy.getAddress());
}

main().catch((error) => {
    console.log(error);
    process.exit(1);
})