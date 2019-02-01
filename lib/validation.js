const emailValidation = email => {
    email ? email = email.trim() : email
    const pattern =/^(\w+)@([a-z]{2,})\.([a-z]{2,5})$/i;
    if (!email) return {type: 'error', field: "email",  message:'Email Required'}
    else if (!pattern.test(email)) return {type: 'error', field: "email", message:'Invalid Email Address'}
    else return { type: 'success', field: "email", message: 'Valid email'}
}

const passwordValidation = password => {
    const pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,30}$/
    if (!password) return { type: "error",field: "password", message: "Password Required" }
    else if (pattern.length < 7) return { type: "error", field: "password", message: "password is short"}
    else if (!pattern.test(password)) return { type: "error", field: "password", message: "invalid password" }
    else return {type: "success", field: "password", message: "Valid password"}
}

const nameValidation = (name, field = "name") => {
    name ? name = name.trim() : name
    if (!name) return { type: "error", field, message: "name Required" }
    else return { type: "success", field, message:  "Valid name"} 
}


module.exports = {
    emailValidation,
    passwordValidation,
    nameValidation,
}