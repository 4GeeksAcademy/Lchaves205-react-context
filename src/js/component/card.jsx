import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";

export const Card = () => {
    const { store, actions } = useContext(Context);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        console.log("Fetching contacts...");
        actions.getContacts();
    }, []);

    console.log("Contacts in store:", store.contacts);

    return (
        <>
            {store.contacts.length === 0 ? (
                <p>No contacts available</p>
            ) : (
                store.contacts.map((item, index) => (
                    <div className="card mb-3" style={{ maxWidth: "540px" }} key={index}>
                        <div className="row g-0">
                            <div className="col-md-4">
                                <img
                                    src={`https://picsum.photos/300/188?random=${index + 1}`}
                                    className="img-fluid rounded-start"
                                    style={{ width: "100%", objectFit: "cover" }}
                                    alt="Contacto"
                                />
                            </div>
                            <div className="col-md-8">
                                <div className="card-body">
                                    <h5 className="card-title">{item.name}</h5>
                                    <h5 className="card-title">{item.phone}</h5>
                                    <h5 className="card-title">{item.email}</h5>
                                    <h5 className="card-title">{item.address}</h5>
                                </div>
                            </div>
                        </div>
                        <div className="d-grid gap-2 d-md-block">
                            <button className="btn btn-primary" type="button">Edit</button>
                            {/* Delete Button */}
                            <button 
                                className="btn btn-danger" 
                                onClick={() => actions.deleteContact(item.id)} 
                                type="button">
                                Delete
                            </button>
                        </div>
                    </div>
                ))
            )}
        </>
    );
};
