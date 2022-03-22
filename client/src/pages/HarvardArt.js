
//import { searchArtMuseum } from '../utils/apiRoutes';
import React, { useState, useEffect } from 'react';
import Auth from '../utils/auth';
import { useQuery, useMutation } from '@apollo/client';
import {SAVE_HARVARD_IMG} from '../utils/mutations';

import { Link } from 'react-router-dom';

const HarvardArt = () => {
    const [saveHarvardImg, {error}] = useMutation(SAVE_HARVARD_IMG);

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
                imageUrl: record.primaryimageurl,
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
    const handleSaveImg = async (id) => {

        //find img in items state by matching the id
        const imgToSave = items.find(records => records.id === id);
        console.log(imgToSave);

        //get token
        const token = Auth.loggedIn() ? Auth.getToken() : null;

        if(!token) {
            return false;
        }

        try {
            const {data} = await saveHarvardImg({
                variables: {input: imgToSave}
            });
        } catch (err){
            console.error(err);
        }
    };

    return (
        <div>
            {!loading && 
            items.map(record => (
                <div>
                    {record.imageUrl ? (
                        <div>
                            <h3>{record.title}</h3>
                            <img src={record.imageUrl} width={250} height={250}></img>
                            <p>Medium: {record.medium}</p>
                            <p>Culture: {record.culture}</p>
                            <p>Credit: {record.creditline}</p>
                            <Link onClick={ () => handleSaveImg(record.id)}> Save Image </Link>
                        </div>
                    ) : null}
                </div>
            ))}
        </div>
    );
};

export default HarvardArt;