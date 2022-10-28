const jwt = require('jsonwebtoken')

// 1 day
const maxAge = 1 * 24 * 60 * 60 

const createToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: maxAge })
}


module.exports.signup = async (req, res) => {
    const { id, username, password } = req.body

    try {
        const employee = { id, username, password }
        const token = createToken(employee.id)

        res.cookie('jwt', token, {httpOnly: true, maxAge: maxAge * 1000})
        res.status(201).json(employee)
    } catch(err) {
        res.status(400).json({message: err.message})
    }
}

module.exports.login = async (req, res) => {
    const { id, username, password } = req.body

    try {
        const employee = { id, username, password }
        const token = createToken(employee.id)
    
        res.cookie('jwt', token, {httpOnly: true, maxAge: maxAge * 1000})
        res.status(201).json(employee)
    } catch(err) {
        res.status(400).json({message: err.message})
    }
}