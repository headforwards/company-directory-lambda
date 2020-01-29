import userType from './usertype'
import departmentType from './departmentType'

const groupUsersByDept = (userArray: userType[]): departmentType[] => {
    const departmentNames: string[] = getDeptsFromUsers(userArray)

    let usersByDepts: departmentType[] = []
    
    departmentNames.forEach(name => {
        usersByDepts.push({
            departmentName: name,
            users : getUsersForDept(name, userArray)
        })
    })
    return usersByDepts
}

const getDeptsFromUsers = (users: userType[]): string[]=> {
    let depts: string[] = []
    users.forEach(user => {
        if (!user.department) { user.department = "Un-named Department"}
        if ( depts.indexOf(user.department) === -1 ) {
            depts.push(user.department)
        }
    })
    return depts
}

const getUsersForDept = (dept: string, users: userType[]): userType[] => {
    return users.filter(user => {
        return user.department === dept
    })
}

export {groupUsersByDept, getDeptsFromUsers, getUsersForDept}