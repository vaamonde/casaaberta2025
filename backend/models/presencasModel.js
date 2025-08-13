// backend/models/presencasModel.js
const db = require('../config/db')

const getAllPresencas = async () => {
  const [rows] = await db.query('SELECT * FROM presencas ORDER BY data_hora DESC')
  return rows
}

const addPresenca = async (nome, dataNascimento, cpf, email) => {
  const [result] = await db.query(
    'INSERT INTO presencas (nome, data_nascimento, cpf, email) VALUES (?, ?, ?, ?)',
    [nome, dataNascimento, cpf, email]
  )
  return result.insertId
}

module.exports = {
  getAllPresencas,
  addPresenca
}
