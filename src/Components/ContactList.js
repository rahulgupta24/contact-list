import React, { useState, useEffect } from 'react';
import Contact from './Contact';
import '../styles.css';

const ContactList = () => {
    const [contacts, setContacts] = useState([]);
    const [newContact, setNewContact] = useState({ name: '', email: '', phone: '' });

    useEffect(() => {
        // Fetch contacts from the API when the component mounts
        fetch('https://jsonplaceholder.typicode.com/users')
            .then((response) => response.json())
            .then((data) => setContacts(data))
            .catch((error) => console.error(error));
    }, []);

    const generateUniqueID = () => {
        return '_' + Math.random().toString(36).substr(2, 9);
    };

    const handleAddContact = () => {
        // Generate a unique ID for the newly added contact
        const newContactWithID = { ...newContact, id: generateUniqueID() };
        const updatedContacts = [...contacts, newContactWithID];
        setContacts(updatedContacts);

        // Clear the form and trigger a re-render
        setNewContact({ name: '', email: '', phone: '' });
    };

    const handleUpdateContact = (updatedContact) => {
        const updatedContacts = contacts.map((contact) =>
            contact.id === updatedContact.id ? { ...contact, ...updatedContact } : contact
        );
        setContacts(updatedContacts);
    };

    const handleDeleteContact = (contactId) => {
        const updatedContacts = contacts.filter((contact) => contact.id !== contactId);
        setContacts(updatedContacts);
    };

    return (
        <div className="container">
            <h1>Contact List</h1>
            <form className="form">
                <input
                    type="text"
                    placeholder="Name"
                    value={newContact.name}
                    onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={newContact.email}
                    onChange={(e) => setNewContact({ ...newContact, email: e.target.value })}
                />
                <input
                    type="tel"
                    placeholder="Phone"
                    value={newContact.phone}
                    onChange={(e) => setNewContact({ ...newContact, phone: e.target.value })}
                />
                <button type="button" onClick={handleAddContact}>
                    Add Contact
                </button>
            </form>
            {contacts.map((contact) => (
                <Contact
                    key={contact.id}
                    contact={contact}
                    onDelete={handleDeleteContact}
                    onUpdate={handleUpdateContact}
                />
            ))}
        </div>
    );
};

export default ContactList;
