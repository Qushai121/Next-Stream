import React from 'react'

type PropsType = {
    children:JSX.Element
}

const layout = ({children}:PropsType) => {
  return (
    <div className='bg-white_main min-h-screen' >
    <div className='pt-9 text-black_main' >{children}</div>
    </div>
  )
}

export default layout