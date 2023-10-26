import React, { useState } from 'react';
import '../styles.css';

const Contact = ({ contact, onDelete, onUpdate }) => {
    // State to track whether the contact is in edit mode or not
    const [isEditing, setEditing] = useState(false);

    // State to store the edited contact information
    const [editedContact, setEditedContact] = useState(contact);

    // Function to handle saving the edited contact
    const handleSave = () => {
        onUpdate(editedContact); // Call the parent component's update function
        setEditing(false); // Exit edit mode
    };

    return (
        <div className="contact">
            {isEditing ? ( // Check if the contact is in edit mode
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
                    <button onClick={handleSave}>Save</button> {/* Save button to save changes */}
                </div>
            ) : (
                <div>
                    <h3>{contact.name}</h3>
                    <p>Email: {contact.email}</p>
                    <p>Phone: {contact.phone}</p>
                    <button onClick={() => setEditing(true)}>Edit</button> {/* Edit button to enter edit mode */}
                    <button onClick={() => onDelete(contact.id)}>Delete</button> {/* Delete button to delete the contact */}
                </div>
            )}
        </div>
    );
};

export default Contact;
