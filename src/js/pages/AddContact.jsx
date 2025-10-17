import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../store/flux.jsx";

const AddContact = () => {
  const { actions } = useAppContext();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    actions.addContact(form);
    navigate("/");
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Add a new contact</h2>
      <form onSubmit={handleSubmit}>
        {["name", "email", "phone", "address"].map((field) => (
          <div className="mb-3" key={field}>
            <label className="form-label text-capitalize">{field.replace("_", " ")}</label>
            <input
              type="text"
              name={field}
              value={form[field]}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
        ))}
        <button type="submit" className="btn btn-primary w-100">
          Save
        </button>
        <p
          className="text-center mt-3 text-decoration-underline"
          role="button"
          onClick={() => navigate("/")}
        >
          or go back to contacts
        </p>
      </form>
    </div>
  );
};

export default AddContact;
