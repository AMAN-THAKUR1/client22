"use client";
import React from 'react';

function Emodal({handleReset,setSuccess,summary,setSummary}) {
  return (
    <div className=" ">
        <div
          id="popup-modal"
          tabIndex="-1"
          className="z-50 justify-center items-center w-full h-[calc(100%-1rem)] max-h-full overflow-y-auto"
        >
          <div className=" p-4 w-full max-w-md max-h-full bg-white rounded-lg shadow dark:bg-white-700">
            <div className="p-4 text-center">
              
              <h3 className="mb-5 text-black text-lg font-normal dark:text-gray-400">
                Your Booking was done successfully
              </h3>

              <div className="flex justify-center space-x-3">
                <button
                  onClick={()=>{
                    handleReset();
                    setSummary(true);
                  }}
                  type="button"
                  className="text-white bg-[#5ae3aa]  font-medium rounded-lg text-sm px-5 py-2.5 hover:bg-white hover:text-black border border-[#5ae3aa] transition-all duration-700"
                  aria-label="Confirm deletion"
                >
                  View Summary
                </button>
                <button
                  onClick={()=>{
                    handleReset();
                  }}
                  type="button"
                  className="py-2.5 px-5 text-sm font-medium text-gray-900 bg-white border border-[#5ae3aa] transition-all duration-700 rounded-lg hover:bg-[#5ae3aa] "
                  aria-label="Cancel deletion"
                >
                  Book another
                </button>
              </div>
            </div>
          </div>
        </div>
     
    </div>
  );
}

export default Emodal;


