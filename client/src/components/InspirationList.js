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
        <div className="create-harvard-header">
            <span className="viewpro">Inspirational Board</span>
        </div>

        <div className="grid-cols-3">
            {inspirations &&
              inspirations.map(inspiration => (
              <div className=''>
                  <h3 className='create-harvard-header'>{inspiration.title}</h3>
                  <img className="create-harvard-content"src={inspiration.imageUrl} width={250} height={250}></img>
                  <p className='text-style'>Medium: {inspiration.medium}</p>
                  <p className='text-style'>Culture: {inspiration.culture}</p>
                  <p className='text-style'>Credit: {inspiration.creditline}</p>
                  <div align="center">
                  <button align="center" className="harvard-btn " onClick={ () => handleRemoveImg(inspiration._id)}> Remove </button>
                  </div>
              </div>
            ))}
        </div>

    </div>
  );
};

export default InspirationList;