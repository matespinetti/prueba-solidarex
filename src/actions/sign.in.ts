"use server"

import { signIn } from "@/auth"

export async function login(provider: string){
    try{
        const response = await signIn(provider);
        return {
            status: "success",
            data: response
        }

    } catch (error){
        console.error(error);
        return {
            status: "error",
            data: error
        }
    }
}