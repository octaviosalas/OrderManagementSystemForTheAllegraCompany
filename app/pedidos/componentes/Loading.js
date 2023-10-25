import React from 'react'

const Loading = ({text}) => {
  return (
    <div className='flex flex-col items-center justify-center'>
        <small className='text-md '>Cargando {text} ..</small>
        <span className="loading loading-spinner loading-lg mt-2"></span>
    </div>
  )
}

export default Loading
