import React from 'react';
import { useMutation} from '@apollo/client';
import { REMOVE_HARVARD_IMG } from '../utils/mutations';
//import { Link } from 'react-router-dom';

//returns all the comments for a post
const InspirationList = ( {inspirations} ) => {

  const [removeHarvardImg, {error}] = useMutation(REMOVE_HARVARD_IMG);

  const handleRemoveImg = async (inspirationId) => {
    try {
      const {data} = await removeHarvardImg({
        variables: {inspirationId}
      });
    } catch (err) {
      console.log(err);
    }
  }

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
                  <img src={inspiration.imageUrl} width={250} height={250}></img>
                  <p>Medium: {inspiration.medium}</p>
                  <p>Culture: {inspiration.culture}</p>
                  <p>Credit: {inspiration.creditline}</p>
                  <button onClick={ () => handleRemoveImg(inspiration._id)}> Remove </button>
              </div>
            ))}
        </div>

    </div>
  );
};

export default InspirationList;