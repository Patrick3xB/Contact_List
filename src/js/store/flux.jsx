import React, { createContext, useContext, useState } from "react";

const AppContext = createContext();

export const ContextProvider = ({ children }) => {
  const BASE_URL = "https://playground.4geeks.com/contact";
  const AGENDA_SLUG = "patrick3xb";

  const [contacts, setContacts] = useState([]);

  // === GET CONTACTS ===
  const getContacts = async () => {
    try {
      const resp = await fetch(`${BASE_URL}/agendas/${AGENDA_SLUG}/contacts`);
      if (!resp.ok) throw new Error("Error al obtener contactos");

      const data = await resp.json();
      setContacts(Array.isArray(data.contacts) ? data.contacts : []);
    } catch (err) {
      console.error("❌ Error fetching contacts:", err);
    }
  };

  // === ADD CONTACT ===
  const addContact = async (contact) => {
    try {
      // Aseguramos el formato que la API espera
      const payload = {
        name: contact.name || "",
        phone: contact.phone || "",
        email: contact.email || "",
        address: contact.address || "",
      };

      // Validación rápida: todos los campos requeridos
      if (!payload.name || !payload.phone || !payload.email || !payload.address) {
        console.warn("⚠️ Faltan campos obligatorios:", payload);
        return;
      }

      const resp = await fetch(`${BASE_URL}/agendas/${AGENDA_SLUG}/contacts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      // Si la API devuelve error, lo mostramos en consola
      if (!resp.ok) {
        const errData = await resp.json().catch(() => ({}));
        console.error("❌ Error de API al crear contacto:", errData);
        throw new Error(`Error al crear contacto (${resp.status})`);
      }

      console.log("✅ Contacto creado correctamente");
      await getContacts();
    } catch (err) {
      console.error("❌ Error adding contact:", err);
    }
  };

  // === UPDATE CONTACT ===
  const updateContact = async (id, updatedContact) => {
    try {
      const payload = {
        name: updatedContact.name || "",
        phone: updatedContact.phone || "",
        email: updatedContact.email || "",
        address: updatedContact.address || "",
      };

      const resp = await fetch(
        `${BASE_URL}/agendas/${AGENDA_SLUG}/contacts/${id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      if (!resp.ok) {
        const errData = await resp.json().catch(() => ({}));
        console.error("❌ Error de API al actualizar contacto:", errData);
        throw new Error(`Error al actualizar contacto (${resp.status})`);
      }

      console.log("✅ Contacto actualizado correctamente");
      await getContacts();
    } catch (err) {
      console.error("❌ Error updating contact:", err);
    }
  };

  // === DELETE CONTACT ===
  const deleteContact = async (id) => {
    try {
      const resp = await fetch(
        `${BASE_URL}/agendas/${AGENDA_SLUG}/contacts/${id}`,
        { method: "DELETE" }
      );

      if (!resp.ok) {
        const errData = await resp.json().catch(() => ({}));
        console.error("❌ Error de API al eliminar contacto:", errData);
        throw new Error(`Error al eliminar contacto (${resp.status})`);
      }

      console.log("🗑️ Contacto eliminado correctamente");
      await getContacts();
    } catch (err) {
      console.error("❌ Error deleting contact:", err);
    }
  };

  const store = { contacts };
  const actions = { getContacts, addContact, updateContact, deleteContact };

  return (
    <AppContext.Provider value={{ store, actions }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
