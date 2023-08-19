
import { notFound } from 'next/navigation';
import React from 'react'

const page = ({params}:any) => {

    // console.log(Number(params.id) < 10); 
    // if(Number(params.id) < 10){
    // }
  return (
    <div>{params?.id}</div>
  )
}

export default page