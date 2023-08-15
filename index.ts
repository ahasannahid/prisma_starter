import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main(){
    // const getAllUsers = await prisma.user.findMany()
    // console.log(getAllUsers);

    const postUser = await prisma.user.create({
        data:{
            email : 'a.hnahidd458@getMaxListeners.com',
            name : 'Ahasan',
            age : 34
        }
    })
    console.log(postUser)
}

main();