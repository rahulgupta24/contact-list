import React, { useState, useEffect } from 'react';
import Contact from './Contact'; // Import the Contact component
import '../styles.css';

const ContactList = () => {
    const [contacts, setContacts] = useState([]); // Define a state variable for storing contacts
    const [newContact, setNewContact] = useState({ name: '', email: '', phone: '' }); // Define a state variable for a new contact form

    useEffect(() => {
        // Use the useEffect hook to fetch contacts from an API when the component mounts
        fetch('https://jsonplaceholder.typicode.com/users')
            .then((response) => response.json())
            .then((data) => setContacts(data)); // Update the state with the fetched contacts
    }, []); // The empty dependency array ensures this effect runs only once when the component mounts

    const handleAddContact = () => {
        // Function to add a new contact
        // Make a POST request to add a new contact (dummy request)
        fetch('https://jsonplaceholder.typicode.com/users', {
            method: 'POST',
            body: JSON.stringify(newContact),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((response) => response.json())
            .then((data) => {
                // Update the state with the new contact and clear the form
                setContacts([...contacts, data]);
                setNewContact({ name: '', email: '', phone: '' });
            });
    };

    const handleUpdateContact = (updatedContact) => {
        // Function to update an existing contact
        fetch(`https://jsonplaceholder.typicode.com/users/${updatedContact.id}`, {
            method: 'PUT',
            body: JSON.stringify(updatedContact),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to update contact');
                }
                return response.json();
            })
            .then((data) => {
                // Update the state with the updated contact
                setContacts(
                    contacts.map((contact) =>
                        contact.id === data.id ? { ...contact, ...data } : contact
                    )
                );
            })
            .catch((error) => console.error(error));
    };

    const handleDeleteContact = (contactId) => {
        // Function to delete a contact
        fetch(`https://jsonplaceholder.typicode.com/users/${contactId}`, {
            method: 'DELETE',
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to delete contact');
                }
                return response.json();
            })
            .then(() => {
                // Update the state by filtering out the deleted contact
                setContacts(contacts.filter((contact) => contact.id !== contactId));
            })
            .catch((error) => console.error(error));
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
