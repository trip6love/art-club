
//import { searchArtMuseum } from '../utils/apiRoutes';
import React, { useState, useEffect } from 'react';

const HarvardArt = () => {
    //create state for holding return google api data
    const [ loading, setLoading] = useState(true);
    const [ items, setItems] = useState();

    useEffect( async () => {
        try {
            //const response = await searchArtMuseum();
    
            const response = await fetch("https://api.harvardartmuseums.org/image?apikey=d5fa0071-2bef-4273-9a6c-c6fad3b41af9");
    
            if(!response){
                throw new Error('Something is wrong');
            }
    
            setItems( await response.json());
            setLoading(false);
        } catch (err) {
            console.error(err);
        }
    },[])


    return (
        <>
            {!loading && (
                console.log(items.records)
            )}
            <p> API info here</p>
        </>
    )

};

export default HarvardArt;