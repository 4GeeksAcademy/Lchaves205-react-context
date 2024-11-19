import React from "react";
import "../../styles/home.css";

export const Create = () => {
    return (
        <div className="text-center mt-5 container">
            <form>
                <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">Full Name</label>
                    <input type="email" class="form-control" id="examplename" aria-describedby="emailHelp" />
                </div>

                <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">Email address</label>
                    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                </div>

                <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">Phone</label>
                    <input type="email" class="form-control" id="examplephone" aria-describedby="emailHelp" />
                </div>

                <div class="mb-3">
                    <label for="exampleInputPassword1" class="form-label">Address</label>
                    <input type="password" class="form-control" id="exampleaddress" />
                </div>

                <button type="submit" class="btn btn-primary">Submit</button>
            </form>
        </div>
    )
};
