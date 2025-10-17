import React from "react";
import { useAppContext } from "../store/flux.jsx";

const ContactCard = ({ contact }) => {
  const { actions } = useAppContext();

  return (
    <div className="card mb-3 shadow-sm">
      <div className="card-body d-flex align-items-center">
        <img
          src={`https://i.pravatar.cc/100?u=${contact.email}`}
          alt="avatar"
          className="rounded-circle me-3"
          width="80"
          height="80"
        />
        <div className="flex-grow-1">
          <h5 className="mb-1">{contact.full_name}</h5>
          <p className="mb-1 text-muted">{contact.address}</p>
          <p className="mb-0">
            📞 {contact.phone} <br />
            ✉️ {contact.email}
          </p>
        </div>
        <button
          className="btn btn-outline-danger ms-3"
          onClick={() => actions.deleteContact(contact.id)}
        >
          🗑️
        </button>
      </div>
    </div>
  );
};

export default ContactCard;
