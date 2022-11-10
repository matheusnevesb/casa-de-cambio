import Swal from 'sweetalert2';

import './style.css'

const botao = document.querySelector('#search-btn')
const main = document.querySelector('main')


function limpaMain() {
    while (main.children.length > 0) {
        main.removeChild(main.firstChild)
    }
}

function criarElementos(nome, valor) {
    const div = document.createElement('div')
    div.classList.add('box')
    const p1 = document.createElement('p')
    p1.classList.add('nome-moeda')
    p1.innerText = nome
    const p2 = document.createElement('p')
    p2.classList.add('valor-moeda')
    p2.innerText = valor
    div.appendChild(p1)
    div.appendChild(p2)
    main.appendChild(div)
}

function criarMoeda(objeto) {
    for(const key in objeto) {
        criarElementos(key, objeto[key])
        // console.log(key + ' ' + objeto[key])
    }
}

function erro(mensagem) {
    return Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: mensagem,
      })
}

function testaValor(rates, moeda) {
    if (moeda === ''){
        return erro('Voce preicsa passar uma moeda')
    }
    if (!Object.keys(rates).includes(moeda)) {
        return erro('Moeda não existente!')
    }
    return criarMoeda(rates)
    
}

function getCurrency() {
    limpaMain()
    const moeda = document.querySelector('#moeda-input').value.toUpperCase()
    fetch(`https://api.exchangerate.host/latest?base=${moeda}`)
    .then((response) => response.json())
    .then((data) => {
        const { rates } = data
        testaValor(rates, moeda)
        
        // console.log(Object.keys(rates))
    })
    // console.log(moeda)
    
}

botao.addEventListener('click', getCurrency);