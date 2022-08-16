formHTML = document.querySelector('form')
let usuario = {}

formHTML.addEventListener('submit', (e) => {
    e.preventDefault()

    usuarioHTML = document.querySelector('#usuario').value
    senhaHTML = document.querySelector('#senha').value

    usuario = procuraUsuario(usuarioHTML, senhaHTML)
    if(!usuario){
        return
    }
    // usuario = usuario.usuario
    localStorage.setItem('usuarioLogado', usuario.usuario)

    window.location.assign('./home.html')
})

function procuraUsuario(nome, senha){
    let usuarioEncontrado = JSON.parse(localStorage.getItem(nome))
    if(usuarioEncontrado && usuarioEncontrado.senha === senha){
        return usuarioEncontrado
    } else {
        alert('Usuário ou senha não conferem')
        return
    }
}
