const express = require('express')
const router = express.Router()
const { addPresenca, getAllPresencas } = require('../models/presencasModel')

// POST - cadastrar nova presença
router.post('/', async (req, res) => {
  try {
    const { nome, dataNascimento, cpf, email } = req.body

    // Validações básicas
    if (!nome || !dataNascimento || !cpf || !email) {
      return res.status(400).json({ error: 'Nome, data de nascimento, CPF e e-mail são obrigatórios' })
    }

    // Aqui você pode adicionar validações adicionais (ex: formato CPF, email)

    const insertId = await addPresenca(nome, dataNascimento, cpf, email)

    res.status(201).json({
      id: insertId,
      message: `Presença registrada com sucesso! Seu número de identificação é: ${insertId}`
    })
  } catch (err) {
    console.error('Erro ao inserir presença:', err)
    res.status(500).json({ error: 'Erro ao inserir presença' })
  }
})

// GET - listar presenças
router.get('/', async (req, res) => {
  try {
    const presencas = await getAllPresencas()
    res.json(presencas)
  } catch (err) {
    console.error('Erro ao buscar presenças:', err)
    res.status(500).json({ error: 'Erro ao buscar presenças' })
  }
})

module.exports = router
