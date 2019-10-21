import React, { useState } from 'react'

import { gql } from 'apollo-boost'
import { useQuery } from '@apollo/react-hooks';
import Avatar from './Avatar';

const PeopleList: React.SFC = () => {

    const PEOPLE_DATA = gql`
    {
        users {
            id
            displayName
        }
    }
    `

    const { loading, error, data } = useQuery(PEOPLE_DATA);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    console.log("data:")
    console.log(data)

    return data.users.map(({ id, displayName }: { id: string, displayName: string }) => (
        <div key={id}>
            <p>
                {displayName}
                <Avatar userId={id} />
            </p>
        </div>
    ));
}

export default PeopleList