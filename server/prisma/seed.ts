import fs from "fs";
import path from "path";
import { PrismaClient } from "../prisma/generated/prisma";

const prisma = new PrismaClient();

async function deleteAllData() {
  await prisma.itinerary.deleteMany({});
  await prisma.tripImage.deleteMany({});
  await prisma.trip.deleteMany({});
  await prisma.tag.deleteMany({});
  await prisma.user.deleteMany({});
  console.log("Cleared previous data.");
}

async function main() {
  console.log("Starting seed process...");
  const seedDir = path.join(__dirname, "seedData");
  const usersPath = path.join(seedDir, "users.json");
  const tripsPath = path.join(seedDir, "allTrips.json");

  await deleteAllData();

  const users: { [key: string]: any }[] = JSON.parse(fs.readFileSync(usersPath, "utf8"));
  const createdUsers = [];
  for (const user of users) {
    const { name, email, imageUrl, dateJoined, itineraryCreated, status } = user;
    const createdUser = await prisma.user.create({
      data: {
        name,
        email,
        imageUrl,
        dateJoined: new Date(dateJoined),
        itineraryCreated: Number(itineraryCreated),
        status: status === "admin" ? "admin" : "user",
      },
    });
    createdUsers.push(createdUser);
  }
  console.log(`Inserted ${users.length} users`);

  const trips: { [key: string]: any }[] = JSON.parse(fs.readFileSync(tripsPath, "utf8"));

  const tagSet = new Set<string>();
  for (const trip of trips) {
    for (const tag of trip.tags) {
      tagSet.add(String(tag));
    }
  }
  const tagMap = new Map<string, string>();
  for (const tag of tagSet) {
    const record = await prisma.tag.upsert({
      where: { name: String(tag) },
      update: {},
      create: { name: String(tag) },
    });
    tagMap.set(String(tag), record.id);
  }
  console.log(`Inserted ${tagMap.size} tags`);

  const userIds = createdUsers.map(u => u.id);
  let userIndex = 0;
  for (const trip of trips) {
    const userId = userIds[userIndex % userIds.length];
    userIndex++;
    const createdTrip = await prisma.trip.create({
      data: {
        name: trip.name,
        estimatedPrice: trip.estimatedPrice,
        travelStyle: trip.travelStyle,
        user: { connect: { id: userId } },
        tags: {
          connect: trip.tags.map((tag: string) => ({ id: tagMap.get(String(tag)) })),
        },
      },
    });

    for (const imageUrl of trip.imageUrls) {
      await prisma.tripImage.create({
        data: {
          imageUrl,
          trip: { connect: { id: createdTrip.id } },
        },
      });
    }

    for (const itinerary of trip.itinerary) {
      await prisma.itinerary.create({
        data: {
          location: itinerary.location,
          trip: { connect: { id: createdTrip.id } },
        },
      });
    }
    console.log(`Created trip: ${createdTrip.name}`);
  }
  console.log("Seeding completed!");
}

main()
  .catch((err) => {
    console.error("Seeding failed:", err);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
