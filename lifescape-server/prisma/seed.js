const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  await prisma.item.createMany({
    data: [
      {
        name: "Sword of Destiny",
        description: "A legendary sword with immense power.",
        cost: 1000,
        rarity: 5,
        type: "WEAPON",
        CharacterId: 3, // Assuming the Character with ID 1 exists
        URL: "https://cdn.discordapp.com/attachments/1206693476843134996/1211122858160554034/DE04EBEC-1788-4D15-AAD8-D509AAEAE854.jpg?ex=66f804ce&is=66f6b34e&hm=f50ffca6520257ff60c6712f4ebf29711df9006fceb81e69fd6f6b9855a73260&",
        Quantity: 1,
      },
      {
        name: "Health Potion",
        description: "Restores 50 HP.",
        cost: 50,
        rarity: 1,
        type: "CONSUMABLE",
        CharacterId: 3,
        URL: "https://cdn.discordapp.com/attachments/1206693476843134996/1211122858160554034/DE04EBEC-1788-4D15-AAD8-D509AAEAE854.jpg?ex=66f804ce&is=66f6b34e&hm=f50ffca6520257ff60c6712f4ebf29711df9006fceb81e69fd6f6b9855a73260&",
        Quantity: 10,
      },
      {
        name: "Iron Shield",
        description: "A sturdy iron shield for defense.",
        cost: 500,
        rarity: 3,
        type: "ARMOR",
        CharacterId: 3, 
        URL: "https://cdn.discordapp.com/attachments/1206693476843134996/1211122858160554034/DE04EBEC-1788-4D15-AAD8-D509AAEAE854.jpg?ex=66f804ce&is=66f6b34e&hm=f50ffca6520257ff60c6712f4ebf29711df9006fceb81e69fd6f6b9855a73260&",
        Quantity: 1,
      }
    ],
  });

  console.log("Testing items created in the database!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
