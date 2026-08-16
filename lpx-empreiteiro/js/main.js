// Inicializar AOS (Animate On Scroll)
AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true
});

// ===== FUNÇÕES AUXILIARES =====
function preencherOrcamento(servico) {
    document.getElementById('orcServico').value = servico;
    document.getElementById('orcamento').scrollIntoView({ behavior: 'smooth' });
}

function preencherVaga(vaga) {
    document.getElementById('candVaga').value = vaga;
    document.getElementById('candidatura').scrollIntoView({ behavior: 'smooth' });
}

// ===== SALVAR DADOS NO LOCALSTORAGE =====
function salvarDados(tipo, dados) {
    let lista = JSON.parse(localStorage.getItem(tipo)) || [];
    dados.id = Date.now();
    dados.data = new Date().toLocaleString('pt-BR');
    lista.push(dados);
    localStorage.setItem(tipo, JSON.stringify(lista));
}

// ===== FORMULÁRIO DE ORÇAMENTO =====
document.getElementById('formOrcamento')?.addEventListener('submit', function(e) {
    e.preventDefault();
    const dados = {
        nome: document.getElementById('orcNome').value,
        telefone: document.getElementById('orcTelefone').value,
        email: document.getElementById('orcEmail').value,
        servico: document.getElementById('orcServico').value,
        descricao: document.getElementById('orcDescricao').value
    };
    salvarDados('orcamentos', dados);
    alert('Solicitação enviada com sucesso! Entraremos em contato em breve.');
    this.reset();
});

// ===== FORMULÁRIO DE CANDIDATURA =====
document.getElementById('formCandidatura')?.addEventListener('submit', function(e) {
    e.preventDefault();
    const dados = {
        nome: document.getElementById('candNome').value,
        email: document.getElementById('candEmail').value,
        telefone: document.getElementById('candTelefone').value,
        vaga: document.getElementById('candVaga').value,
        mensagem: document.getElementById('candMensagem').value,
        curriculo: document.getElementById('candCurriculo').value
    };
    salvarDados('candidaturas', dados);
    alert('Candidatura enviada com sucesso! Boa sorte!');
    this.reset();
});

// ===== FORMULÁRIO DE CONTATO =====
document.getElementById('formContato')?.addEventListener('submit', function(e) {
    e.preventDefault();
    const dados = {
        nome: document.getElementById('contNome').value,
        email: document.getElementById('contEmail').value,
        assunto: document.getElementById('contAssunto').value,
        mensagem: document.getElementById('contMensagem').value
    };
    salvarDados('contatos', dados);
    alert('Mensagem enviada com sucesso!');
    this.reset();
});

// ===== PAINEL ADMINISTRATIVO =====
function carregarAdmin() {
    // Orçamentos
    const orcamentos = JSON.parse(localStorage.getItem('orcamentos')) || [];
    const listaOrc = document.getElementById('listaOrcamentos');
    if (listaOrc) {
        if (orcamentos.length === 0) {
            listaOrc.innerHTML = '<p class="text-muted">Nenhuma solicitação de orçamento recebida.</p>';
        } else {
            let html = `<table class="table table-striped">
                <thead><tr><th>Data</th><th>Nome</th><th>Telefone</th><th>Serviço</th><th>Descrição</th><th>Ações</th></tr></thead>
                <tbody>`;
            orcamentos.forEach(o => {
                html += `<tr>
                    <td>${o.data}</td>
                    <td>${o.nome}</td>
                    <td>${o.telefone}</td>
                    <td>${o.servico}</td>
                    <td>${o.descricao}</td>
                    <td><button class="btn btn-sm btn-danger" onclick="excluirItem('orcamentos', ${o.id})"><i class="fas fa-trash"></i></button></td>
                </tr>`;
            });
            html += '</tbody></table>';
            listaOrc.innerHTML = html;
        }
    }

    // Candidaturas
    const candidaturas = JSON.parse(localStorage.getItem('candidaturas')) || [];
    const listaCand = document.getElementById('listaCandidaturas');
    if (listaCand) {
        if (candidaturas.length === 0) {
            listaCand.innerHTML = '<p class="text-muted">Nenhuma candidatura recebida.</p>';
        } else {
            let html = `<table class="table table-striped">
                <thead><tr><th>Data</th><th>Nome</th><th>E-mail</th><th>Telefone</th><th>Vaga</th><th>Currículo</th><th>Ações</th></tr></thead>
                <tbody>`;
            candidaturas.forEach(c => {
                html += `<tr>
                    <td>${c.data}</td>
                    <td>${c.nome}</td>
                    <td>${c.email}</td>
                    <td>${c.telefone}</td>
                    <td>${c.vaga}</td>
                    <td>${c.curriculo ? `<a href="${c.curriculo}" target="_blank">Ver</a>` : '-'}</td>
                    <td><button class="btn btn-sm btn-danger" onclick="excluirItem('candidaturas', ${c.id})"><i class="fas fa-trash"></i></button></td>
                </tr>`;
            });
            html += '</tbody></table>';
            listaCand.innerHTML = html;
        }
    }

    // Contatos
    const contatos = JSON.parse(localStorage.getItem('contatos')) || [];
    const listaCont = document.getElementById('listaContatos');
    if (listaCont) {
        if (contatos.length === 0) {
            listaCont.innerHTML = '<p class="text-muted">Nenhuma mensagem de contato recebida.</p>';
        } else {
            let html = `<table class="table table-striped">
                <thead><tr><th>Data</th><th>Nome</th><th>E-mail</th><th>Assunto</th><th>Mensagem</th><th>Ações</th></tr></thead>
                <tbody>`;
            contatos.forEach(c => {
                html += `<tr>
                    <td>${c.data}</td>
                    <td>${c.nome}</td>
                    <td>${c.email}</td>
                    <td>${c.assunto}</td>
                    <td>${c.mensagem}</td>
                    <td><button class="btn btn-sm btn-danger" onclick="excluirItem('contatos', ${c.id})"><i class="fas fa-trash"></i></button></td>
                </tr>`;
            });
            html += '</tbody></table>';
            listaCont.innerHTML = html;
        }
    }
}

function excluirItem(tipo, id) {
    if (confirm('Excluir este registro?')) {
        let lista = JSON.parse(localStorage.getItem(tipo)) || [];
        lista = lista.filter(item => item.id !== id);
        localStorage.setItem(tipo, JSON.stringify(lista));
        carregarAdmin();
    }
}

// Carregar painel admin se estiver na página admin
if (document.getElementById('adminTabs')) {
    carregarAdmin();
}