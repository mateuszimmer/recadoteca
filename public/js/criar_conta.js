const formularioCadastro = document.querySelector('#formulario-cadastro');

formularioCadastro.addEventListener('submit', (e) => {
    e.preventDefault();

    const usuario = document.querySelector('#usuario').value;
    const senha = document.querySelector('#senha').value;
    const confirmaSenha = document.querySelector('#confirma_senha').value;

    if(usuario.length <= 5){
        alert('O usuário deve ter mais que 5 caracteres');
        return;
    };

    if(senha.length < 4){
        alert('A senha deve ter pelo menos 4 caracteres');
        return;
    }
    
    if(senha !== confirmaSenha){
        alert('Senha e confirmação de senha não conferem');
        return;
    };

    const existeUsuario = verificaExistente(usuario)

    if (usuario === existeUsuario.usuario){
        alert('Nome de usuário já existe')
        return;
    }

    salvarConta({
        usuario: usuario,
        senha: senha,
        recados: []
    })

    alert('Conta criada com sucesso')
    localStorage.setItem('usuarioLogado', `${usuario}`)
    location.assign('home.html')
});


function verificaExistente(chave){
    const possivelConta = localStorage.getItem(chave);

    if(possivelConta){
        return JSON.parse(possivelConta)
    }

    return '';
}


function salvarConta(novoUsuario){
    localStorage.setItem(novoUsuario.usuario, JSON.stringify(novoUsuario))
}



