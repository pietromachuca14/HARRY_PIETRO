// ========================================
// CONSUMO DE API - JOGADORES DO CORINTHIANS
// AV1 DWB - Pietro
// ========================================

// Dados dos jogadores do Corinthians (JSON local)
// Em um cenário real, seria consumido de uma API pública
const playersAPI = [
    {
        id: 1,
        name: 'Hugo Souza',
        number: 1,
        position: 'Goleiro',
        age: 27,
        height: '1.88m',
        nationality: 'Brasil',
        joinYear: '2024',
        imageUrl: 'https://via.placeholder.com/200?text=Hugo',
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
        imageUrl: 'https://via.placeholder.com/200?text=Gustavo',
        stats: { appearances: 100, goals: 2, assists: 1 }
    },
    {
        id: 3,
        name: 'André Ramalho',
        number: 5,
        position: 'Zagueiro',
        age: 34,
        height: '1.86m',
        nationality: 'Brasil',
        joinYear: '2024',
        imageUrl: 'https://via.placeholder.com/200?text=Andre',
        stats: { appearances: 90, goals: 3, assists: 1 }
    },
    {
        id: 4,
        name: 'Raniele',
        number: 14,
        position: 'Volante',
        age: 29,
        height: '1.88m',
        nationality: 'Brasil',
        joinYear: '2024',
        imageUrl: 'https://via.placeholder.com/200?text=Raniele',
        stats: { appearances: 98, goals: 5, assists: 7 }
    },
    {
        id: 5,
        name: 'Breno Bidon',
        number: 27,
        position: 'Meia-Campista',
        age: 21,
        height: '1.80m',
        nationality: 'Brasil',
        joinYear: '2024',
        imageUrl: 'https://via.placeholder.com/200?text=Bidon',
        stats: { appearances: 55, goals: 3, assists: 5 }
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
        imageUrl: 'https://via.placeholder.com/200?text=Depay',
        stats: { appearances: 63, goals: 25, assists: 12 }
    },
    {
        id: 7,
        name: 'Yuri Alberto',
        number: 9,
        position: 'Atacante',
        age: 25,
        height: '1.84m',
        nationality: 'Brasil',
        joinYear: '2022',
        imageUrl: 'https://via.placeholder.com/200?text=Yuri',
        stats: { appearances: 128, goals: 38, assists: 12 }
    },
    {
        id: 8,
        name: 'Matheus Bidu',
        number: 21,
        position: 'Lateral Esquerdo',
        age: 27,
        height: '1.74m',
        nationality: 'Brasil',
        joinYear: '2023',
        imageUrl: 'https://via.placeholder.com/200?text=Bidu',
        stats: { appearances: 88, goals: 4, assists: 8 }
    },
    {
        id: 9,
        name: 'Matheuzinho',
        number: 2,
        position: 'Lateral Direito',
        age: 26,
        height: '1.76m',
        nationality: 'Brasil',
        joinYear: '2024',
        imageUrl: 'https://via.placeholder.com/200?text=Matheuzinho',
        stats: { appearances: 70, goals: 2, assists: 10 }
    },
    {
        id: 10,
        name: 'Rodrigo Garro',
        number: 8,
        position: 'Meia-Campista',
        age: 28,
        height: '1.72m',
        nationality: 'Brasil',
        joinYear: '2024',
        imageUrl: 'https://via.placeholder.com/200?text=Garro',
        stats: { appearances: 54, goals: 7, assists: 11 }
    },
    {
        id: 11,
        name: 'Jesse Lingard',
        number: 18,
        position: 'Meia-Atacante',
        age: 33,
        height: '1.70m',
        nationality: 'Inglaterra',
        joinYear: '2024',
        imageUrl: 'https://via.placeholder.com/200?text=Lingard',
        stats: { appearances: 48, goals: 12, assists: 10 }
    }
];

// Dados globais
let allPlayers = [];
let filteredPlayers = [];

// Elementos do DOM
const playersContainer = document.getElementById('players-container');
const errorAlert = document.getElementById('error-alert');
const errorMessage = document.getElementById('error-message');
const successAlert = document.getElementById('success-alert');
const loadingBadge = document.getElementById('loading-badge');
const noResultsMsg = document.getElementById('no-results');
const searchInput = document.getElementById('search-input');
const positionFilter = document.getElementById('position-filter');

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
    successAlert.style.display = 'none';
    stadiumsContainer.innerHTML = '';
}

// ========================================
// FUNÇÃO: Mostrar Sucesso
// ========================================
function showSuccess() {
    successAlert.style.display = 'block';
    errorAlert.style.display = 'none';
    setTimeout(() => {
        successAlert.style.display = 'none';
    }, 5000);
}

// ========================================
// FUNÇÃO: Carregar Dados de Jogadores
// Simula uma requisição à API
// ========================================
async function loadPlayers() {
    try {
        showLoading(true);
        errorAlert.style.display = 'none';

        // Simulando uma requisição assíncrona
        // Em um cenário real, seria: const response = await fetch(API_URL);
        await new Promise(resolve => setTimeout(resolve, 800));

        allPlayers = playersAPI;
        filteredPlayers = [...allPlayers];
        populatePositionFilter();
        displayPlayers(filteredPlayers);
        showSuccess();

    } catch (error) {
        console.error('Erro ao carregar jogadores:', error);
        showError('Erro ao carregar dados dos jogadores.');
    } finally {
        showLoading(false);
    }
}

// ========================================
// FUNÇÃO: Popular Filtro de Posições
// ========================================
function populatePositionFilter() {
    const positions = new Set(allPlayers.map(p => p.position));
    const positionSelect = document.getElementById('position-filter');

    Array.from(positions).sort().forEach(position => {
        const option = document.createElement('option');
        option.value = position;
        option.textContent = position;
        positionSelect.appendChild(option);
    });
}

// ========================================
// FUNÇÃO: Exibir Jogadores no DOM
// ========================================
function displayPlayers(players) {
    playersContainer.innerHTML = '';

    if (players.length === 0) {
        noResultsMsg.style.display = 'block';
        return;
    }

    noResultsMsg.style.display = 'none';

    players.forEach(player => {
        const card = createPlayerCard(player);
        playersContainer.appendChild(card);
    });
}

// ========================================
// FUNÇÃO: Criar Card de Jogador
// ========================================
function createPlayerCard(player) {
    const col = document.createElement('div');
    col.className = 'col-md-6 col-lg-4';

    const card = document.createElement('div');
    card.className = 'player-card';
    card.innerHTML = `
        <div class="player-card-header">
            <div class="player-number">#${player.number}</div>
            <h5>${player.name}</h5>
        </div>
        <div class="player-card-body">
            <div class="player-info">
                <strong>Posição:</strong>
                <span>${player.position}</span>
            </div>
            <div class="player-info">
                <strong>Idade:</strong>
                <span>${player.age} anos</span>
            </div>
            <div class="player-info">
                <strong>Altura:</strong>
                <span>${player.height}</span>
            </div>
            <div class="player-info">
                <strong>Nacionalidade:</strong>
                <span>${player.nationality}</span>
            </div>
            <div class="player-highlight">
                <strong>Desde:</strong> <span>${player.joinYear}</span>
            </div>
            <div class="player-info">
                <strong>Jogos:</strong>
                <span>${player.stats.appearances}</span>
            </div>
            <div class="player-info">
                <strong>Gols:</strong>
                <span>${player.stats.goals}</span>
            </div>
            <div class="player-info">
                <strong>Assistências:</strong>
                <span>${player.stats.assists}</span>
            </div>
        </div>
        <div class="player-card-footer">
            <a href="detalhes.html?id=${player.id}" class="btn-details">Ver Perfil →</a>
        </div>
    `;

    col.appendChild(card);
    return col;
}

// ========================================
// FUNÇÃO: Formatar Número (Capacidade)
// ========================================
function formatNumber(num) {
    if (typeof num === 'string') {
        num = parseInt(num) || 0;
    }
    return num.toLocaleString('pt-BR');
}

// ========================================
// FUNÇÃO: Filtrar Jogadores
// ========================================
function filterPlayers() {
    const searchTerm = searchInput.value.toLowerCase();
    const selectedPosition = positionFilter.value;

    filteredPlayers = allPlayers.filter(player => {
        const matchesSearch = 
            player.name.toLowerCase().includes(searchTerm) ||
            player.position.toLowerCase().includes(searchTerm);

        const matchesPosition = !selectedPosition || player.position === selectedPosition;

        return matchesSearch && matchesPosition;
    });

    displayPlayers(filteredPlayers);
}

// ========================================
// EVENT LISTENERS
// ========================================
searchInput.addEventListener('input', filterPlayers);
positionFilter.addEventListener('change', filterPlayers);

// ========================================
// INICIALIZAR APLICAÇÃO
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    loadPlayers();
});
