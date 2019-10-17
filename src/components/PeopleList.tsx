import React, { useState } from 'react'
import { gql } from 'apollo-boost'
import { useQuery } from '@apollo/react-hooks';

const PeopleList: React.SFC = () => {

    const PEOPLE_DATA = gql`
    {
        users {
            id
            displayName
        }
        # user(id:"d3311c74-2095-4576-b793-b4bcce275078") {
        #     id 
        #     displayName
        # }
    }
    `

    const { loading, error, data } = useQuery(PEOPLE_DATA);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    console.log("data:")
    console.log(data)

    return data.users.map(({ id, displayName }: {id: string, displayName:string}) => (
        <div key={id}>
            <p>
                {displayName}
            </p>
        </div>
    ));
}

export default PeopleList