import React from "react";
import { Link } from "react-router-dom";
import "./Category.css";
import { useStateValue } from "../../../StateProvider";

const Category = ({ show }) => {
  const [{ awards }, _] = useStateValue();

  const ConditionalLink = ({ children, to, condition, secTo }) =>{
    return condition && to ? (
      <Link to={to}>{children}</Link>
    ) : (
      <Link to={secTo}>{children}</Link>
    );
  }

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
            <h3 style={{lineHeight:'1.2'}}>{ award.title.slice(0,award.title.indexOf('2020-21')-1)}<br/><span style={{fontWeight:'normal'}} class="year_heading">2020-21</span></h3>
            {show && (
              <div>
                {award.awards.map((a) => (
                  <p key={a._id} style={{lineHeight:'1.25'}}>{a.heading}</p>
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
