import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";

export const Card = () => {
    const { store, actions } = useContext(Context);
    const [editingContactId, setEditingContactId] = useState(null); // Track the contact being edited
    const [editFormData, setEditFormData] = useState({
        name: "",
        email: "",
        phone: "",
        address: "",
    });

    useEffect(() => {
        actions.getContacts(); // Fetch contacts on mount
    }, []);

    const handleEditClick = (contact) => {
        setEditingContactId(contact.id); // Set the contact being edited
        setEditFormData(contact); // Prefill the form with existing contact data
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditFormData({ ...editFormData, [name]: value });
    };

    const handleSave = async () => {
        await actions.updateContactAPI(editingContactId, editFormData); // Make PUT request
        setEditingContactId(null); // Exit edit mode
        actions.getContacts(); // Refresh the contact list
    };

    return (
        <div className="container mt-4">
            <div className="row">
                {store.contacts.length === 0 ? (
                    <p>No contacts available</p>
                ) : (
                    store.contacts.map((contact) => (
                        <div className="col-md-6 col-lg-4 mb-4" key={contact.id}>
                            <div className="card h-100 shadow-sm">
                                <img
                                    src={`https://picsum.photos/300/200?random=${contact.id}`}
                                    className="card-img-top rounded-top"
                                    alt="Contact"
                                    style={{ objectFit: "cover", height: "200px" }}
                                />
                                <div className="card-body">
                                    {editingContactId === contact.id ? (
                                        <>
                                            {/* Edit Form */}
                                            <input
                                                type="text"
                                                className="form-control mb-2"
                                                name="name"
                                                value={editFormData.name}
                                                onChange={handleChange}
                                                placeholder="Full Name"
                                            />
                                            <input
                                                type="email"
                                                className="form-control mb-2"
                                                name="email"
                                                value={editFormData.email}
                                                onChange={handleChange}
                                                placeholder="Email"
                                            />
                                            <input
                                                type="text"
                                                className="form-control mb-2"
                                                name="phone"
                                                value={editFormData.phone}
                                                onChange={handleChange}
                                                placeholder="Phone"
                                            />
                                            <input
                                                type="text"
                                                className="form-control mb-2"
                                                name="address"
                                                value={editFormData.address}
                                                onChange={handleChange}
                                                placeholder="Address"
                                            />
                                            <div className="d-flex justify-content-between">
                                                <button className="btn btn-success" onClick={handleSave}>
                                                    Save
                                                </button>
                                                <button
                                                    className="btn btn-secondary"
                                                    onClick={() => setEditingContactId(null)}
                                                >
                                                    Cancel
                                                </button>
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            {/* Display Contact Details */}
                                            <h5 className="card-title">{contact.name}</h5>
                                            <p className="card-text mb-1">
                                                <strong>Phone:</strong> {contact.phone}
                                            </p>
                                            <p className="card-text mb-1">
                                                <strong>Email:</strong> {contact.email}
                                            </p>
                                            <p className="card-text">
                                                <strong>Address:</strong> {contact.address}
                                            </p>
                                            <div className="d-flex justify-content-between mt-3">
                                                <button
                                                    className="btn btn-primary"
                                                    onClick={() => handleEditClick(contact)}
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    className="btn btn-danger"
                                                    onClick={() => actions.deleteContact(contact.id)}
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};
