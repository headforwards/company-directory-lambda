import { groupUsersByDept, getDeptsFromUsers, getUsersForDept } from '../users/groupUsersByDept'
import userType from './usertype'

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
            id: '1',
            displayName: 'Jeff Bob',
            givenName: 'Jeff',
            surname: 'Bob',
            department: 'Department 01',
            userType: 'Member',
            accountEnabled: true
        },
        {
            id: '4',
            displayName: 'Jeffrey Bobbery',
            givenName: 'Jeffrey',
            surname: 'Bobbery',
            department: 'Department 01',
            userType: 'Member',
            accountEnabled: true
        },
    ])
})

test('groups all users by department', () => {
    expect(groupUsersByDept(manyUsersAcrossDepts)).toEqual(
        [
            {
                departmentName: 'Department 01',
                users: [
                    {
                        id: '1',
                        displayName: 'Jeff Bob',
                        givenName: 'Jeff',
                        surname: 'Bob',
                        department: 'Department 01',
                        userType: 'Member',
                        accountEnabled: true
                    },
                    {
                        id: '4',
                        displayName: 'Jeffrey Bobbery',
                        givenName: 'Jeffrey',
                        surname: 'Bobbery',
                        department: 'Department 01',
                        userType: 'Member',
                        accountEnabled: true
                    },
                ]
            },
            {
                departmentName: 'Department 02',
                users: [
                    {
                        id: '2',
                        displayName: 'Mister Flibble',
                        givenName: 'Mister',
                        surname: 'Flibble',
                        department: 'Department 02',
                        userType: 'Member',
                        accountEnabled: true
                    },
                    {
                        id: '3',
                        displayName: 'Captain underpants',
                        givenName: 'Captain',
                        surname: 'Underpants',
                        department: 'Department 02',
                        userType: 'Member',
                        accountEnabled: true
                    }
                ]
            },
            {
                departmentName: 'Department 05',
                users: [
                    {
                        id: '5',
                        displayName: 'Jeff Bob',
                        givenName: 'Jeff',
                        surname: 'Bob',
                        department: 'Department 05',
                        userType: 'Member',
                        accountEnabled: true
                    },
                ]
            }
        ]
    )
})

// ******* Data ********

const soleUser: userType[] =
    [
        {
            id: '1',
            givenName: 'Jeff',
            surname: 'Bob',
            displayName: 'Jeff Bob',
            department: 'Department 01',
            userType: 'Member',
            accountEnabled: true
        }
    ]

const manyUsersAcrossDepts: userType[] =
    [
        {
            id: '1',
            displayName: 'Jeff Bob',
            givenName: 'Jeff',
            surname: 'Bob',
            department: 'Department 01',
            userType: 'Member',
            accountEnabled: true
        },
        {
            id: '2',
            displayName: 'Mister Flibble',
            givenName: 'Mister',
            surname: 'Flibble',
            department: 'Department 02',
            userType: 'Member',
            accountEnabled: true
        },
        {
            id: '3',
            displayName: 'Captain underpants',
            givenName: 'Captain',
            surname: 'Underpants',
            department: 'Department 02',
            userType: 'Member',
            accountEnabled: true
        },
        {
            id: '4',
            displayName: 'Jeffrey Bobbery',
            givenName: 'Jeffrey',
            surname: 'Bobbery',
            department: 'Department 01',
            userType: 'Member',
            accountEnabled: true
        },
        {
            id: '5',
            displayName: 'Jeff Bob',
            givenName: 'Jeff',
            surname: 'Bob',
            department: 'Department 05',
            userType: 'Member',
            accountEnabled: true
        },
    ]