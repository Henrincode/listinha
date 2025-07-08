const tarefasBanco = []

const main = document.querySelector('main')

carregarDados()

// FUNÇÕES

// Carrega os dados antes de renderizar a lista
async function carregarDados() {
    try {
        // Carrega os dados
        const carregarTarefas = await fetch('./data.json')
        const dadosTarefas = await carregarTarefas.json()

        // Joga os dados carregados no array
        tarefasBanco.push(...dadosTarefas)

        // Desenha a lista de tarefas
        listarTarefas()

    } catch (erro) {
        console.error('Erro ao carregar dados: ', erro)
    }
}

function listarTarefas() {

    // Separa tarefas concluídas de não concluídas
    const concluidas = tarefasBanco.filter(tarefa => tarefa.concluido === true)
    const naoConcluidas = tarefasBanco.filter(tarefa => tarefa.concluido === false)

    // Desenha a lista de tarefas
    main.innerHTML = ''

    naoConcluidas.forEach(tarefa => {
        main.innerHTML += `
                <div class="tarefa" draggable="true" idTarefa="${tarefa.id}">
                    <input type="checkbox">
                    <p>${tarefa.texto}</p>
                    <i class="lixeira bi bi-trash3"></i>
                </div>
            `
    })

    // Se não tiver tarefas concluídas não mostra o texto a seguir
    if (concluidas.length > 0) main.innerHTML += '<p class="texto-concluidas">Concluídas</p>'

    concluidas.forEach(tarefa => {
        main.innerHTML += `
                <div class="tarefa concluida" idTarefa="${tarefa.id}">
                    <input type="checkbox" checked>
                    <p>${tarefa.texto}</p>
                    <i class="lixeira bi bi-trash3"></i>
                </div>
            `
    })

    acaoCheckbox()
    acaoLixeira()
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
        lixeira.addEventListener('click', function() {
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

// function addTarefa() { }
// function altTarefa() { }
// function delTarefa() { }