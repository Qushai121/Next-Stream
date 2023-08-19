"use client"

import FormErorr from '@/components/FormErorr'
import { SeriesSchemeAdd } from '@/validate/FormSeries'
import { zodResolver } from '@hookform/resolvers/zod'
import type { Series } from '@prisma/client'
import { useRouter } from 'next/navigation'
import React, { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'

type UpdateCrudParams = {
  data: Series
}

const UpdateCrud = ({ data }: UpdateCrudParams) => {
  const [open, setOpen] = useState(false)
  const [openId, setOpenId] = useState<number>()

 const { relaseDate,...res} = data
  


  const { register, handleSubmit, formState: { errors, isLoading, defaultValues }, setError, watch } = useForm<Series>({
    defaultValues: {
      ...res,
    },
    resolver: zodResolver(SeriesSchemeAdd)
  })


  const route = useRouter()

  const submit = (e: Series) => {
    fetch(`http://localhost:3000/api/crud/${data.id}`, {
      method: 'PATCH',
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify({
        ...e,
      })
    }).then((data) => {
      route.refresh()
    })
  }

  return (
    <>
      <button onClick={() => setOpen(!open)} className='btn btn-sm bg-brown_main text-white_second hover:bg-brown_second ' >
        Edit
      </button>
      {open ?
        <div className=" fixed top-1/2 backdrop-blur-sm w-full h-full z-[999] left-1/2 transform -translate-y-1/2 -translate-x-1/2">
         
          <div className='flex justify-center items-center h-full' >
            <div className="modal-box bg-stone-200 text-brown_main font-semibold border-2 border-brown_main">
              <h3 className="font-bold text-lg whitespace-nowrap ">Tambah Data</h3>
              <form onSubmit={handleSubmit(submit)} >
                <div className='mt-2 flex flex-col' >
                  <label htmlFor="title">title</label>
                  <input  {...register('title')} className='bg-white_second shadow-md rounded-sm py-1 mt-1' type="text" />
                  <FormErorr msg={errors.title?.message} />
                </div>
                <div className='mt-2 flex flex-col' >
                  <label htmlFor="thumbnail">thumbnail</label>
                  <input {...register('thumbnail')} className='bg-white_second rounded-sm shadow-md py-1 mt-1' type="text" />
                  <FormErorr msg={errors.thumbnail?.message} />
                </div>
                <div className='mt-2 flex flex-col' >
                  <label htmlFor="directorName">directorName</label>
                  <input  {...register('directorName')} className='bg-white_second rounded-sm shadow-md py-1 mt-1' type="text" />
                  <FormErorr msg={errors.directorName?.message} />
                </div>
                <div className='mt-2 flex flex-col' >
                  <label htmlFor="sumary">sumary</label>
                  <input {...register('sumary')} className='bg-white_second rounded-sm shadow-md py-1 mt-1' type="text" />
                  <FormErorr msg={errors.sumary?.message} />
                </div>
                <div className='mt-2 flex flex-col' >
                  <label htmlFor="rating">rating</label>
                  <input {...register('rating', {
                    valueAsNumber: true
                  })} className='bg-white_second rounded-sm shadow-md py-1 mt-1' type="number" />
                  <FormErorr msg={errors.rating?.message} />
                </div>
                <div className='mt-2 flex flex-col' >
                  <label htmlFor="relaseDate">{data.createdAt.toString()}</label>
                  
                  <input type="date" id='date' {...register('relaseDate', {
                    valueAsDate: true,
                  })}  defaultValue={new Date(data.relaseDate).toISOString().substring(0, 10)} className='bg-white_second rounded-sm shadow-md py-1 mt-1' />
                  <FormErorr msg={errors.relaseDate?.message} />
                </div>
                <div className="modal-action">
                  <button type='submit' className='btn ' >Kirim</button>
                  <button onClick={() => setOpen(false)
                  } className="btn bg-red-500">Close</button>
                </div>
              </form>
            </div>
          </div>
        </div>
        : null
      }
    </>
  )
}

export default UpdateCrud