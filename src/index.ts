import { PrismaClient } from "@prisma/client";
import app from "./app";


const prisma = new PrismaClient();
const port = process.env.PORT || 3003

async function main(){
    /* const getAllUsers = await prisma.user.findMany()
     console.log(getAllUsers);

     const postUser = await prisma.user.create({
         data:{
             email : 'a.hnahidd458@getMaxListeners.com',
             name : 'Ahasan',
             age : 34
         }
     })
     console.log(postUser)*/
     app.listen(port, ()=> {
        console.log(`Server running at ${port}`)
     })

}

main();