import sortUsersByDepartment from './sortUsersByDepartment'

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


test('It returns a list', () => {
    expect(sortUsersByDepartment(users)).toHaveLength(2)
})

test('It sorts the users by department name alphabetically', () => {
    expect(sortUsersByDepartment(users)).toEqual(sortedUsers)
})
