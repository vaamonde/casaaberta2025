// feedback.js

// Usa API_BASE_URL definida no arquivo config.js
const form = document.getElementById('form-feedback')
const mensagem = document.getElementById('mensagem')

form.addEventListener('submit', async (e) => {
    e.preventDefault()

    const estrelas = form.estrelas.value
    if (!estrelas) {
        mensagem.textContent = 'Por favor, selecione uma avaliação por estrelas.'
        mensagem.style.color = 'red'
        return
    }

    let nome = form.nome.value.trim()
    if (!nome) nome = null

    const comentarioRaw = form.comentario.value.trim()
    const comentario = comentarioRaw === '' ? null : comentarioRaw

    const dados = { nome, estrelas, comentario }

    try {
        const response = await fetch(`${API_BASE_URL}/feedbacks`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dados)
        })

        if (response.ok) {
            window.location.href = 'agradecimento.html'
        } else {
            const conteudo = await response.json()
            mensagem.textContent = conteudo.error || 'Erro ao enviar feedback. Tente novamente.'
            mensagem.style.color = 'red'
        }
    } catch (error) {
        mensagem.textContent = 'Erro ao enviar feedback. Tente novamente.'
        mensagem.style.color = 'red'
        console.error('Erro:', error)
    }
})
