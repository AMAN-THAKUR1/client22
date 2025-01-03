"use client"
import React, { useState, useEffect } from 'react';
import axios from "axios";
import Image from "next/image";

function Summary({ handleReset, setSuccess }) {
  const [recentReservation, setRecentReservation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
   
    const fetchRecentReservation = async () => {
      try {
        const response = await axios.get('https://server22-yn15.onrender.com/api/recent-reservation');
        setRecentReservation(response.data);
      } catch (err) {
        setError("Error fetching recent reservation.");
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchRecentReservation();
  }, []); 

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!recentReservation) {
    return <p>No recent reservations found.</p>;
  }

  return (
    <div className="w-full h-screen flex justify-center items-center px-4 sm:px-6 md:px-8">
      <div
        id="popup-modal"
        tabIndex="-1"
        className="z-50 justify-center items-center w-full h-fit max-h-full overflow-y-auto"
      >
        <div className="p-4 w-full max-w-md bg-white rounded-lg shadow-lg dark:bg-white-700">
          <div className="p-4 text-center">
            <h3 className="mb-5 text-black text-lg font-semibold sm:text-xl md:text-2xl">Your Bookings</h3>

            <div className="reservation-summary text-black p-3 space-y-3">
              <Image
                className="my-0 mx-auto py-3"
                src="/booked.png"
                alt="My Image"
                width={300}
                height={200}
              />
              <p className="text-sm sm:text-base"><strong>Name:</strong> {recentReservation.name}</p>
              <p className="text-sm sm:text-base"><strong>Email:</strong> {recentReservation.email}</p>
              <p className="text-sm sm:text-base"><strong>Phone Number:</strong> {recentReservation.phoneNumber}</p>
              <p className="text-sm sm:text-base"><strong>Reservation Date:</strong> {recentReservation.reservationDate}</p>
              <p className="text-sm sm:text-base"><strong>Number of People:</strong> {recentReservation.numberOfPeople}</p>
              <p className="text-sm sm:text-base"><strong>Selected Time Slot:</strong> {recentReservation.selectedTimeSlot}</p>
            </div>

            <div className="flex justify-center space-x-3 mt-5">
              <button
                onClick={() => {
                  handleReset();
                }}
                type="button"
                className="py-2.5 px-5 text-sm font-medium text-gray-900 border border-[#5ae3aa] transition-all duration-700 bg-[#5ae3aa] rounded-lg hover:bg-[#5ae3cc] sm:px-6 md:px-8"
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

export default Summary;
