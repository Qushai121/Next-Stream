'use client'
import prisma  from '@/server/prisma'
import React from 'react'

import { useRouter } from 'next/navigation';
// import { handleDelete } from './action'


type DeleteCrudProps = {
  id: number,
}





const DeleteCrud = ({ id }: DeleteCrudProps) => {
  const router = useRouter()

  async function handleDelete(id: number) {
  
    console.log(id);
    
    await fetch(`http://localhost:3000/api/crud/${id}`, {
      method: "DELETE",
    }).then((data) => {
      router.refresh()
    })
    
  }
  return (
    <>
      <button onClick={() => handleDelete(id)} >Delete</button>
    </>
  )
}

export default DeleteCrud