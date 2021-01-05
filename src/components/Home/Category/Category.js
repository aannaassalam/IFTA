import React from "react";
import { Link } from "react-router-dom";
import "./Category.css";

const Category = ({ show, awards }) => {
  const ConditionalLink = ({ children, to, condition }) =>
    condition && to ? <Link to={to}>{children}</Link> : <>{children}</>;
  return (
    <div className="category">
      {awards?.map((award, index) => (
        <ConditionalLink
          to={{
            pathname: "/voting",
            state: {
              navId: award._id,
            },
          }}
          condition={show}
          key={award._id}
        >
          <div className={`category-${index + 1}`}>
            <h3>{award.title}</h3>
            {show && (
              <div>
                {award.awards.map((a) => (
                  <p key={a._id}>{a.heading}</p>
                ))}
              </div>
            )}
            {show && <button>Vote</button>}
          </div>
        </ConditionalLink>
      ))}
    </div>
  );
};

export default Category;
