import React from 'react';
import PeopleList from '../components/PeopleList';

const People: React.SFC = () => {

    return (
        <article>
            <h1 className="f3 fw4 pa3 mv0">People</h1>
            <div className="cf pa2">
                <PeopleList />
            </div>
        </article>
    );
}

export default People
