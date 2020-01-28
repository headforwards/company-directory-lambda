const groupUsersByDept = (userArray: any[]) => {
    let departments: any[] = []
    userArray.forEach(user => {
        departments.push(
            { 
                departmentName: user.department,
                users: user
            }
            )
    })
    return departments
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