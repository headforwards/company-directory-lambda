import React from 'react'
import UserAvatar from './UserAvatar'



interface AuthNavItemProps {
    isAuthenticated: boolean
    user: any,
    authButtonMethod?: React.MouseEventHandler<HTMLElement>
}

const AuthNavItem: React.SFC<AuthNavItemProps> = ({ isAuthenticated, user, authButtonMethod }) => {
    // If authenticated, return a dropdown with the user's info and a
    // sign out button
    if (isAuthenticated) {
        return (
            <div className="tr">
            <UserAvatar user={user} />
            <h5 className="dropdown-item-text mb-0">{user.displayName}</h5>
            </ div>
        );
    }

    // Not authenticated, return a sign in link
    return (
        <a onClick={authButtonMethod}>Sign In</a>
    );
}

export default AuthNavItem