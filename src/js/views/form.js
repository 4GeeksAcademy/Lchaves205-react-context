import React, { useState, useContext } from "react";
import { Context } from "../store/appContext"; 
import { Link } from "react-router-dom";
import "../../styles/home.css";

export const Create = () => {
    const { actions } = useContext(Context);  
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        address: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newContact = {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            address: formData.address,
        };

        actions.createContact(newContact);

        setFormData({
            name: "",
            email: "",
            phone: "",
            address: "",
        });
    };

    return (
        <div className="text-center mt-5 container">
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="examplename" className="form-label">Full Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="examplename"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input
                        type="email"
                        className="form-control"
                        id="exampleInputEmail1"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="examplephone" className="form-label">Phone</label>
                    <input
                        type="phone"
                        className="form-control"
                        id="examplephone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="exampleaddress" className="form-label">Address</label>
                    <input
                        type="text"
                        className="form-control"
                        id="exampleaddress"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                    />
                </div>

                <div className="d-flex justify-content-between">
                    {/* Submit Button */}
                    <button type="submit" className="btn btn-primary">Submit</button>

                    {/* Back to Home Button */}
                    <Link to="/">
                        <button type="button" className="btn btn-secondary">Back to Home</button>
                    </Link>
                </div>
            </form>
        </div>
    );
};
