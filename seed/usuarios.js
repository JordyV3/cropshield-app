import bcrypt from 'bcrypt'

const usuarios = [
    {
        nombre: 'Jordy',
        email: 'jordyvega15@gmail.com',
        confirmado: 1,
        password: bcrypt.hashSync('vega2023', 10)
    }
]

export default usuarios