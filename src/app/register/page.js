'use client'; 
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Emodal from "../../components/Emodal";
import Summary from "../../components/Summary";
import axios from "axios";

function page({ setdisplogin }) {

  const [formData, setFormData] = useState({
    reservationDate: "",
    numberOfPeople: "",
    name: "",
    phoneNumber: "",
    email: "",
    selectedTimeSlot: "",
  });

  const [errors, setErrors] = useState({
    reservationDate: "",
    numberOfPeople: "",
    name: "",
    phoneNumber: "",
    email: "",
    selectedTimeSlot: "",
  });

  const [success, setSuccess] = useState(false);
  const [summary, setSummary] = useState(false);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [loading, setLoading] = useState(false);



  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLogout = () => {
    localStorage.clear();
    setdisplogin(true);
  };

  const sendInfo = () => {
    const { reservationDate, numberOfPeople, name, phoneNumber, email, selectedTimeSlot } = formData;
    axios.post("https://server22-yn15.onrender.com/api/reservations", {
      reservationDate,
      numberOfPeople,
      name,
      phoneNumber,
      email,
      selectedTimeSlot,
    }).then(response => {
      setSuccess(true);
      console.log(response);
    }).catch(error => {
      console.log(error);
    });
  };

  const validate = () => {
    let formErrors = {};
    let isValid = true;

    // Reservation Date Validation
    if (!formData.reservationDate) {
      formErrors.reservationDate = "Reservation date and time is required.";
      isValid = false;
    }

    // Number of People Validation
    if (!formData.numberOfPeople) {
      formErrors.numberOfPeople = "Number of people is required.";
      isValid = false;
    } else if (formData.numberOfPeople < 1) {
      formErrors.numberOfPeople = "Number of people must be at least 1.";
      isValid = false;
    }

    // Name Validation
    if (!formData.name) {
      formErrors.name = "Name is required.";
      isValid = false;
    }

    // Phone Number Validation (Must be 10 digits)
    const phoneRegex = /^[0-9]{10}$/;
    if (!formData.phoneNumber) {
      formErrors.phoneNumber = "Phone number is required.";
      isValid = false;
    } else if (!phoneRegex.test(formData.phoneNumber)) {
      formErrors.phoneNumber = "Phone number must be 10 digits.";
      isValid = false;
    }

    // Email Validation (Basic Email Format Check)
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!formData.email) {
      formErrors.email = "Email is required.";
      isValid = false;
    } else if (!emailRegex.test(formData.email)) {
      formErrors.email = "Invalid email address.";
      isValid = false;
    }

    // Selected Time Slot Validation
    if (!formData.selectedTimeSlot) {
      formErrors.selectedTimeSlot = "Please select a time slot.";
      isValid = false;
    }

    setErrors(formErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      sendInfo();
    }
  };

  const handleReset = () => {
    setFormData({
      reservationDate: "",
      numberOfPeople: "",
      name: "",
      phoneNumber: "",
      email: "",
      selectedTimeSlot: "",
    });
    setSuccess(false);
    setSummary(false);
  };

  const currentDate = new Date().toISOString().split("T")[0]; 

 
  const handleDateChange = async (e) => {
    const selectedDate = e.target.value;
    setFormData({ ...formData, reservationDate: selectedDate });

    if (selectedDate) {

      setLoading(true);
      try {
       
        const response = await axios.get(`https://server22-yn15.onrender.com/api/available-time-slots?date=${selectedDate}`);
        console.log(response)
        setAvailableSlots(response.data);
        console.log(availableSlots);
      } catch (error) {
       console.log(error); 
      }

      setLoading(false);
    }
  };

  return (
    <div className=" transition-all duration-500">
      {summary && (
        <div className=" z-30 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <Summary handleReset={handleReset} setSuccess={setSuccess} />
        </div>
      )}

      {success && (
        <div className=" z-30 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <Emodal handleReset={handleReset} setSuccess={setSuccess} summary={summary} setSummary={setSummary} />
        </div>
      )}

      <div className={`max-w-md w-full space-y-8 p-10 bg-white rounded-xl shadow-lg z-10  ${(success || summary) && " bg-opacity-50  filter blur-md"} `}>
        <article className={`grid gap-8 `}>
          <section className="flex flex-col">
            <header className="flex flex-col sm:flex-row items-center">
              <h2 className="font-semibold text-black text-lg m-auto">
                Booking Form
              </h2>
            </header>

            <div className="mt-5">
              <form onSubmit={handleSubmit}>
                <div className={` flex justify-center  ${success && " object-cover filter blur-md"} `}>
                  <Image
                    src="/logo.jpg"
                    alt="My Image"
                    width={300}
                    height={200}
                  />
                </div>

                <div className="md:flex md:space-x-4 w-full text-xs">
                  <div className="mb-3 w-full text-xs">
                    <label
                      className="font-semibold text-gray-600 py-2"
                      htmlFor="reservationDate"
                    >
                      Reservation Date
                      <abbr title="required">*</abbr>
                    </label>
                    <input
                      id="reservationDate"
                      name="reservationDate"
                      type="date"
                      value={formData.reservationDate}
                      min={currentDate} // Set min date to current date
                      onChange={handleDateChange}
                      className="block w-full h-10 px-4 bg-gray-100 border border-gray-300 rounded-lg outline-none"
                    />
                    {errors.reservationDate && (
                      <p className="text-red-500 text-xs">{errors.reservationDate}</p>
                    )}
                  </div>
                </div>

                {formData.reservationDate && (
                  <div className = "text-black border border-grey rounded p-3 text-[16px] transition-all duration-500">
                    <h3>Available Time Slots for {formData.reservationDate}:</h3>
                    <ul className = "text-black">
                      {loading ? (
                        <li>Loading time slots...</li>
                      ) : availableSlots.length === 0 ? (
                        <li>No available slots</li>
                      ) : (
                        availableSlots.map((time) => (
                          <li key={time} className = "p-1 pl-2">
                            <label>
                              <input
                                type="radio"
                                name="selectedTimeSlot"
                                value={time}
                                // disabled={!isAvailable}
                                onChange={handleChange}
                              />
                            </label>
                            {time}                            
                          </li>
                        ))
                      )}
                    </ul>
                    {errors.selectedTimeSlot && (
                      <p className="text-red-500 text-xs">{errors.selectedTimeSlot}</p>
                    )}
                  </div>
                )}

                <div className="md:flex md:space-x-4 w-full text-xs">
                  <div className="mb-3 w-full text-xs">
                    <label
                      className="font-semibold text-gray-600 py-2"
                      htmlFor="numberOfPeople"
                    >
                      Number of people
                      <abbr title="required">*</abbr>
                    </label>
                    <input
                      id="numberOfPeople"
                      name="numberOfPeople"
                      type="number"
                      value={formData.numberOfPeople}
                      onChange={handleChange}
                      className="block w-full h-10 px-4 bg-gray-100 border border-gray-300 rounded-lg outline-none"
                      min="1"
                      max = "10"
                    />
                    {errors.numberOfPeople && (
                      <p className="text-red-500 text-xs">{errors.numberOfPeople}</p>
                    )}
                  </div>
                </div>

                <div className="md:flex md:space-x-4 w-full text-xs">
                  <div className="w-full mb-3">
                    <label
                      className="font-semibold text-gray-600 py-2"
                      htmlFor="name"
                    >
                      Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleChange}
                      className="block w-full h-10 px-4 bg-gray-100 border border-gray-300 rounded-lg outline-none"
                    />
                    {errors.name && (
                      <p className="text-red-500 text-xs">{errors.name}</p>
                    )}
                  </div>

                  <div className="w-full mb-3">
                    <label
                      className="font-semibold text-gray-600 py-2"
                      htmlFor="phoneNumber"
                    >
                      Phone No.
                      <abbr title="required">*</abbr>
                    </label>
                    <input
                      id="phoneNumber"
                      name="phoneNumber"
                      type="tel"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      className="block w-full h-10 px-4 bg-gray-100 border border-gray-300 rounded-lg outline-none"
                      pattern="[0-9]{10}"
                    />
                    {errors.phoneNumber && (
                      <p className="text-red-500 text-xs">{errors.phoneNumber}</p>
                    )}
                  </div>
                </div>

                <div className="w-full mb-3">
                  <label
                    className="font-bold text-[18px] text-gray-600 py-2"
                    htmlFor="email"
                  >
                    Email
                    <abbr title="required">*</abbr>
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="block w-full h-10 px-4 bg-gray-100 border border-gray-300 rounded-lg outline-none"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs">{errors.email}</p>
                  )}
                </div>

                <div className="mt-5 flex justify-between space-x-3">
                  <button
                    onClick={handleLogout}
                    type="reset"
                    className="bg-white border-red-400 border-[1px] px-5 py-2 transition-all duration-500 text-sm shadow-sm font-medium text-gray-600 rounded-full hover:bg-red-400 hover:border-red-400"
                  >
                    Logout
                  </button>
                  <button
                    type="submit"
                    className="bg-[#5ae3aa] px-5 py-2 text-sm shadow-sm transition-all duration-300 font-medium text-white rounded-full hover:bg-[#5ae377]"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </section>
        </article>
      </div>
    </div>
  );
}

export default page;


