const API_URL = 'http://localhost:3000/api/exames';

// Elementos da página
const exameForm = document.getElementById('exame-form');
const pacienteInput = document.getElementById('paciente-input');
const tipoInput = document.getElementById('tipo-input');
const exameList = document.getElementById('exame-list');
const counterText = document.getElementById('counter-text');
const formLabel = document.getElementById('form-label');
const cancelBtn = document.getElementById('cancel-btn');

let exames = [];
let editingExameId = null;

async function fetchExames() {
    try {
        const response = await axios.get(API_URL);
        exames = response.data;
        renderExames();
    } catch (error) {
        console.error('Erro ao buscar exames', error);
        alert('Falha de conexão com a API.');
    }
}

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
                <span class="badge"></span>
            </div>
            <div class="exame-actions">
                <label class="checklist-item">
                    <input type="checkbox" onchange="toggleExame(${exame.id}, this.checked)" ${realizado ? 'checked' : ''}>
                    <span>Realizado</span>
                </label>
                <button class="edit-btn" onclick="prepareEdit(${exame.id})">Editar</button>
                <button class="delete-btn" onclick="deleteExame(${exame.id})">Excluir</button>
            </div>
        `;

        li.querySelector('.exame-paciente').textContent = exame.paciente;
        li.querySelector('.exame-tipo').textContent = exame.tipo_exame;
        li.querySelector('.badge').textContent = exame.status;
        exameList.appendChild(li);
    });

    counterText.innerText = `${realizadoCount}/${totalCount}`;
}

async function saveExame(event) {
    event.preventDefault();
    const paciente = pacienteInput.value.trim();
    const tipo_exame = tipoInput.value.trim();

    if (!paciente || !tipo_exame) return;

    try {
        if (editingExameId) {
            const exameAtual = exames.find(exame => exame.id === editingExameId);
            await axios.put(`${API_URL}/${editingExameId}`, {
                paciente: paciente,
                tipo_exame: tipo_exame,
                status: exameAtual.status
            });
        } else {
            await axios.post(API_URL, {
                paciente: paciente,
                tipo_exame: tipo_exame
            });
        }

        resetForm();
        fetchExames();
    } catch (error) {
        console.error('Erro ao salvar o exame', error);
        alert('Erro ao tentar salvar o exame.');
    }
}

async function deleteExame(id) {
    if (!confirm('Tem certeza que deseja excluir?')) return;

    try {
        await axios.delete(`${API_URL}/${id}`);
        fetchExames();
    } catch (error) {
        console.error('Erro ao excluir exame', error);
    }
}

function prepareEdit(id) {
    const exameAtual = exames.find(exame => exame.id === id);
    if (!exameAtual) return;

    editingExameId = id;
    pacienteInput.value = exameAtual.paciente;
    tipoInput.value = exameAtual.tipo_exame;
    formLabel.innerText = 'Edite o exame';
    cancelBtn.classList.remove('hidden');
    pacienteInput.focus();
}

function resetForm() {
    editingExameId = null;
    exameForm.reset();
    formLabel.innerText = 'Cadastrar exame';
    cancelBtn.classList.add('hidden');
}

async function toggleExame(id, realizado) {
    const exameAtual = exames.find(exame => exame.id === id);
    if (!exameAtual) return;

    try {
        await axios.put(`${API_URL}/${id}`, {
            paciente: exameAtual.paciente,
            tipo_exame: exameAtual.tipo_exame,
            status: realizado ? 'Realizado' : 'Pendente'
        });
        fetchExames();
    } catch (error) {
        console.error('Erro ao atualizar o status do exame', error);
    }
}

exameForm.addEventListener('submit', saveExame);
cancelBtn.addEventListener('click', resetForm);
fetchExames();
