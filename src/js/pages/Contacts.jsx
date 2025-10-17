import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../store/flux.jsx";
import ContactCard from "../components/ContactCard.jsx";

const Contacts = () => {
  const { store, actions } = useAppContext();
  const navigate = useNavigate();

  useEffect(() => {
    actions.getContacts();
  }, []);

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Contact List</h2>
        <button className="btn btn-success" onClick={() => navigate("/add")}>
          ➕ Add new contact
        </button>
      </div>

      {store.contacts.length === 0 ? (
        <p>No contacts available.</p>
      ) : (
        store.contacts.map((contact) => (
          <ContactCard key={contact.id} contact={contact} />
        ))
      )}
    </div>
  );
};

export default Contacts;
