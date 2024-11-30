import React from "react";
import "../App.css";

const Card = ({ title, image, children }) => {
  return (
    <div className="card-container">
      <div className="container-fluid">
        <div className="col-md-9 col-lg-10 p-4">
          <div className="col-md-6">
            <div className="card mb-4">
              <div className="card-header d-flex justify-content-between align-items-center">
                <span>{title}</span>
              </div>
              <div className="card-body">
                {children}
                {image && (
                  <img src={image} alt="Card image" className="card-body img" />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
