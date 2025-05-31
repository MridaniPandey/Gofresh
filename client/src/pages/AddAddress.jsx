import React, { useState } from 'react';
import { assets } from "../assets/assets";
import { useNavigate } from 'react-router-dom';

// Input Field Component
const InputField = ({ type, placeholder, name, handleChange, address }) => (
  <input
    className='w-full px-2 py-2.5 border border-gray-500/300 rounded outline-none text-gray-500 focus:border-primary transition'
    type={type}
    placeholder={placeholder}
    onChange={handleChange}
    name={name}
    value={address[name]}
  />
);

const AddAddress = () => {
  const navigate = useNavigate();

  const [address, setAddress] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "", // Keeping it as a text input
    zipcode: "",
    country: "",
    phone: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddress((prevAddress) => ({
      ...prevAddress,
      [name]: value
    }));
  }

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    // Save the new address to localStorage
    const savedAddresses = JSON.parse(localStorage.getItem("addresses")) || []; // Load existing addresses or an empty array
    savedAddresses.push(address); // Add new address
    localStorage.setItem("addresses", JSON.stringify(savedAddresses)); // Save back to localStorage

    // Redirect to the cart page
    navigate("/cart");
  };

  return (
    <div className='mt-16 pb-16'>
      <p className="text-2xl md:text-3xl text-gray-500">
        Add Shipping <span className="font-semibold text-primary">Address</span>
      </p>
      <div className="flex flex-col-reverse md:flex-row justify-between mt-10">
        <div className="flex-1 max-w-md">
          <form onSubmit={onSubmitHandler} className="space-y-3 mt-6 text-sm">
            <div className="grid grid-cols-2 gap-4">
              <InputField handleChange={handleChange} type="text" placeholder="First Name" name="firstName" address={address} />
              <InputField handleChange={handleChange} type="text" placeholder="Last Name" name="lastName" address={address} />
            </div>

            <InputField handleChange={handleChange} type="email" placeholder="Email address" name="email" address={address} />
            <InputField handleChange={handleChange} type="text" placeholder="Street" name="street" address={address} />

            <div className="grid grid-cols-2 gap-4">
              <InputField handleChange={handleChange} type="text" placeholder="City" name="city" address={address} />
              <InputField handleChange={handleChange} type="text" placeholder="State" name="state" address={address} />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <InputField handleChange={handleChange} type="number" placeholder="Zip code" name="zipcode" address={address} />
              <InputField handleChange={handleChange} type="text" placeholder="Country" name="country" address={address} />
            </div>

            <InputField handleChange={handleChange} type="text" placeholder="Phone" name="phone" address={address} />
            <button className='w-full mt-6 bg-primary text-white py-3 hover:bg-primary-dull transition cursor-pointer uppercase'>Save Address</button>
          </form>
        </div>
        <img className='md:mr-16 mb-16 md:mt-0' src={assets.add_address_iamge} alt="AddAddress" />
      </div>
    </div>
  )
};

export default AddAddress;
