const sortUsersByDepartment = (users: any[]) => {
    return users.sort(sortFunc)
}


const sortFunc = (a: any, b: any) => {
    let deptA = a.department.toUpperCase()
    let deptB = b.department.toUpperCase()

    if (deptA < deptB) {
        return -1
    }
    if (deptB < deptA) {
        return 1
    }

    return 0

}

export default sortUsersByDepartment