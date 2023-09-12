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

export const GET = async (req: Request, res: NextResponse) => {
    try {
        await main();
        const shipping = await prisma.shipping.findMany({
            where: {
                active: {
                    equals: true,
                },
            },
        });
        //console.log(shipping);
        return NextResponse.json({message: "OK"}, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Error", error }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
};

export const POST = async (req: Request, res: NextResponse) => {
    const {
        name,
        blNumber,
        date,
        description,
        dimensions,
        volume,
        containerNumber,
        comments,
    } = await req.json();
    await main();
    try {
        const invoice = await prisma.shipping.create({
            data: {
                name,
                blNumber,
                date,
                description,
                dimensions,
                volume,
                containerNumber,
                comments,
                active: true,
            },
        });
        return NextResponse.json(invoice, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Error", error }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
};

// export const PUT = async (req: Request, res: Response) => {
//   console.log("UPDATE");
// };

// export const DELETE = async (req: NextRequest, res: Response) => {
//     const id = req.nextUrl.searchParams.get("id");
//     await main();
//     try {
//         if (id) {
//             const invoice = await prisma.invoice.findFirst({ where: { id: id } });
//             if (invoice) {
//                 await prisma.invoice.update({
//                     where: {
//                         id: id,
//                     },
//                     data: {
//                         active: !invoice.active,
//                     },
//                 });
//                 return NextResponse.json(
//                     { message: "Invoice Updated" },
//                     { status: 200 }
//                 );
//             } else {
//                 throw new Error("Invoice not found");
//             }
//         } else {
//             throw new Error("Id not found");
//         }
//     } catch (error) {
//         return NextResponse.json({ message: "Error", error }, { status: 500 });
//     } finally {
//         await prisma.$disconnect();
//     }
// };
