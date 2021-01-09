import React from "react";
import { Link } from "react-router-dom";
import "./Category.css";
import { useStateValue } from "../../../StateProvider";

const Category = ({ show }) => {
  const [{ awards }, _] = useStateValue();

  const ConditionalLink = ({ children, to, condition, secTo }) =>
    condition && to ? (
      <Link to={to}>{children}</Link>
    ) : (
      <Link to={secTo}>{children}</Link>
    );

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
          secTo={`/vote/${award.awards[0]._id}`}
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
