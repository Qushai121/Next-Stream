"use client"
import { zodResolver } from '@hookform/resolvers/zod'
import { Series } from '@prisma/client'
import React, { FormHTMLAttributes, useEffect, useState } from 'react'
import { useForm, Resolver } from 'react-hook-form'
import { ZodType, z } from 'zod'
import { useRouter } from 'next/navigation';
import FormErorr from '@/components/FormErorr'
import { SeriesFormType, SeriesSchemeAdd } from '@/validate/FormSeries'


const AddCrud = () => {
  const [open, setOpen] = useState(false)

  const { register, handleSubmit, formState: { errors, isLoading, }, setError, reset } = useForm<SeriesFormType>({
    resolver: zodResolver(SeriesSchemeAdd)
  })

  const route = useRouter()


  const submit = (e: SeriesFormType) => {
    fetch('http://localhost:3000/api/crud', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        ...e,
      })
    }).then((data) => {
      console.log(data);
      route.refresh()
      if (data.status == 200) {
        reset()
      }
    })
  }
  return (
    <div className='z-50'  >
      <button onClick={() => setOpen(!open)} className='btn btn-sm bg-brown_main text-white_second hover:bg-brown_second ' >
        Add Data
      </button>
      {open ?
        <div className="absolute top-1/2  left-1/2 transform -translate-y-1/2  -translate-x-1/2">
          <div className="modal-box bg-stone-200 text-brown_main font-semibold border-2 border-brown_main">
            <h3 className="font-bold text-lg whitespace-nowrap ">Tambah Data</h3>
            <form onSubmit={handleSubmit(submit)} >
              <div className='mt-2 flex flex-col' >
                <label htmlFor="title">title</label>
                <input {...register('title')} className='bg-white_second rounded-md py-1 mt-1' type="text" />
                <FormErorr msg={errors.title?.message} />
              </div>
              <div className='mt-2 flex flex-col' >
                <label htmlFor="thumbnail">thumbnail</label>
                <input {...register('thumbnail')} className='bg-white_second rounded-md  shadow-md py-1 mt-1' type="text" />
                <FormErorr msg={errors.thumbnail?.message} />
              </div>
              <div className='mt-2 flex flex-col' >
                <label htmlFor="directorName">directorName</label>
                <input {...register('directorName')} className='bg-white_second rounded-md  shadow-md py-1 mt-1' type="text" />
                <FormErorr msg={errors.directorName?.message} />
              </div>
              <div className='mt-2 flex flex-col' >
                <label htmlFor="sumary">sumary</label>
                <input {...register('sumary')} className='bg-white_second rounded-md  shadow-md py-1 mt-1' type="text" />
                <FormErorr msg={errors.sumary?.message} />
              </div>
              <div className='mt-2 flex flex-col' >
                <label htmlFor="rating">rating</label>
                <input {...register('rating', {
                  valueAsNumber: true
                })} className='bg-white_second rounded-md  shadow-md py-1 mt-1' type="number" />
                <FormErorr msg={errors.rating?.message} />
              </div>
              <div className='mt-2 flex flex-col' >
                <label htmlFor="relaseDate">relaseDate</label>
                <input {...register('relaseDate', {
                  valueAsDate: true,
                })} className='bg-white_second rounded-md  shadow-md py-1 mt-1' type="date" />
                <FormErorr msg={errors.relaseDate?.message} />
              </div>
              <div className="modal-action">
                <button type='submit' className='btn ' >Kirim</button>
                <button onClick={() => { setOpen(false); reset(); route.refresh() }
                } className="btn bg-red-500">Close</button>
              </div>
            </form>
          </div>
        </div>
        : null
      }
    </div>
  )
}

export default AddCrud