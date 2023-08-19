"use server";
import prisma  from "@/server/prisma";


export async function handleDelete(id:number) {
    try {
      const res = await prisma.series.delete({
          where:{
              id:Number(id)
          }
      })
   } catch (error) {
   }
  }