const { nameValidation, emailValidation, passwordValidation } = require('../lib/validation')

const registerFormValidation = ({ email, password, firstName, lastName }) => {
    const arr = [
        emailValidation(email),
        passwordValidation(password),
        nameValidation(firstName, "firstName"),
        nameValidation(lastName, "lastName")
    ].filter(elem => elem.type === "error" )
    return arr
}

module.exports = {
    registerFormValidation
}