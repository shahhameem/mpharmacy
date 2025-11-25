import { Link } from "react-router-dom";

const CategoryCard = ({ img, title, text, link }) => {
  return (
    <div className="col-md-6 col-lg-3">
      <div className="card h-100 text-center aero-card">
        <img
          src={img}
          className="card-img-top"
          alt="drugs"
        />
        <Link to={link}>
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{text}</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default CategoryCard;