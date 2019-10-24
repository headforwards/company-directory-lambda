import React from 'react';

const WelcomeContent: React.SFC<WelcomeProps> = ({isAuthenticated, user, authButtonMethod}) => {
  // If authenticated, greet the user
  if (isAuthenticated) {
    return (
      <div>
        <h4 className="f6 fw6 ttu tracked">Welcome {user.displayName}!</h4>
        <p className="f5 lh-copy measure">Use the navigation bar at the top of the page to get started.</p>
      </div>
    );
  }

  // Not authenticated, present a sign in button
  return <div className="ph3"> <button 
  className="f6 grow no-underline br-pill ba ph3 pv2 mb2 dib white bg-dark-pink"
  color="primary" onClick={authButtonMethod}>Click here to sign in</button> </div>;
}

interface WelcomeProps {
    isAuthenticated: boolean,
    user: any,
    authButtonMethod?: React.MouseEventHandler<HTMLElement>
}

const Welcome: React.SFC<WelcomeProps> = ({isAuthenticated, user, authButtonMethod}) => {
    return (
      <section className="mt5 mw5 mw7-ns center bg-light-gray pa3 ph5-ns">
        <h1 className="f3 f2-m f1-l fw2 black-90 mv3">Company Directory GraphQL</h1>
        <p className="f5 f4-m f3-l fw2 black-50 mt0 lh-copy">
            This app uses GraphQL on Netlify and the Microsoft Graph API to access Outlook and User data.
            The People page is to view all the profile photos or employees in your organisation.
        </p>
        <WelcomeContent
          isAuthenticated={isAuthenticated}
          user={user}
          authButtonMethod={authButtonMethod} />
      </section>
    );
}

export default Welcome
