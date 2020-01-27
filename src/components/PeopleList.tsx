import React, { useState } from 'react'
import DownloadButton from './DownloadButton'
import { gql } from 'apollo-boost'
import { useQuery } from '@apollo/react-hooks';
import Person from './Person'

const PeopleList: React.SFC = () => {

    const PEOPLE_DATA = gql`
    {
        users {
            id
            displayName
            givenName
            surname
            accountEnabled
            userType
            department
        }
    }
    `

    const { loading, error, data } = useQuery(PEOPLE_DATA);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    console.log("data:")
    console.log(data)

    const actualPeople = data.users.filter((user: any) => {
        return user.givenName !== null && user.surname !== null
    })

    return (
        <>
        <DownloadButton data={actualPeople} />
        {
            actualPeople.map(({ id, displayName, department }: { id: string, displayName: string, surName: string, department: string }) => (
                <Person id={id} displayName={displayName} department={department}/>
            )
            )
        }
        </>
    )

}

export default PeopleList
