import  prisma from "@/server/prisma";
import { SeriesSchemeAdd } from "@/validate/FormSeries";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";


export async function DELETE(req:Request,{ params }: { params: { id: number } }){
   
 try {
    const res = await prisma.series.delete({
        where:{
            id:Number(params.id)
        }
    })
    return NextResponse.json({ success:"Data Berhasil Di hapus"}, { status: 200 })
 } catch (error) {
     return NextResponse.json({ error:params.id}, { status: 404 })
 }
    
   
}

export async function PATCH(req:Request,{ params }: { params: { id: number } }) {
    const reqJson = await req.json()
    const reqData = SeriesSchemeAdd.safeParse(reqJson)
    
    let zodError = {}
    
    if(!reqData.success){
      reqData.error.issues.forEach((issue) => {
        zodError = {...zodError,[issue.path[0]]: issue.message}
      })
      return NextResponse.json({ zodError}, { status: 422 })
    }
      
      try {
            const {directorName,relaseDate,thumbnail,title,rating,sumary} = reqData.data
            await prisma.series.update({
                where:{
                    id:Number(params.id),
                },
                data: {
                    directorName,
                    relaseDate : new Date(relaseDate),
                    thumbnail,
                    title,
                    sumary,
                    rating,
                }
            })
            
            return NextResponse.json({ success:'Data Berhasil Tersimpan' }, { status: 200 })
          } catch (error) {
            return NextResponse.json({ error:'asdasd' }, { status: 404 })
          }
}