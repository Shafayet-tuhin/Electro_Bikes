import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { FaBicycle } from "react-icons/fa";

const AddBike = () => {
  const navigate = useNavigate();
  const [specifications, setSpecifications] = useState([""]); // Initialize with one empty field
  const [rating, setRating] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();

    const name = e.target.name.value;
    const details = e.target.details.value;
    const category = e.target.category.value;
    const price = parseFloat(e.target.price.value);
    const imageUrl = e.target.image.value;

    const bikeData = {
      name: name,
      details: details,
      category: category,
      price: price,
      rating: rating,
      image: imageUrl,
      specifications: specifications,
    };

    // POST request to the backend to add a new bike
    fetch(`http://localhost:3000/bikes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bikeData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.acknowledged) {
          navigate("/dashboard/manageitems");
          Swal.fire("New Bike added successfully", "", "success");
        } else {
          Swal.fire("Failed to add bike", "", "error");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        Swal.fire("Something went wrong", "", "error");
      });

    e.target.reset();
  };

  // Handle adding a new specification
  const addSpecification = () => {
    setSpecifications([...specifications, ""]);
  };

  // Handle updating a specification
  const updateSpecification = (index, value) => {
    const updatedSpecs = specifications.map((spec, i) =>
      i === index ? value : spec
    );
    setSpecifications(updatedSpecs);
  };

  // Handle removing a specification
  const removeSpecification = (index) => {
    const updatedSpecs = specifications.filter((_, i) => i !== index);
    setSpecifications(updatedSpecs);
  };

  return (
    <div className="w-full px-4 md:px-8 lg:px-16 py-8">
      <div className="flex flex-col items-center gap-4 mb-12">
        <p className="text-[#D99904] italic text-base md:text-2xl lg:text-3xl font-normal">
          ---What's New?---
        </p>
        <hr className="w-32 md:w-48 lg:w-[22rem]" />
        <p className="text-2xl md:text-3xl lg:text-[2.5rem] font-abc">
          Add New Bike
        </p>
        <hr className="w-32 md:w-48 lg:w-[23rem]" />
      </div>

      <div>
        <form
          className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 md:p-[5.5rem] bg-base-200 rounded-xl lg:mb-32"
          onSubmit={handleSubmit}
        >
          {/* Basic Info Inputs */}
          <div className="col-span-1 md:col-span-3">
            <label className="label">
              <span className="label-text text-[#444444] text-lg font-semibold">
                Name
              </span>
            </label>
            <input
              type="text"
              name="name"
              placeholder="Enter Bike Name"
              className="w-full text-base py-[1.6rem] bg-base-100 px-[2.25rem] border rounded-lg"
              required
            />
          </div>

          <div>
            <label className="label">
              <span className="label-text text-[#444444] text-lg font-semibold">
                Category
              </span>
            </label>
            <select
              name="category"
              className="w-full text-base py-[1.6rem] bg-base-100 px-[2.25rem] border rounded-lg"
              required
            >
              <option value="folding">Folding</option>
              <option value="comfort">Comfort</option>
              <option value="light trail">Light Trail</option>
              <option value="full suspension">Full Suspension</option>
            </select>
          </div>

          <div>
            <label className="label">
              <span className="label-text text-[#444444] text-lg font-semibold">
                Price
              </span>
            </label>
            <input
              type="number"
              name="price"
              placeholder="Enter Bike Price"
              className="w-full bg-base-100 text-base py-[1.6rem] px-[2.25rem] border rounded-lg"
              required
            />
          </div>

          <div>
            <label className="label">
              <span className="label-text text-[#444444] text-lg font-semibold">
                Rating
              </span>
            </label>
            <input
              type="number"
              name="rating"
              min="0"
              max="5"
              step="0.1"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              placeholder="Enter Rating (0-5)"
              className="w-full bg-base-100 text-base py-[1.6rem] px-[2.25rem] border rounded-lg"
              required
            />
          </div>

          <div className="col-span-1 md:col-span-3">
            <label className="label">
              <span className="label-text text-[#444444] text-lg font-semibold">
                Bike Details
              </span>
            </label>
            <textarea
              placeholder="Enter Bike Details"
              name="details"
              className="w-full text-base bg-base-100 h-[8rem] py-[1.6rem] px-[2.25rem] border rounded-lg resize-none"
              required
            />
          </div>

          <div className="col-span-1 md:col-span-3">
            <label className="label">
              <span className="label-text text-[#444444] text-lg font-semibold">
                Image URL
              </span>
            </label>
            <input
              type="text"
              name="image"
              placeholder="Enter Image URL"
              className="w-full bg-base-100 text-base py-[1.6rem] px-[2.25rem] border rounded-lg"
              required
            />
          </div>

          {/* Specifications Section */}
          <div className="col-span-1 md:col-span-3">
            <label className="label">
              <span className="label-text  text-[#444444] text-lg font-semibold">
                Specifications
              </span>
            </label>
            {specifications.map((spec, index) => (
              <div key={index} className="flex gap-2 mb-4">
                <input
                  type="text"
                  value={spec}
                  onChange={(e) => updateSpecification(index, e.target.value)}
                  placeholder="Enter Specification"
                  className="w-full text-base bg-base-100 py-[1.2rem] px-[2.25rem] border rounded-lg"
                  required
                />
                {specifications.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeSpecification(index)}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg"
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={addSpecification}
              className="px-4 py-2 bg-green-500 text-white rounded-lg"
            >
              Add Specification
            </button>
          </div>

          <div className="col-span-1 md:col-span-2 flex justify-center mt-4">
            <button type="submit">
              <div className="flex gap-3 items-center hover:bg-slate-600 px-[1.5rem] py-4 text-base font-semibold hover:text-white rounded-xl bg-slate-800 text-white">
                Add Bike <FaBicycle className="text-3xl" />
              </div>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBike;
