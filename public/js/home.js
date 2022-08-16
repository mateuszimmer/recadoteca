const botaoCadRecHTML = document.querySelector('#botao-cadastrar')
const localRecadosHTML = document.querySelector('#recados')
const botaoSairHTML = document.querySelector('#menu-suspenso')
const usuarioLogado = JSON.parse(localStorage.getItem(localStorage.getItem('usuarioLogado')))

document.addEventListener('DOMContentLoaded', (()=>{
    if(!usuarioLogado){
        location.assign('xindex.html')
        return
    } 
    console.log(usuarioLogado)
    const nomeUsuarioHTML = document.querySelector('#nome_do_usuario')
    nomeUsuarioHTML.innerText = usuarioLogado.usuario
    mostrarRecados(usuarioLogado)
}))

botaoCadRecHTML.addEventListener('click', criarRecado)
botaoSairHTML.addEventListener('click', sairSistema)

function criarRecado(){
    const usuarioLogado = JSON.parse(localStorage.getItem(localStorage.getItem('usuarioLogado')))
    const numeroRecado = document.querySelector('#numero_recado').value
    const descricao = document.querySelector('#input-descricao').value
    const detalhamento = document.querySelector('#input-detalhamento').value
    
    recadoNovo = {
        descricao,
        detalhamento
    }
    
    if(numeroRecado){
        usuarioLogado.recados[numeroRecado] = recadoNovo
    } else {
        usuarioLogado.recados.push(recadoNovo)
    }

    console.log(usuarioLogado)
    
    salvarNoLocalStorage(usuarioLogado)
    
    limparDados()
    
    mostrarRecados(usuarioLogado)
}

function editarRecado(id, usuario){
    const usuarioDoRecado = JSON.parse(localStorage.getItem(usuario))
    const recadoParaEditar = usuarioDoRecado.recados[id]

    document.querySelector('#numero_recado').value = id
    document.querySelector('#input-descricao').value = recadoParaEditar.descricao
    document.querySelector('#input-detalhamento').value = recadoParaEditar.detalhamento
}

function excluirRecado(id, usuario){
    const usuarioDoRecado = JSON.parse(localStorage.getItem(usuario))
    usuarioDoRecado.recados.splice(id, 1)
    localStorage.setItem(usuario, JSON.stringify(usuarioDoRecado))

    let usuarioNovosRecados = JSON.parse(localStorage.getItem(usuario))

    mostrarRecados(usuarioNovosRecados)
}

function salvarNoLocalStorage(info){
    localStorage.setItem(info.usuario, JSON.stringify(info))
}

function limparDados(){
    document.querySelector('#numero_recado').value = ''
    document.querySelector('#input-descricao').value = ''
    document.querySelector('#input-detalhamento').value = ''
}

function mostrarRecados(usuario){
    
    localRecadosHTML.innerHTML = ''
    
    recadosUsuarioLogado = usuario.recados
    
    let btn = []
    
    recadosUsuarioLogado.forEach((recado ,index, ) => {
        
        let novaLinha = document.createElement('tr')
        novaLinha.setAttribute('id', `linha_recado_${index}`)
        
        let numeroRecado = document.createElement('td')
        numeroRecado.innerText = `${index+1}`
        
        let descricao = document.createElement('td')
        descricao.innerText = recado.descricao
        
        let detalhamento = document.createElement('td')
        detalhamento.innerText = recado.detalhamento
        
        let tdBotoes = document.createElement('td')
        
        let botaoEditar = document.createElement('button')
        botaoEditar.setAttribute('class', `editar`)
        botaoEditar.setAttribute('id', `btn_editar_${index}`)
        botaoEditar.setAttribute('onclick', `editarRecado(${index}, '${usuarioLogado.usuario}')`)
        botaoEditar.innerText = 'Editar'
        
        let botaoExcluir = document.createElement('button')
        botaoExcluir.setAttribute('class', `excluir`)
        botaoExcluir.setAttribute('id', `btn_excluir_${index}`)
        botaoExcluir.setAttribute('onclick', `excluirRecado(${index}, '${usuarioLogado.usuario}')`)
        botaoExcluir.innerText = 'Excluir'
        
        novaLinha.appendChild(numeroRecado)
        novaLinha.appendChild(descricao)
        novaLinha.appendChild(detalhamento)
        
        tdBotoes.appendChild(botaoEditar)
        tdBotoes.appendChild(botaoExcluir)
        novaLinha.appendChild(tdBotoes)
        
        localRecadosHTML.appendChild(novaLinha)
        
        btn.push(novaLinha)
    })
    
}

function verificaLogado(usuario){
    
}

function sairSistema(){
    localStorage.removeItem('usuarioLogado')
    location.assign('index.html')
}

