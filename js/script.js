// ========================================
// CONSUMO DE API - PARTIDAS DE FUTEBOL
// AV1 DWB - Pietro
// ========================================

const API_URL = 'https://www.scorebat.com/video-api/v3/';

// Função para buscar partidas na API pública do Scorebat
async function fetchMatches() {
    try {
        const res = await fetch(API_URL);
        if (!res.ok) throw new Error(`Falha ao buscar API: ${res.status}`);
        const data = await res.json();
        return Array.isArray(data.response) ? data.response : [];
    } catch (err) {
        console.error('Erro ao carregar partidas da API', err);
        return defaultMatches;
    }
}

// Fallback de segurança quando a API pública não puder ser acessada
const defaultMatches = [
    {
        title: 'Atlético 2-1 Santos',
        competition: 'BRASIL: Brasileirão',
        date: '2026-05-08T19:30:00+00:00',
        thumbnail: 'https://via.placeholder.com/400x300?text=Atl%C3%A9tico+vs+Santos',
        matchviewUrl: 'https://www.scorebat.com/embed/matchview/12345/',
        videos: [{ title: 'Destaques', embed: '<iframe width="560" height="315" src="https://www.youtube.com/embed/dQw4w9WgXcQ" title="Destaques" frameborder="0" allowfullscreen></iframe>' }]
    },
    {
        title: 'Flamengo 2-1 Palmeiras',
        competition: 'BRASIL: Brasileirão',
        date: '2026-05-09T18:00:00+00:00',
        thumbnail: 'https://via.placeholder.com/400x300?text=Flamengo+vs+Palmeiras',
        matchviewUrl: 'https://www.scorebat.com/embed/matchview/12346/',
        videos: [{ title: 'Destaques', embed: '<iframe width="560" height="315" src="https://www.youtube.com/embed/dQw4w9WgXcQ" title="Destaques" frameborder="0" allowfullscreen></iframe>' }]
    },
    {
        title: 'Grêmio 0-0 Internacional',
        competition: 'BRASIL: Brasileirão',
        date: '2026-05-10T20:30:00+00:00',
        thumbnail: 'https://via.placeholder.com/400x300?text=Gremio+vs+Inter',
        matchviewUrl: 'https://www.scorebat.com/embed/matchview/12347/',
        videos: [{ title: 'Destaques', embed: '<iframe width="560" height="315" src="https://www.youtube.com/embed/dQw4w9WgXcQ" title="Destaques" frameborder="0" allowfullscreen></iframe>' }]
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
    playersContainer.innerHTML = '';
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
// FUNÇÃO: Carregar Dados de Partidas
// Simula uma requisição à API
// ========================================
async function loadPlayers() {
    try {
        showLoading(true);
        errorAlert.style.display = 'none';

        await new Promise(resolve => setTimeout(resolve, 400));

        const matches = await fetchMatches();
        allPlayers = matches.map((match, index) => ({ ...match, id: index }));
        filteredPlayers = [...allPlayers];
        populatePositionFilter();
        displayPlayers(filteredPlayers);
        showSuccess();

    } catch (error) {
        console.error('Erro ao carregar partidas:', error);
        showError('Erro ao carregar dados das partidas.');
    } finally {
        showLoading(false);
    }
}

// ========================================
// FUNÇÃO: Popular Filtro de Competições
// ========================================
function populatePositionFilter() {
    const competitions = new Set(allPlayers.map(p => p.competition || 'Desconhecido'));
    const positionSelect = document.getElementById('position-filter');

    Array.from(competitions).sort().forEach(competition => {
        const option = document.createElement('option');
        option.value = competition;
        option.textContent = competition;
        positionSelect.appendChild(option);
    });
}

// ========================================
// FUNÇÃO: Exibir Partidas no DOM
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
// FUNÇÃO: Criar Card de Partida
// ========================================
function createPlayerCard(player) {
    const col = document.createElement('div');
    col.className = 'col-md-6 col-lg-4';

    const matchDate = player.date ? new Date(player.date).toLocaleString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    }) : 'Data não disponível';

    const card = document.createElement('div');
    card.className = 'player-card';
    card.innerHTML = `
        <div class="player-card-header">
            <img src="${player.thumbnail || 'https://via.placeholder.com/400x300?text=Partida'}" class="img-fluid mb-3" alt="${player.title}">
            <h5>${player.title}</h5>
            <span class="text-muted">${player.competition || 'Competição desconhecida'}</span>
        </div>
        <div class="player-card-body">
            <div class="player-info">
                <strong>Data:</strong>
                <span>${matchDate}</span>
            </div>
            <div class="player-info">
                <strong>Vídeo:</strong>
                <span>${player.videos?.[0]?.title || 'Sem vídeo'}</span>
            </div>
        </div>
        <div class="player-card-footer">
            <a href="detalhes.html?id=${player.id}" class="btn-details" target="_blank" rel="noopener">Ver Detalhes →</a>
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
// FUNÇÃO: Filtrar Partidas
// ========================================
function filterPlayers() {
    const searchTerm = searchInput.value.toLowerCase();
    const selectedCompetition = positionFilter.value;

    filteredPlayers = allPlayers.filter(player => {
        const matchesSearch =
            player.title.toLowerCase().includes(searchTerm) ||
            player.competition?.toLowerCase().includes(searchTerm);

        const matchesCompetition = !selectedCompetition || player.competition === selectedCompetition;

        return matchesSearch && matchesCompetition;
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
