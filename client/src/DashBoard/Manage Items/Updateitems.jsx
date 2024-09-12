import React, { useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";

import { TbArrowBack } from "react-icons/tb";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { FaBicycle, FaDumpster } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const UpdateItems = () => {
  const data = useLoaderData();
  const navigate = useNavigate();

  // Initialize state for specifications
  const [specifications, setSpecifications] = useState(data.specifications || []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const name = e.target.name.value;
    const category = e.target.category.value;
    const price = parseFloat(e.target.price.value);
    const details = e.target.details.value;
    const imageUrl = data.image;

    const item = {
      name: name,
      category: category,
      price: price,
      details: details,
      image: imageUrl,
      specifications: specifications, // Include updated specifications
    };

    fetch(`http://localhost:3000/bikes/${data._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    })
      .then((response) => response.json())
      .then((updateData) => {
        if (updateData.acknowledged) {
          navigate("/dashboard/manageitems");
          Swal.fire("Item updated successfully", "", "success");
        } else {
          Swal.fire("Failed to update item", "", "error");
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
        <p className="text-[#D99904] italic text-xl md:text-2xl lg:text-3xl font-normal">
          ---What's New?---
        </p>
        <hr className="w-32 md:w-48 lg:w-[22rem]" />
        <p className=" text-2xl md:text-3xl lg:text-[2.5rem] font-abc">
          Update Item
        </p>
        <hr className="w-32 md:w-48 lg:w-[23rem]" />
      </div>

      <Link to="/dashboard/manageitems" className="btn mb-4">
        <button className="flex gap-2 text-5xl ">
          <TbArrowBack />
        </button>
      </Link>

      <div>
        <form
          className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 md:p-[5.5rem] bg-base-100 rounded-xl lg:mb-32"
          onSubmit={handleSubmit}
        >
          <img
            className="col-span-1 md:col-span-2 mx-auto rounded-2xl mb-4"
            src={data.image}
            alt={data.name}
          />

          {/* Basic Info Inputs */}
          <div className="col-span-1 md:col-span-2">
            <label className="label">
              <span className="label-text text-xl font-semibold">
                Name
              </span>
            </label>
            <input
              type="text"
              name="name"
              defaultValue={data.name}
              placeholder="Enter Product name"
              className="w-full bg-base-100 text-xl py-[1.6rem] px-[2.25rem] border rounded-lg"
              required
            />
          </div>

          <div>
            <label className="label">
              <span className="label-text text-xl font-semibold">
                Category
              </span>
            </label>
            <select
              defaultValue={data.category}
              name="category"
              className="w-full bg-base-100  text-xl py-[1.6rem] px-[2.25rem] border rounded-lg"
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
              <span className="label-text text-xl font-semibold">
                Price
              </span>
            </label>
            <input
              type="number"
              name="price"
              defaultValue={data.price}
              placeholder="Enter Your Price"
              className="w-full text-xl bg-base-100 py-[1.6rem] px-[2.25rem] border rounded-lg"
              required
            />
          </div>

          <div className="col-span-1 md:col-span-2">
            <label className="label">
              <span className="label-text text-xl font-semibold">
                Bike Details
              </span>
            </label>
            <textarea
              defaultValue={data.details}
              placeholder="Enter Data Details"
              name="details"
              className="w-full bg-base-100  text-xl h-[8rem] py-[1.6rem] px-[2.25rem] border rounded-lg resize-none"
              required
            />
          </div>

          {/* Specifications Section */}
          <div className="col-span-1 md:col-span-2">
            <label className="label">
              <span className="label-text text-xl font-semibold">
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
                  className="w-full bg-base-100  text-xl py-[1.2rem] px-[2.25rem] border rounded-lg"
                  required
                />
                <button
                  type="button"
                  onClick={() => removeSpecification(index)}
                  className=""
                >
                  <MdDelete className="text-3xl hover:text-red-500"/>
                </button>
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
            <button type="submit" value="Send">
              <div className="flex gap-3 items-center hover:bg-slate-600 px-[1.5rem] py-4 text-xl font-semibold hover:text-white rounded-xl bg-slate-800 text-white">
                Update Bike <FaBicycle className="text-3xl" />
              </div>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateItems;
