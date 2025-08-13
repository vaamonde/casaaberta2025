// backend/index.js
require('dotenv').config()
const express = require('express')
const cors = require('cors')
const db = require('./config/db')

const app = express()
const port = process.env.PORT || 3000

app.use(cors())
app.use(express.json())

// Rota raiz
app.get('/', (req, res) => {
  res.send('Casa Aberta Senac - Backend rodando')
})

/* ===== ROTA: REGISTRO DE PRESENÇAS ===== */
app.post('/presencas', async (req, res, next) => {
  const { nome, dataNascimento, cpf, email } = req.body

  if (!nome || !dataNascimento || !cpf || !email) {
    return res.status(400).json({ error: 'Todos os campos são obrigatórios' })
  }

  try {
    const [result] = await db.query(
      'INSERT INTO presencas (nome, data_nascimento, cpf, email) VALUES (?, ?, ?, ?)',
      [nome, dataNascimento, cpf, email]
    )
    res.status(201).json({ id: result.insertId, mensagem: 'Presença registrada com sucesso' })
  } catch (error) {
    console.error('Erro ao inserir presença:', error)
    next(error)
  }
})

/* ===== ROTA: ENVIO DE FEEDBACK ===== */
app.post('/feedbacks', async (req, res, next) => {
  const { nome, estrelas, comentario } = req.body

  if (!estrelas || estrelas < 1 || estrelas > 5) {
    return res.status(400).json({ error: 'Número de estrelas inválido (1 a 5)' })
  }

  try {
    const [result] = await db.query(
      'INSERT INTO feedbacks (nome, estrelas, comentario) VALUES (?, ?, ?)',
      [nome || 'Anônimo', estrelas, comentario || '']
    )
    res.status(201).json({ id: result.insertId, mensagem: 'Feedback enviado com sucesso' })
  } catch (error) {
    console.error('Erro ao inserir feedback:', error)
    next(error)
  }
})

/* ===== ROTA: LISTAR TODOS OS FEEDBACKS ===== */
app.get('/feedbacks', async (req, res, next) => {
  try {
    const [feedbacks] = await db.query(
      'SELECT id, nome, estrelas, comentario, data_hora FROM feedbacks ORDER BY data_hora DESC'
    )
    res.json(feedbacks)
  } catch (error) {
    console.error('Erro ao buscar feedbacks:', error)
    next(error)
  }
})

/* ===== ROTAS DE ERRO ===== */
app.use((req, res) => {
  res.status(404).json({ error: 'Rota não encontrada' })
})

app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ error: 'Erro interno no servidor' })
})

/* ===== INÍCIO DO SERVIDOR ===== */
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`)
})
