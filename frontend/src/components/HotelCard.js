import React from "react";

function HotelCard() {
  return (
    <div>
      <div className="card" >
        <img src="https://images.moneycontrol.com/static-mcnews/2021/04/Roof-top-pool-2-taj-goa.jpg?impolicy=website&width=1600&height=900" className="cardImg card-img-top p-3" alt="..." />
        <div className="card-body">
          <h5 className="card-title">Taj Resort & Convention Centre, Goa</h5>
          <p className="card-text">
            Some quick example text to build on the card title and make up the bulk of the card's
            content.
          </p>
        </div>
      </div>
    </div>
  );
}

export default HotelCard;
