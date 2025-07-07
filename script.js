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
                </div>
            `
    })

    acaoCheckbox()
}

// Se Checkbox for clicado alterna tarefa concluida ou não concluida
function acaoCheckbox() {
    const checkboxes = document.querySelectorAll('.tarefa input[type="checkbox"]')

    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function () {
            const pai = this.closest('.tarefa')
            const idTarefa = tarefa => tarefa.id === Number(pai.getAttribute('idTarefa'))

            // alterna estado concluido e faz efeito de sumir
            pai.classList.add('sumindo')
            setTimeout(() => {
                tarefasBanco.find(idTarefa).concluido = this.checked
                listarTarefas()
            }, 300)


        });
    });

}

// function addTarefa() { }
// function altTarefa() { }
// function delTarefa() { }