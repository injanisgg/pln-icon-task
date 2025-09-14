import React, { useState } from 'react'
import FormBooking from '../components/FormBooking'

function FormPage() {
  const [showForm, setShowForm] = useState(false);

  const handleButtonForm = () => {
    setShowForm(true);
  };

  // dipanggil saat form submit atau batal
  const handleCloseForm = () => {
    setShowForm(false);
  };

  return (
    <div className='p-3'>
      {/* header */}
      <div className="flex justify-between">
        <span>
          <h1 className='text-xl font-semibold'>Ruang Meeting</h1>
          <span className='flex gap-1 items-center'>
            <p className={`text-sm ${showForm ? 'text-gray-400' : 'text-primary'}`}>Ruang Meeting</p>
            {showForm &&
              <>
                <i className='fa-solid fa-chevron-right fa-sm text-primary'></i>
                <p className='text-sm text-primary'>Pesan Ruangan</p>
              </>
            }
          </span>
        </span>

        {!showForm && (
          <button
            onClick={handleButtonForm}
            className='flex items-center gap-2 text-white bg-primary p-2 rounded-md text-sm'
          >
            <i className="fa-solid fa-plus"></i>
            Pesan Ruangan
          </button>
        )}
      </div>

      {/* Form */}
      {showForm && <FormBooking onClose={handleCloseForm} />}
    </div>
  )
}

export default FormPage