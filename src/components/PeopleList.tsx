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

        <section className="tc pa1 pa2-ns">
            <article className="hide-child relative ba b--black-20 mw5 center">
                <Avatar userId={id} displayName={displayName} />
                <div className="pa2 bt b--black-20">
                    <a className="f6 db link dark-blue hover-blue" href="#">{displayName}</a>
                </div>
            </article>
        </section>

    ));
}

export default PeopleList