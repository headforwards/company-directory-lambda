const groupUsersByDept = (userArray: any[]) => {
    const departmentNames: any[] = getDeptsFromUsers(userArray)

    let usersByDepts: any[] = []
    
    departmentNames.forEach(name => {
        usersByDepts.push({
            departmentName: name,
            users : getUsersForDept(name, userArray)
        })
    })

    return usersByDepts
}

const getDeptsFromUsers = (users: any[]) => {
    let depts: string[] = []
    users.forEach(user => {
        if ( depts.indexOf(user.department) === -1 ) {
            depts.push(user.department)
        }
    })
    return depts
}

const getUsersForDept = (dept: string, users: any[]) => {
    return users.filter(user => {
        return user.department === dept
    })
}

export {groupUsersByDept, getDeptsFromUsers, getUsersForDept}