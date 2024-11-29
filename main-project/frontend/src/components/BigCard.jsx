import React from "react";
import "../App.css";

//debería utilizar toda la pantalla, aun no termino de configurarla
// className=bigcard >>>>>> en el css
const BigCard = ({ title, image, children }) => {
  return (
    <div className="bigcard-container">
      <div className="row">
        <div className="col-12">
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
  );
};

export default BigCard;
