import React from 'react';
import Departments from '../components/Departments';

const People: React.SFC = () => {

    return (
        <article>
            <h1 className="f3 fw4 pa3 mv0">People</h1>
            <div className="cf pa2">
                <Departments />
            </div>
        </article>
    );
}

export default People
