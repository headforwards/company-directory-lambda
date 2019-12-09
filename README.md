Work in progress : https://thirsty-hugle-7f3bff.netlify.com/

This is an application to retrieve information about people from a company's Azure Active Directory, displaying a list of users with a nice big picture to make it easy to work out who people around the office are.

Future plans include adding information about people's team, interests, skills, what they are interested in learning or training in.

This is based on a fork of https://github.com/netlify/create-react-app-lambda that uses Typescript both on the clientside and on the lambdas. It's deployed on Netlify

The lambda function running on Netlify functions provides an Apollo Server which allows the front end react app to query for the data it needs using graphQL.

Data currently pulled out of the Microsoft Graph API and will likely be augmented with additional data from some sort of database, probably PostgreSQL.


