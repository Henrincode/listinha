const tarefasBanco = JSON.parse(localStorage.getItem('tarefas')) || []

const listaFazer = document.querySelector('#fazer')
const novaTarefaInput = document.querySelector('#adicionar input')
const novaTarefaBotao = document.querySelector('#adicionar button')

novaTarefaBotao.addEventListener('click', e => {
    const texto = novaTarefaInput.value.trim().replace(/\s+/g, ' ')
    if (texto) novaTarefa(texto)
})

novaTarefaInput.addEventListener('keydown', e => {
    const texto = novaTarefaInput.value.trim().replace(/\s+/g, ' ')
    if (e.key === 'Enter' && texto) novaTarefa(texto)
})

listarTarefas()

// FUNÇÕES

function listarTarefas() {

    localStorage.setItem('tarefas', JSON.stringify(tarefasBanco))


    // Separa tarefas concluídas de não concluídas
    const concluidas = tarefasBanco.filter(tarefa => tarefa.concluido === true)
    const naoConcluidas = tarefasBanco.filter(tarefa => tarefa.concluido === false)

    // Desenha a lista de tarefas
    listaFazer.innerHTML = ''

    naoConcluidas.reverse().forEach(tarefa => {
        listaFazer.innerHTML += `
                <div class="tarefa" draggable="true" idTarefa="${tarefa.id}">
                    <input type="checkbox">
                    <p>${tarefa.texto}</p>
                    <i class="lixeira bi bi-trash3"></i>
                </div>
            `
    })

    // Se não tiver tarefas concluídas não mostra o texto a seguir
    if (concluidas.length > 0) listaFazer.innerHTML += '<p class="texto-concluidas">Concluídas</p>'

    concluidas.forEach(tarefa => {
        listaFazer.innerHTML += `
                <div class="tarefa concluida" idTarefa="${tarefa.id}">
                    <input type="checkbox" checked>
                    <p>${tarefa.texto}</p>
                    <i class="lixeira bi bi-trash3"></i>
                </div>
            `
    })

    acaoCheckbox()
    acaoLixeira()

    if (tarefasBanco.length <= 0) {
        listaFazer.innerHTML = `<p class="nenhuma-tarefa">Nenhuma tarefa cadastrada!</p>`
    }
}

function novaTarefa(texto) {
    tarefasBanco.push({
        id: gerarId(),
        texto: texto,
        concluido: false
    })
    novaTarefaInput.value = ''
    listarTarefas()
}

// Se Checkbox for clicado alterna tarefa concluida ou não concluida
function acaoCheckbox() {
    const checkboxes = document.querySelectorAll('.tarefa input[type="checkbox"]')

    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function () {
            const pai = this.closest('.tarefa')
            const idTarefa = tarefa => tarefa.id === Number(pai.getAttribute('idTarefa'))

            // alterna estado concluido e faz efeito de sumir
            tarefasBanco.find(idTarefa).concluido = this.checked
            pai.classList.add('sumindo')
            setTimeout(() => {
                listarTarefas()
            }, 300)


        });
    });

}


function acaoLixeira() {
    const lixeiras = document.querySelectorAll('.tarefa .lixeira')

    lixeiras.forEach(lixeira => {
        lixeira.addEventListener('click', function () {
            const pai = this.closest('.tarefa')
            const retornaIndice = tarefa => tarefa.id === Number(pai.getAttribute('idTarefa'))
            const indice = tarefasBanco.findIndex(retornaIndice)

            tarefasBanco.splice(indice, 1)
            pai.classList.add('sumindo')
            setTimeout(() => {
                listarTarefas()
            }, 300)
        })
    })
}

function gerarId() {
    if (tarefasBanco.length === 0) return 1
    return Math.max(...tarefasBanco.map(tarefa => tarefa.id)) + 1
}

// function addTarefa() { }
// function altTarefa() { }
// function delTarefa() { }