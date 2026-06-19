const { User, Owner } = require('./src/models');
async function test() {
  const email = "9876543210"; // sample mobile
  console.log("Searching for:", email);
  const owner = await Owner.findOne({ 
      where: { ContactNumber: email },
      include: [{ model: User, as: 'User' }]
  });
  console.log("Owner found:", owner ? owner.toJSON() : null);
}
test().catch(console.error).finally(() => process.exit(0));
