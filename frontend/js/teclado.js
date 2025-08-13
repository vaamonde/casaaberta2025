let campoFocado = null
let capsLockAtivo = false

function toggleCapsLock() {
    capsLockAtivo = !capsLockAtivo

    // Atualiza visual das letras no teclado
    document.querySelectorAll('.tecla.letra').forEach(tecla => {
        tecla.textContent = capsLockAtivo
            ? tecla.dataset.char.toUpperCase()
            : tecla.dataset.char.toLowerCase()
    })

    // Atualiza o estilo do botão Capslock
    const capsBtn = document.getElementById('capsLock')
    if (capsLockAtivo) {
        capsBtn.classList.add('ativo')
    } else {
        capsBtn.classList.remove('ativo')
    }
}

document.querySelectorAll("input[type='text'], input[type='email'], textarea").forEach(campo => {
    campo.addEventListener('focus', () => {
        campoFocado = campo
    })
})

function inserirCaractere(char) {
    if (campoFocado) {
        const caractereFinal = capsLockAtivo ? char.toUpperCase() : char
        const inicio = campoFocado.selectionStart
        const fim = campoFocado.selectionEnd
        const texto = campoFocado.value
        campoFocado.value = texto.substring(0, inicio) + caractereFinal + texto.substring(fim)
        campoFocado.setSelectionRange(inicio + 1, inicio + 1)
        campoFocado.focus()
    }
}

function backspace() {
    if (campoFocado) {
        const inicio = campoFocado.selectionStart
        const fim = campoFocado.selectionEnd
        const texto = campoFocado.value
        if (inicio === fim && inicio > 0) {
            campoFocado.value = texto.substring(0, inicio - 1) + texto.substring(fim)
            campoFocado.setSelectionRange(inicio - 1, inicio - 1)
        } else {
            campoFocado.value = texto.substring(0, inicio) + texto.substring(fim)
            campoFocado.setSelectionRange(inicio, inicio)
        }
        campoFocado.focus()
    }
}
