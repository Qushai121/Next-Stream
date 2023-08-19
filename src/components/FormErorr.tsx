import React from 'react'

type FormErorrProps = {
    msg? : string 
}
const FormErorr = ({ msg }: FormErorrProps) => {
    
    
    if (!msg) {
        return <></>
    }
    return (
        <div className='text-red-400'>{msg}</div>
    )
}

export default FormErorr