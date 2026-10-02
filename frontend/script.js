const API_URL = 'http://localhost:3000/api/exames';

//MAPEAR OS ELEMENTOS PARA MANIPULAÇÃO
//Formulário de Envio
const exameForm = document.getElementById('exame-form');

//Os campos onde o usuário escreve o exame
const pacienteInput = document.getElementById('paciente-input');
const tipoInput = document.getElementById('tipo-input');
const statusInput = document.getElementById('status-input');

//Onde a lista de exames vai ser adicionada
const exameList = document.getElementById('exame-list');

//O texto 0/3 (contador)
const counterText = document.getElementById('counter-text');

//O texto na label dizendo "Edite o exame" ou "Cadastrar exame"
const formLabel = document.getElementById('form-label');

//Botão para cancelar a edição
const cancelBtn = document.getElementById('cancel-btn');

//Variáveis globais
let exames = []; // lista de exames recebidos da api
let editingExameId = null; // variável para identificar se está editando

async function fetchExames() {
    try {
        const response = await axios.get(API_URL);
        exames = response.data;
        renderExames();

    } catch (error) {
        console.error("Erro ao buscar exames", error);
        alert("Falha de conexão com a API.")
    }
};

function renderExames() {
    exameList.innerHTML = '';
    let realizadoCount = 0;
    const totalCount = exames.length;

    if (totalCount === 0) {
        exameList.innerHTML = '<li class="empty">Nenhum exame cadastrado.</li>';
    }

    exames.forEach(exame => {
        const realizado = exame.status === 'Realizado';
        if (realizado) realizadoCount++;

        const li = document.createElement('li');
        li.className = `exame-item ${realizado ? 'realizado' : ''}`;

        li.innerHTML = `
            <div class="exame-info">
                <span class="exame-paciente"></span>
                <span class="exame-tipo"></span>
                <span class="badge">${exame.status}</span>
            </div>
            <div class="exame-actions">
                <button onclick="toggleExame(${exame.id})">${realizado ? 'Reabrir' : 'Concluir'}</button>
                <button onclick="prepareEdit(${exame.id})">Editar</button>
                <button class="delete-btn" onclick="deleteExame(${exame.id})">Excluir</button>
            </div>
        `;
        //textContent evita injetar HTML vindo do banco
        li.querySelector('.exame-paciente').textContent = exame.paciente;
        li.querySelector('.exame-tipo').textContent = exame.tipo_exame;
        exameList.appendChild(li);
    });
    counterText.innerText = `${realizadoCount}/${totalCount}`;

};

async function saveExame(e) {
    e.preventDefault();
    const paciente = pacienteInput.value.trim();
    const tipo_exame = tipoInput.value.trim();
    const status = statusInput.value;

    if (!paciente || !tipo_exame) return;

    try {
        if (editingExameId) {
            await axios.put(`${API_URL}/${editingExameId}`, {
                paciente,
                tipo_exame,
                status
            });
        } else {
            await axios.post(API_URL, {
                paciente,
                tipo_exame,
                status
            });
        }

        resetForm();
        fetchExames();

    } catch (error) {
        console.error("Erro ao salvar o exame ", error);
        alert("Erro ao tentar salvar o exame");
    }

}

async function deleteExame(id) {
    if (!confirm("Tem certeza que deseja excluir ?")) return;

    try {
        await axios.delete(`${API_URL}/${id}`);
        fetchExames();

    } catch (error) {
        console.error("Erro ao deletar exame", error);
    }
}

function prepareEdit(id) {
    const exameAtual = exames.find(e => e.id === id);
    if (!exameAtual) return;

    editingExameId = id;
    pacienteInput.value = exameAtual.paciente;
    tipoInput.value = exameAtual.tipo_exame;
    statusInput.value = exameAtual.status;
    formLabel.innerText = "Edite o exame";
    cancelBtn.classList.remove('hidden');
    pacienteInput.focus();

}

function resetForm() {
    editingExameId = null;
    exameForm.reset();
    formLabel.innerText = "Cadastrar exame";
    cancelBtn.classList.add('hidden');
}

async function toggleExame(id){
    const exameAtual = exames.find(e => e.id === id);
    if (!exameAtual) return;

    const novoStatus = exameAtual.status === 'Realizado' ? 'Pendente' : 'Realizado';

    try {
        await axios.put(`${API_URL}/${id}`, {
            paciente: exameAtual.paciente,
            tipo_exame: exameAtual.tipo_exame,
            status: novoStatus
        });
        fetchExames();

    } catch(error){
        console.error("Erro ao atualizar status do exame", error);
    }
}

exameForm.addEventListener('submit', saveExame);
cancelBtn.addEventListener('click', resetForm);
fetchExames();
