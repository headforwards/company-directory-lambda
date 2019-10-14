import React, { useState } from 'react'
import ApolloClient, { gql } from 'apollo-boost'
import config from '../Config';
import { render } from 'react-dom';
import { useQuery } from '@apollo/react-hooks';


const PeopleList: React.SFC = () => {

    const PEOPLE_DATA = gql`
    {
        users {
            displayName
        }
    }
    `

    const { loading, error, data } = useQuery(PEOPLE_DATA);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    console.log("data:")
    console.log(data)

    // return data.rates.map(({  }) => (
    //     // <div key={currency}>
    //     //     <p>
    //     //         {currency}: {rate}
    //     //     </p>
    //     // </div>
    // ));
    return (
        <p>I Like Jam</p>
    )

}

export default PeopleList