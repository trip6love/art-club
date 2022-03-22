
//import { searchArtMuseum } from '../utils/apiRoutes';
import React, { useState, useEffect } from 'react';

const HarvardArt = () => {
    //create state for holding return google api data
    const [ loading, setLoading] = useState(true);
    const [ items, setItems] = useState([]);
    //retrieves the api url and stores the json data into setItems.
    useEffect( async () => {
        try {
            const response = await fetch("https://api.harvardartmuseums.org/object?classification=21&size=100&apikey=d5fa0071-2bef-4273-9a6c-c6fad3b41af9");
    
            if(!response){
                throw new Error('Something is wrong');
            }
            const data = await response.json();
            console.log(data);

            const artData = data.records.map((record) => ({
                id: record.id,
                creditline: record.creditline,
                imageCount: record.imagecount,
                imageurl: record.primaryimageurl,
                culture: record.culture,
                medium: record.medium,
                title: record.title,
            }));

            setItems(artData);
            setLoading(false);
        } catch (err) {
            console.error(err);
        }
    },[])

    //if user wants to save the image to their inspirational board
    const handleSaveImg = async (image) => {

    }

    return (
        <div>
            {!loading && 
            items.map(record => (
                <div>
                    {record.imageurl ? (
                        <div>
                            <h3>{record.title}</h3>
                            <img src={record.imageurl} width={250} height={250}></img>
                            <p>Medium: {record.medium}</p>
                            <p>Culture: {record.culture}</p>
                            <p>Credit: {record.creditline}</p>
                        </div>
                    ) : null}
                </div>
            ))}
        </div>
    );
};

export default HarvardArt;