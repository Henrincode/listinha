const tarefasBanco = []

carregarDados()

// ESTILOS

const checkboxes = document.querySelectorAll('.tarefa input[type="checkbox"]');
async function carregarDados() {
    try {
        const carregarTarefas = await fetch('./data.json')
        const dadosTarefas = await carregarTarefas.json()

        tarefasBanco.push(...dadosTarefas)

        console.log(tarefasBanco)
    } catch (erro) {
        console.error('Erro ao carregar dados: ', erro)
    }
}

// FUNÇÕES

function addTarefa() { }
function altTarefa() { }
function delTarefa() { }

checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', function () {
        const tarefa = this.closest('.tarefa');
        if (this.checked) {
            tarefa.classList.add('concluida');
        } else {
            tarefa.classList.remove('concluida');
        }
    });
});
