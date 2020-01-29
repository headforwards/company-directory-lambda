import React, { useState } from 'react'
import DownloadButton from './DownloadButton'
import { gql } from 'apollo-boost'
import { useQuery } from '@apollo/react-hooks';
import Person from './Person'
import isActualPerson from '../functions/users/filterUsers'
import sortUsersByDepartment from '../functions/users/sortUsersByDepartment'
import { groupUsersByDept } from '../functions/users/groupUsersByDept'
import departmentType from '../functions/users/departmentType';
import userType from '../functions/users/usertype';
import PeopleList from './PeopleList';

const Departments: React.SFC = () => {

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
        return isActualPerson(user)
    })

    const groupedUsers: departmentType[] = groupUsersByDept(actualPeople)
    const sortedPeople = sortUsersByDepartment(actualPeople)

    return (
        <>
            <DownloadButton data={sortedPeople} />
            {
                groupedUsers.map(({ departmentName, users }: { departmentName: string, users: userType[] }) => (
                    <div>
                        <h2>{departmentName}</h2>
                        <PeopleList people={users} key={departmentName} />
                    </div>
                )
                )
            }
        </>
    )
}

export default Departments
