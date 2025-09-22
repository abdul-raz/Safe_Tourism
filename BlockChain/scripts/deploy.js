async function main() {
  const DigitalIdentity = await ethers.getContractFactory("DigitalIdentity");
  const digitalIdentity = await DigitalIdentity.deploy();

  await digitalIdentity.deployed();

  console.log("DigitalIdentity deployed to:", digitalIdentity.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
