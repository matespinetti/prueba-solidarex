"use server"
import prisma from "../../lib/prisma";


export interface ExchangeCenterUserSchema{
    id: string;
    latitude: number;
    longitude: number;
    isUserExchangeCenter: number;
}

export async function getExchangeCenters(userName= "Juan"){
    try {
        const centers: ExchangeCenterUserSchema[] = await prisma.$queryRaw`SELECT ec.*, IF(uec.userId is NOT NULL, TRUE, FALSE) as isUserExchangeCenter
        FROM exchangecenter ec LEFT JOIN userexchangecenter uec ON ec.id = uec.exchangecenterid AND uec.userId = (
            SELECT u.id
            FROM user u
            WHERE u.name= ${userName}
            );`
        return centers;

    } catch (error){
        console.error(error);
        return [];
    }


}


export async function addUserExchangeCenter(userId: string, exchangeCenterId: string){
    try {
        await prisma.userExchangeCenter.create({
            data: {
                userId,
                exchangeCenterId
            }
        })
        return true;
    } catch (error){
        console.error(error);
        return false;
    }

}

export async function removeUserExchangeCenter(userId: string, exchangeCenterId: string){
    try {
        await prisma.userExchangeCenter.deleteMany({
            where: {
                userId,
                exchangeCenterId
            }
        })
        return true;
    } catch (error){
        console.error(error);
        return false;
    }

}
