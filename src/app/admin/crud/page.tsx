
import React, { useEffect } from 'react'
import AddCrud from './AddCrud'
import { Series } from '@prisma/client';
import DeleteCrud from './DeleteCrud';
import UpdateCrud from './UpdateCrud';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/options';
import Logout from './Logout';


async function getDatas() {
  const res = await fetch('http://localhost:3000/api/crud', {
    cache: "no-cache",
  })

  const resJson = await res.json()
  return resJson;
}


const page = async () => {
  const session = await getServerSession(authOptions)
  const datas = await getDatas();
  console.log();


  return (
    <>
      <div className='flex justify-between' >
        <AddCrud />
        <Logout />
        <h1 className='text-2xl font-medium text-blue_main' >Halo</h1>
      </div>
      <p>{JSON.stringify(session)}</p>
      <div className="overflow-x-auto w-[100vw] lg:w-full ">
        <table className="table">
          <thead>
            <tr>
              <th></th>
              <th>title</th>
              <th>thumbnail</th>
              <th>director</th>
              <th>Sumary</th>
              <th>Rating</th>
              <th>Release Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {datas.data.map((data: Series, key: number) => {
              const parsedDate = new Date(data.relaseDate);
              return (
                <tr key={key} >
                  <th>
                    <div className='flex w-fit'>
                      {++key}
                    </div>
                  </th>
                  <th> <div className='flex w-fit'> {data.title}</div></th>
                  <th> <div className='flex w-fit'> {data.thumbnail}</div></th>
                  <th> <div className='flex w-fit'> {data.directorName}</div></th>
                  <th> <div className='flex w-fit'> {data.sumary}</div></th>
                  <th> <div className='flex w-fit'> {data.rating}</div></th>
                  <th> <div className='flex w-fit'> {parsedDate.toDateString()}</div></th>
                  <th >
                    <div className='flex gap-3'>
                      <DeleteCrud id={data.id} />
                      <UpdateCrud data={data} />
                    </div>
                  </th>
                </tr>
              )
            })
            }
          </tbody>
        </table>
      </div>
    </>
  )
}

export default page