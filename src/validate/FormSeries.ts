
import { Series } from "@prisma/client";
import { ZodType, z } from "zod";

export type SeriesFormType = Omit<Series, "id" | "createdAt" | "updatedAt">

export const SeriesSchemeAdd:ZodType<SeriesFormType> = z.object({
  title: z.string().min(1),
  thumbnail: z.string().min(6).max(255),
  directorName: z.string().min(3).max(50),
  sumary: z.string(),
    rating: z.number().nullable(),
    // gunakan coerce untuk cari primitive 
    // ini dibaca jadi new Date()
    relaseDate: z.coerce.date(),
  })
  
  
// export type SeriesFormType = z.infer<typeof SeriesSchemeAdd>