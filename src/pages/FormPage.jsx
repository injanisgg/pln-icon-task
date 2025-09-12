import React, { useState } from 'react'
import FormBooking from '../components/FormBooking'

function FormPage() {
  const [showFrom, setShowForm] = useState(false);

  const handleButtonForm = () => {
    setShowForm(prev => !prev)
  }

  return (
    <div className='p-3'>
      {/* header */}
      <div className="flex justify-between">
        <span>
          <h1 className='text-xl font-semibold'>Ruang Meeting</h1>
          <p className='text-primary text-sm'>Ruang Meeting</p>
        </span>
        <button onClick={handleButtonForm} className={`flex items-center gap-2 text-white ${showFrom ? 'bg-red-600' : 'bg-primary'} p-2 rounded-md text-sm`}>
          {showFrom ? <i className="fa-solid fa-xmark"></i> : <i className="fa-solid fa-plus"></i>}
          {showFrom ? 'Tutup Form' : 'Pesan Ruangan'}
        </button>
      </div>

      {/* Form */}
      {showFrom && <FormBooking />}
    </div>
  )
}

export default FormPage
