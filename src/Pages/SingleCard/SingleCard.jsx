import React from "react";
import { Link } from "react-router-dom";

const SingleCard = ({ singleData }) => {
  const { id, duration, fullDescription, img, miniDesc, ratings, title } =
    singleData;
  return (
    <div className="card pt-4 w-96 shadow-xl border border-base-200">
      <figure>
        <img src={img} alt={title} />
      </figure>
      <div className="card-body">
        <h2 className="card-title capitalize">{title}</h2>
        <p>{miniDesc}</p>
        <Link to={`/courseDetails/${id}`} className="btn btn-primary">
          Details
        </Link>
      </div>
    </div>
  );
};

export default SingleCard;
