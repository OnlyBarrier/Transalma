//import prisma from "@/prisma";

export async function prismaConnect() {
  try {
    await prisma.$connect();
  } catch (error) {
    console.error(error);
    return;
  }
}
