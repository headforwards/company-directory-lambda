import isActualPerson from './filterUsers'

const noName = {'givenName' : null, 
'surname': null
}
const firstName = {
    givenName: 'Firstname',
    surname: null
}

const surName = {
    givenName : null,
    surname: 'Lastname'
}

const fullName = {
    givenName: 'Firstname',
    surname: 'Lastname'
}
test('Fails for object with no names', () => {
    expect(isActualPerson(noName)).toBe(false)
})
test('Fails with no firstname', () => {
    expect(isActualPerson(surName)).toBe(false)
})
test('Fails with no surname', () => {
    expect(isActualPerson(firstName)).toBe(false)
})
test('Passes for object with full name', () => {
    expect(isActualPerson(fullName)).toBe(true)
})
