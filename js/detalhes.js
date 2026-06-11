// ========================================
// PÁGINA DE DETALHES - JOGADORES DO CORINTHIANS
// AV1 DWB - Pietro - Parte 2
// ========================================

// Função para buscar os jogadores em `players.json`
async function fetchPlayers() {
    try {
        const res = await fetch('players.json');
        if (!res.ok) throw new Error('Falha ao buscar players.json');
        return await res.json();
    } catch (err) {
        console.error('Erro ao carregar players.json', err);
        // Retornar fallback mínimo para permitir visualizar páginas abertas localmente
        return [
            {
                id: 1,
                name: 'Hugo Souza',
                number: 1,
                position: 'Goleiro',
                age: 27,
                height: '1.88m',
                nationality: 'Brasil',
                joinYear: '2024',
                imageUrl: 'https://via.placeholder.com/400x300?text=Hugo',
                description: 'Hugo Souza é goleiro do Corinthians, fallback.',
                achievements: ['Série A 2024'],
                stats: { appearances: 110, goals: 0, assists: 3 }
            },
            {
                id: 2,
                name: 'Gustavo Henrique',
                number: 13,
                position: 'Zagueiro',
                age: 32,
                height: '1.87m',
                nationality: 'Brasil',
                joinYear: '2024',
                imageUrl: 'https://via.placeholder.com/400x300?text=Gustavo',
                description: 'Gustavo Henrique, fallback.',
                achievements: ['Copa do Brasil 2024'],
                stats: { appearances: 100, goals: 2, assists: 1 }
            },
            {
                id: 6,
                name: 'Memphis Depay',
                number: 10,
                position: 'Atacante',
                age: 32,
                height: '1.88m',
                nationality: 'Holanda',
                joinYear: '2024',
                imageUrl: 'https://via.placeholder.com/400x300?text=Depay',
                description: 'Memphis Depay, fallback.',
                achievements: ['Seleção Holandesa'],
                stats: { appearances: 63, goals: 25, assists: 12 }
            }
        ];
    }
}

// Elementos do DOM
const playerDetails = document.getElementById('player-details');
const errorAlert = document.getElementById('error-alert');
const errorMessage = document.getElementById('error-message');
const loadingBadge = document.getElementById('loading-badge');
const notFound = document.getElementById('not-found');

// ========================================
// FUNÇÃO: Obter ID da URL
// Usando URLSearchParams
// ========================================
function getPlayerIdFromURL() {
    const params = new URLSearchParams(window.location.search);
    return params.get('id');
}

// ========================================
// FUNÇÃO: Buscar Jogador
// ========================================
async function loadPlayerDetails() {
    try {
        showLoading(true);
        const playerId = getPlayerIdFromURL();

        if (!playerId) {
            showNotFound();
            return;
        }

        // Buscar no arquivo players.json
        const players = await fetchPlayers();
        const player = players.find(p => p.id == playerId);

        if (!player) {
            showNotFound();
            return;
        }

        displayPlayerDetails(player);

    } catch (error) {
        console.error('Erro ao carregar detalhes:', error);
        showError('Erro ao carregar os detalhes do jogador.');
    } finally {
        showLoading(false);
    }
}

// ========================================
// FUNÇÃO: Mostrar/Ocultar Loading
// ========================================
function showLoading(show = true) {
    loadingBadge.style.display = show ? 'inline-block' : 'none';
}

// ========================================
// FUNÇÃO: Mostrar Erro
// ========================================
function showError(message) {
    errorMessage.textContent = message;
    errorAlert.style.display = 'block';
    playerDetails.innerHTML = '';
}

// ========================================
// FUNÇÃO: Mostrar Não Encontrado
// ========================================
function showNotFound() {
    notFound.style.display = 'block';
    playerDetails.innerHTML = '';
}

// ========================================
// FUNÇÃO: Exibir Detalhes do Jogador
// ========================================
function displayPlayerDetails(player) {
    errorAlert.style.display = 'none';
    notFound.style.display = 'none';

    const html = `
        <div class="col-lg-8">
            <div class="card player-card mb-4">
                <img src="${player.imageUrl}" class="card-img-top" alt="${player.name}" style="height: 300px; object-fit: cover;">
                
                <div class="player-card-body">
                    <h1 class="mb-2">#${player.number} - ${player.name}</h1>
                    <h5 class="text-muted mb-3">${player.position}</h5>
                    
                    <p class="text-dark">${player.description}</p>

                    <div class="player-highlight mb-4">
                        <strong>Posição:</strong> <span>${player.position}</span>
                    </div>

                    <h5 class="mt-4 mb-3">Informações Pessoais</h5>
                    <table class="table">
                        <tbody>
                            <tr>
                                <td><strong>Número da Camisa:</strong></td>
                                <td><strong>#${player.number}</strong></td>
                            </tr>
                            <tr>
                                <td><strong>Idade:</strong></td>
                                <td>${player.age} anos</td>
                            </tr>
                            <tr>
                                <td><strong>Altura:</strong></td>
                                <td>${player.height}</td>
                            </tr>
                            <tr>
                                <td><strong>Nacionalidade:</strong></td>
                                <td>${player.nationality}</td>
                            </tr>
                            <tr>
                                <td><strong>No Corinthians desde:</strong></td>
                                <td>${player.joinYear}</td>
                            </tr>
                        </tbody>
                    </table>

                    <h5 class="mt-4 mb-3">Estatísticas</h5>
                    <table class="table">
                        <tbody>
                            <tr>
                                <td><strong>Jogos:</strong></td>
                                <td>${player.stats.appearances}</td>
                            </tr>
                            <tr>
                                <td><strong>Gols:</strong></td>
                                <td>${player.stats.goals}</td>
                            </tr>
                            <tr>
                                <td><strong>Assistências:</strong></td>
                                <td>${player.stats.assists}</td>
                            </tr>
                        </tbody>
                    </table>

                    <h5 class="mt-4 mb-3">Conquistas e Destaques</h5>
                    <ul class="list-group">
                        ${player.achievements.map(achievement => 
                            `<li class="list-group-item">🏆 ${achievement}</li>`
                        ).join('')}
                    </ul>

                    <div class="mt-4">
                        <a href="index.html" class="btn btn-primary btn-lg">← Voltar para Listagem</a>
                    </div>
                </div>
            </div>
        </div>

        <div class="col-lg-4">
            <div class="card">
                <div class="card-header bg-primary text-white">
                    <h5 class="mb-0">👕 Perfil do Jogador</h5>
                </div>
                <div class="card-body">
                    <p><strong>Nome:</strong><br>${player.name}</p>
                    <p><strong>Número:</strong><br>#${player.number}</p>
                    <p><strong>Posição:</strong><br>${player.position}</p>
                    <p><strong>Idade:</strong><br>${player.age} anos</p>
                    <p><strong>Nacionalidade:</strong><br>${player.nationality}</p>
                </div>
            </div>

            <div class="card mt-4">
                <div class="card-header bg-success text-white">
                    <h5 class="mb-0">📊 Rendimento</h5>
                </div>
                <div class="card-body">
                    <p><strong>Jogos:</strong> ${player.stats.appearances}</p>
                    <p><strong>Gols:</strong> ${player.stats.goals}</p>
                    <p><strong>Assistências:</strong> ${player.stats.assists}</p>
                </div>
            </div>

            <div class="card mt-4">
                <div class="card-header bg-info text-white">
                    <h5 class="mb-0">ℹ️ Informações</h5>
                </div>
                <div class="card-body">
                    <p class="small">O Corinthians foi fundado em 1910 e é um dos clubes mais populares do Brasil. O time já conquistou títulos importantes como o Campeonato Brasileiro, a Libertadores e vários Campeonatos Paulistas.</p>
                    <p class="small"><strong>Tecnologias:</strong> HTML5, CSS3, Bootstrap, JavaScript ES6+</p>
                </div>
            </div>
        </div>
    `;

    playerDetails.innerHTML = html;
}

// ========================================
// FUNÇÃO: Formatar Número
// ========================================
function formatNumber(num) {
    if (typeof num === 'string') {
        num = parseInt(num) || 0;
    }
    return num.toLocaleString('pt-BR');
}

// ========================================
// INICIALIZAR
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    loadPlayerDetails();
});
