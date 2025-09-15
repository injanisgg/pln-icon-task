import React, { useState } from 'react'
import FormBooking from '../components/FormBooking'

function FormPage({ setShowComplainBtn }) {
  const [showForm, setShowForm] = useState(false);

  const handleButtonForm = () => {
    setShowForm(true);
    setShowComplainBtn(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setShowComplainBtn(false);
  };

  const handleBack = () => {
    setShowForm(false);
    setShowComplainBtn(false); 
  };

  return (
    <div className='p-3 lg:ml-16 xl:ml-20 mt-[85px]'>
      {/* header */}
      <div className="flex justify-between mr-5">
        <span className='flex gap-2 items-center'>
            {showForm && 
              <button onClick={handleBack} className='bg-primary hover:bg-first-blue rounded-lg px-2 py-1 hover:cursor-pointer'>
                <i className='fa-solid fa-chevron-left fa-xs text-white'></i>
              </button>
            }
          <div>
            <h1 className='text-xl font-semibold'>Ruang Meeting</h1>
            <span className='flex gap-1 items-center'>
              <p className={`text-sm ${showForm ? 'text-gray-400' : 'text-primary'}`}>
                Ruang Meeting
              </p>
              {showForm && (
                <>
                  <i className='fa-solid fa-chevron-right fa-xs text-primary'></i>
                  <p className='text-sm text-primary'>Pesan Ruangan</p>
                </>
              )}
            </span>
          </div>
        </span>

        {!showForm && (
          <button
            onClick={handleButtonForm}
            className='flex items-center gap-2 text-white bg-primary hover:bg-first-blue p-2 rounded-md text-sm hover:cursor-pointer'
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