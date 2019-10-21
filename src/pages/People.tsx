import React from 'react';
import { AuthResponse } from 'msal'
import PeopleList from '../components/PeopleList';

interface PeopleProps {
    accessToken: AuthResponse | null
}

const People: React.SFC<PeopleProps>= ({ accessToken }) => {

    return (
        <div>
            <h1>People</h1>
                    <PeopleList accessToken={accessToken} />
        </div>
    );
}

export default People