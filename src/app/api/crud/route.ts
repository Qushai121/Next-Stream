import prisma from "@/server/prisma";
import { SeriesSchemeAdd } from "@/validate/FormSeries";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: Request) {

  const series = await prisma.series.findMany();
  return NextResponse.json({ data: series }, { status: 200 })
}

export async function POST(req: Request) {

  
  try {
    const reqJson = await req.json()
    const reqData = SeriesSchemeAdd.safeParse(reqJson)
  
    let zodError = {}
  
    if (!reqData.success) {
      reqData.error.issues.forEach((issue) => {
        zodError = {[issue.path[0]]: issue.message }
      })
      return NextResponse.json({ error: zodError }, { status: 422 })
    }
    const { directorName, relaseDate, thumbnail, title, rating, sumary } = reqData.data
    
    await prisma.series.create({
      data: {
        directorName,
        relaseDate:relaseDate.toISOString(),
        thumbnail,
        title,
        sumary,
        rating,
      }
    })

    return NextResponse.json({ success: 'Data Berhasil Tersimpan' }, { status: 200 })
  } catch (error) {
    console.log(error);
    
    return NextResponse.json({ error: 'asdasd' }, { status: 404 })
  }

}



