import prisma from "@/prisma";
import { NextResponse, NextRequest } from "next/server";

async function main() {
  try {
    await prisma.$connect();
  } catch (error) {
    console.error(error);
    return;
  }
  // Do other operations...
}

export const GET = async (req: NextRequest, res: NextResponse) => {
  const id = req.nextUrl.searchParams.get("id");
  if (!id) {
    try {
      await main();
      const users = await prisma.user.findMany();
      return NextResponse.json(users, { status: 200 });
    } catch (error) {
      return NextResponse.json({ message: "Error", error }, { status: 500 });
    } finally {
      await prisma.$disconnect();
    }
  } else {
    try {
      await main();
      const user = await prisma.user.findFirst({
        where: {
          id: id,
        },
      });
      return NextResponse.json(user, { status: 200 });
    } catch (error) {
      return NextResponse.json({ message: "Error", error }, { status: 500 });
    } finally {
      await prisma.$disconnect();
    }
  }
};


export const POST = async (req: Request, res: NextResponse) => {
  const { name, email, password, role } = await req.json();
  await main();
  try {
    const user = await prisma.user.create({
      data: { name, email, password, role },
    });
    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};
