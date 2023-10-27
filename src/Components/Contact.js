import React, { useState } from 'react';
import '../styles.css';

const Contact = ({ contact, onDelete, onUpdate }) => {
    const [isEditing, setEditing] = useState(false);
    const [editedContact, setEditedContact] = useState(contact); // Initialize editedContact with the contact prop

    const handleSave = () => {
        onUpdate(editedContact);
        setEditing(false);
    };

    return (
        <div className="contact">
            {isEditing ? (
                <div>
                    <input
                        type="text"
                        value={editedContact.name}
                        onChange={(e) => setEditedContact({ ...editedContact, name: e.target.value })}
                    />
                    <input
                        type="email"
                        value={editedContact.email}
                        onChange={(e) => setEditedContact({ ...editedContact, email: e.target.value })}
                    />
                    <input
                        type="tel"
                        value={editedContact.phone}
                        onChange={(e) => setEditedContact({ ...editedContact, phone: e.target.value })}
                    />
                    <button onClick={handleSave}>Save</button>
                </div>
            ) : (
                <div>
                    <h3>{editedContact.name}</h3>
                    <p>Email: {editedContact.email}</p>
                    <p>Phone: {editedContact.phone}</p>
                    <button onClick={() => setEditing(true)}>Edit</button>
                    <button onClick={() => onDelete(editedContact.id)}>Delete</button>
                </div>
            )}
        </div>
    );
};

export default Contact;
