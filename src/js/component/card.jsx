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
        actions.getContacts();
    }, []);

    const handleEditClick = (contact) => {
        setEditingContactId(contact.id);
        setEditFormData(contact); 
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditFormData({ ...editFormData, [name]: value });
    };

    const handleSave = async () => {
        await actions.updateContactAPI(editingContactId, editFormData); 
        setEditingContactId(null); 
        actions.getContacts(); 
    };

    return (
        <>
            {store.contacts.length === 0 ? (
                <p>No contacts available</p>
            ) : (
                store.contacts.map((contact) => (
                    <div className="card mb-3" style={{ maxWidth: "540px" }} key={contact.id}>
                        <div className="row g-0">
                            <div className="col-md-4">
                                <img
                                    src={`https://picsum.photos/300/188?random=${contact.id}`}
                                    className="img-fluid rounded-start"
                                    alt="Contact"
                                />
                            </div>
                            <div className="col-md-8">
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
                                            <button className="btn btn-success me-2" onClick={handleSave}>
                                                Save
                                            </button>
                                            <button
                                                className="btn btn-secondary"
                                                onClick={() => setEditingContactId(null)}
                                            >
                                                Cancel
                                            </button>
                                        </>
                                    ) : (
                                        <>
                                            {/* Display Contact Details */}
                                            <h5 className="card-title">{contact.name}</h5>
                                            <p className="card-text">{contact.phone}</p>
                                            <p className="card-text">{contact.email}</p>
                                            <p className="card-text">{contact.address}</p>
                                            <button
                                                className="btn btn-primary me-2"
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
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            )}
        </>
    );
};
