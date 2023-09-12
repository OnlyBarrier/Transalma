import prisma from "@/prisma";
import { NextRequest, NextResponse } from "next/server";

async function main() {
  try {
    await prisma.$connect();
  } catch (error) {
    console.error(error);
    return;
  }
  // Do other operations...
}

export const GET = async (req: Request, res: NextResponse) => {};

export const POST = async (req: Request, res: NextResponse) => {
  try {
    const { entry, containers } = await req.json();
    const {
      name,
      blNumber,
      date,
      dimensions,
      sealNumber,
      containerNumbers,
      comments,
    } = entry;

    const maxEntry = await prisma.entry.findFirst({
      select: {
        entryNumber: true,
      },
      orderBy: {
        entryNumber: "desc", // Ordena por entryNumber en orden descendente para obtener el máximo.
      },
    });
    // Calcula el nuevo valor de entryNumber aumentando el número más alto en 1.
    const newEntryNumber = (maxEntry ? maxEntry.entryNumber : 0) + 1;
    const newEntry = await prisma.entry.create({
      data: {
        name,
        blNumber,
        date,
        dimensions,
        sealNumber,
        containerNumbers,
        comments,
        active: true,
        entryNumber: newEntryNumber,
      },
    });
    // Crear los contenedores asociados a la entrada
    if (containers && Array.isArray(containers)) {
      for (const containerData of containers) {
        const { ruc, name, wareHouseName, description, blNumber } =
          containerData;
        const createdContainer = await prisma.container.create({
          data: {
            ruc,
            name,
            wareHouseName,
            description,
            blNumber,
            entry: {
              connect: { id: newEntry.id },
            },
          },
        });

        for (const productData of containerData.products) {
          await prisma.product.create({
            data: {
              name: productData.name,
              observations: productData.observations,
              quantity: parseInt(productData.quantity),
              container: {
                connect: { id: createdContainer.id },
              },
            },
          });
        }
      }
    }

    return NextResponse.json({ status: 200 });
  } catch (error) {
    console.error("Error al crear la entrada:", error);
    return NextResponse.json({error, status: 500 });
  }
};
