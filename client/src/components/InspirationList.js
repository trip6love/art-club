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

        <div className="grid-cols-3">
            {inspirations &&
              inspirations.map(inspiration => (
              <div className='bg-teal-100 rounded-md p-6 m-0'>
                  <h3 className='text-left'>{inspiration.title}</h3>
                  <img src={inspiration.imageUrl} width={250} height={250}></img>
                  <p className='text-left'>Medium: {inspiration.medium}</p>
                  <p className='text-left'>Culture: {inspiration.culture}</p>
                  <p className='text-left'>Credit: {inspiration.creditline}</p>
                  <button onClick={ () => handleRemoveImg(inspiration._id)}> Remove </button>
              </div>
            ))}
        </div>

    </div>
  );
};

export default InspirationList;