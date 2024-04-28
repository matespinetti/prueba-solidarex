import { NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";


export async function GET(){
    await prisma.userExchangeCenter.deleteMany();
    await prisma.exchangeCenter.deleteMany();
    await prisma.user.deleteMany();
    // const exchangeCenter1 = await prisma.exchangeCenter.create({
    //     data: 
    //         //Random latitude and longitude inside the same city, any city, but not extremenly close to each other

    //         {latitude: -34.871706, longitude: -58.061619    }
            

        
    // })

    // const exchangeCenter2 = await prisma.exchangeCenter.create({
    //     data: 
    //     //NOT THE SAME AS ABOVE; BUT NEARBY
    //         {latitude: 4.50971, longitude: -74.08175}
    // })



    // const userMateo = await prisma.user.create({
    //     data: {
    //         name: "Juan",
    //         email: "mateo",
    //         password: "1234",
            

    //     }
    // })

    // const relations = await prisma.userExchangeCenter.createMany({
    //     data: [
    //         {userId: userMateo.id, exchangeCenterId: exchangeCenter1.id},
            
    //     ]
    // })

    return NextResponse.json({sucess: true})

}