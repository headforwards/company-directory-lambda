import React from 'react'
import Person from './Person'
import userType from '../functions/users/usertype'

interface PeopleListProps {
    people: userType[]
}

const PeopleList: React.SFC<PeopleListProps> = ({ people }) => {

    return (
        <div>
            {
                people.map(person => (
                    <Person key={person.id} id={person.id} displayName={person.displayName} department={person.department} />

                ))
            }
        </div>
    )

}

export default PeopleList