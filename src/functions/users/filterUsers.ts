const isActualPerson = (user: any) => {
    return (user.givenName !== null && user.surname !== null)
}

export default isActualPerson