
import { searchArtMuseum } from '../utils/apiRoutes';
import React from 'react';

const museumAPI = () => {
    searchArtMuseum();
    return (
        <>
            <p> API info here</p>
        </>
    )

};

export default museumAPI;