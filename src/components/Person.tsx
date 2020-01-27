import React from 'react'
import Avatar from './Avatar'

interface PersonProps {
    id: string
    displayName: string
    department: string
}

const Person: React.SFC<PersonProps> = ({ id, displayName, department }) => {

    return (
        <div className="fl w-50 w-25-m w-20-l pa2">
            <article className="hide-child relative ba b--black-20 mw5 center">
                <Avatar userId={id} displayName={displayName} />
                <p>Department: {department}</p>
                <div className="pa2 bt b--black-20">
                    <a className="f6 db link dark-blue hover-blue" href="#">{displayName}</a>
                </div>
            </article>
        </div>
    )

}

export default Person