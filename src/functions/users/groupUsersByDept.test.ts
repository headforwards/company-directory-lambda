import { groupUsersByDept, getDeptsFromUsers, getUsersForDept } from '../users/groupUsersByDept'

test('returns an array', () => {
    expect(Array.isArray(groupUsersByDept(soleUser))).toBe(true)
})

test('generates a list of departments', () => {
    expect(getDeptsFromUsers(manyUsersAcrossDepts)).toEqual(
        ["Department 01",
        "Department 02",
        "Department 05"]
    )
})

test('Gets a list of users in a department', () => {
    expect(getUsersForDept('Department 01', manyUsersAcrossDepts)).toHaveLength(2)
    expect(getUsersForDept('Department 02', manyUsersAcrossDepts)).toHaveLength(2)
    expect(getUsersForDept('Department 05', manyUsersAcrossDepts)).toHaveLength(1)
    expect(getUsersForDept(`Department Doesn't exist`, manyUsersAcrossDepts)).toHaveLength(0)
})

test('Gets the right users for a dept', () => {
    expect(getUsersForDept(`Department 01`, manyUsersAcrossDepts)).toEqual([
        {
            givenName: 'Jeff',
            surname: 'Bob',
            department: 'Department 01'
        },
        {
            givenName: 'Jeffrey',
            surname: 'Bobbery',
            department: 'Department 01'
        }
    ])
})

// ******* Data ********

const soleUser: any =
    [
        {
            givenName: 'Jeff',
            surname: 'Bob',
            department: 'Department 01'
        }
    ]

const manyUsersAcrossDepts: any =
    [
        {
            givenName: 'Jeff',
            surname: 'Bob',
            department: 'Department 01'
        },
        {
            givenName: 'Mister',
            surname: 'Flibble',
            department: 'Department 02'
        },
        {
            givenName: 'Captain',
            surname: 'Underpants',
            department: 'Department 02'
        },
        {
            givenName: 'Jeffrey',
            surname: 'Bobbery',
            department: 'Department 01'
        },
        {
            givenName: 'Jeff',
            surname: 'Bob',
            department: 'Department 05'
        },
    ]