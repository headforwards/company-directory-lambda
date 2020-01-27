import sortUsersByDepartment from './sortUsersByDepartment'

test('It returns a list', () => {
    expect(sortUsersByDepartment(users)).toHaveLength(2)
})

test('It sorts the users by department name alphabetically', () => {
    expect(sortUsersByDepartment(users)).toEqual(sortedUsers)
})

test('It puts users with no dept last', () => {
    expect(sortUsersByDepartment(usersWithNulls)).toEqual(nullsAtEnd)
})


const users = [
    {
        givenName: 'firstname',
        surname: 'lastname',
        department: 'NTT'
    }
    ,
    {
        givenName: 'firstname',
        surname: 'lastname',
        department: 'Axa'
    }
]

const sortedUsers = [
    {
        givenName: 'firstname',
        surname: 'lastname',
        department: 'Axa'
    },
    {
        givenName: 'firstname',
        surname: 'lastname',
        department: 'NTT'
    }
]

const usersWithNulls = [
    {
        givenName: 'Jeff',
        surname: 'Bob',
        department: null
    },
    {
        givenName: 'firstname',
        surname: 'lastname',
        department: 'NTT'
    },
    {
        givenName: 'firstname',
        surname: 'lastname',
        department: 'Axa'
    }
]

const nullsAtEnd = [
    {
        givenName: 'firstname',
        surname: 'lastname',
        department: 'Axa'
    },
    {
        givenName: 'firstname',
        surname: 'lastname',
        department: 'NTT'
    },
    {
        givenName: 'Jeff',
        surname: 'Bob',
        department: null
    }
]
