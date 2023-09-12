import prisma from "@/prisma";
import { NextRequest, NextResponse } from "next/server";
import { calculateTax } from "@/utils/calculateTax";
import { createSerial } from "@/utils/createSerial";
import { sumNumbersInString } from "@/utils/sumNumbersInString";
import { prismaConnect } from "@/utils/prismaConnect";


export const GET = async (req: Request, res: NextResponse) => {
  try {
    await prismaConnect();
    const invoices = await prisma.invoice.findMany({
      where: {
        active: {
          equals: true,
        },
      },
    });
    return NextResponse.json(invoices, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};

export const POST = async (req: Request, res: NextResponse) => {
  const {
    serial,
    date,
    customerName,
    customerId,
    description,
    value,
    active,
    blNumber,
    containerNumber,
  } = await req.json();
  await prismaConnect();
  //const serial: string = createSerial();
  const tax: string = calculateTax(description, value);
  const total: number = sumNumbersInString(value.toString(), tax);
  try {
    const invoice = await prisma.invoice.create({
      data: {
        serial,
        date,
        customerName,
        customerId,
        description,
        value,
        active,
        total,
        tax,
        blNumber,
        containerNumber,
      },
    });
    return NextResponse.json({message: "OK"}, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};

// export const PUT = async (req: Request, res: Response) => {
//   console.log("UPDATE");
// };

export const DELETE = async (req: NextRequest, res: Response) => {
  const id = req.nextUrl.searchParams.get("id");
  await prismaConnect();
  try {
    if (id) {
      const invoice = await prisma.invoice.findFirst({ where: { id: id } });
      if (invoice) {
        await prisma.invoice.update({
          where: {
            id: id,
          },
          data: {
            active: !invoice.active,
          },
        });
        return NextResponse.json(
          { message: "Invoice Updated" },
          { status: 200 }
        );
      } else {
        throw new Error("Invoice not found");
      }
    } else {
      throw new Error("Id not found");
    }
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};
