const hre = require("hardhat");

async function main() {
  console.log("🎨 Deploying CastMate NFT Contract...");

  const CastMate = await hre.ethers.getContractFactory("CastMate");
  const castMate = await CastMate.deploy();

  await castMate.waitForDeployment();

  const address = await castMate.getAddress();
  console.log(`✅ CastMate deployed to: ${address}`);
  
  // Verify on Basescan
  if (hre.network.name !== "hardhat" && hre.network.name !== "localhost") {
    console.log("⏳ Waiting for block confirmation...");
    await castMate.deploymentTransaction().wait(6);
    
    console.log("🔍 Verifying contract on Basescan...");
    try {
      await hre.run("verify:verify", {
        address: address,
        constructorArguments: [],
      });
      console.log("✅ Contract verified successfully!");
    } catch (error) {
      console.log("⚠️  Verification failed:", error.message);
    }
  }

  return address;
}

main()
  .then((address) => {
    console.log(`\n📝 Contract Address: ${address}`);
    console.log("\n🚀 Deployment complete!");
    process.exit(0);
  })
  .catch((error) => {
    console.error("❌ Deployment failed:", error);
    process.exit(1);
  });
