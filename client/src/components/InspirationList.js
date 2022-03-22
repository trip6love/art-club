import React from 'react';
//import { Link } from 'react-router-dom';

//returns all the comments for a post
const InspirationList = ({ inspirations }) => {
  return (
    <div className="card mb-3">
        <div className="card-header">
            <span className="text-light">Inspirational Board</span>
        </div>

        <div className="card-body">
            {inspirations &&
            inspirations.map(inspiration => (
              <div>
                  <h3>{inspiration.title}</h3>
                  <img src={inspiration.imageurl} width={250} height={250}></img>
                  <p>Medium: {inspiration.medium}</p>
                  <p>Culture: {inspiration.culture}</p>
                  <p>Credit: {inspiration.creditline}</p>
              </div>
            ))}
        </div>

    </div>
  );
};

export default InspirationList;