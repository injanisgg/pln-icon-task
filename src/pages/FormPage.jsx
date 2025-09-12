import React from 'react'

function FormPage() {
  return (
    <div className='p-3'>
      {/* header */}
      <div className="flex justify-between">
        <span>
          <h1 className='text-xl font-semibold'>Ruang Meeting</h1>
          <p className='text-primary text-sm'>Ruang Meeting</p>
        </span>
        <button className='flex items-center gap-2 text-white bg-primary p-2 rounded-md text-sm'>
          <i className="fa-solid fa-plus"></i>
          Pesan Ruangan
        </button>
      </div>
    </div>
  )
}

export default FormPage
