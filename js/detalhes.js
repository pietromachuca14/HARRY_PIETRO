// ========================================
// PÁGINA DE DETALHES - PARTIDAS DE FUTEBOL
// AV1 DWB - Pietro - Parte 2
// ========================================

const API_URL = 'https://www.scorebat.com/video-api/v3/';

// Função para buscar as partidas na API pública do Scorebat
async function fetchMatches() {
    try {
        const res = await fetch(API_URL);
        if (!res.ok) throw new Error(`Falha ao buscar API: ${res.status}`);
        const data = await res.json();
        return Array.isArray(data.response) ? data.response : [];
    } catch (err) {
        console.error('Erro ao carregar partidas da API', err);
        return [
            {
                title: 'Atlético 2-1 Santos',
                competition: 'BRASIL: Brasileirão',
                date: '2026-05-08T19:30:00+00:00',
                thumbnail: 'https://via.placeholder.com/400x300?text=Atl%C3%A9tico+vs+Santos',
                matchviewUrl: 'https://www.scorebat.com/embed/matchview/12345/',
                videos: [{ title: 'Destaques', embed: '<iframe width="560" height="315" src="https://www.youtube.com/embed/dQw4w9WgXcQ" title="Destaques" frameborder="0" allowfullscreen></iframe>' }]
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
// FUNÇÃO: Buscar Partida
// ========================================
async function loadPlayerDetails() {
    try {
        showLoading(true);
        const playerId = getPlayerIdFromURL();

        if (!playerId) {
            showNotFound();
            return;
        }

        const players = await fetchMatches();
        const matchesWithId = players.map((match, index) => ({ ...match, id: index }));
        const player = matchesWithId.find(p => p.id == playerId);

        if (!player) {
            showNotFound();
            return;
        }

        displayPlayerDetails(player);

    } catch (error) {
        console.error('Erro ao carregar detalhes:', error);
        showError('Erro ao carregar os detalhes da partida.');
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
// FUNÇÃO: Exibir Detalhes da Partida
// ========================================
function displayPlayerDetails(player) {
    errorAlert.style.display = 'none';
    notFound.style.display = 'none';

    const matchDate = player.date ? new Date(player.date).toLocaleString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    }) : 'Data não disponível';

    const videoEmbed = player.videos?.[0]?.embed || '';

    const html = `
        <div class="col-lg-8">
            <div class="card player-card mb-4">
                <img src="${player.thumbnail || 'https://via.placeholder.com/400x300?text=Partida'}" class="card-img-top" alt="${player.title}" style="height: 300px; object-fit: cover;">
                
                <div class="player-card-body">
                    <h1 class="mb-2">${player.title}</h1>
                    <h5 class="text-muted mb-3">${player.competition || 'Competição desconhecida'}</h5>
                    
                    <p class="text-dark"><strong>Data:</strong> ${matchDate}</p>
                    <p class="text-dark"><strong>Link oficial:</strong> <a href="${player.matchviewUrl}" target="_blank" rel="noopener">Abrir no Scorebat</a></p>

                    <div class="player-highlight mb-4">
                        <strong>Competição:</strong> <span>${player.competition || 'Sem informação'}</span>
                    </div>

                    <div class="mb-4">
                        <h5 class="mb-3">Vídeo dos destaques</h5>
                        <div class="ratio ratio-16x9">
                            ${videoEmbed}
                        </div>
                    </div>

                    <div class="mt-4">
                        <a href="index.html" class="btn btn-primary btn-lg">← Voltar para Listagem</a>
                    </div>
                </div>
            </div>
        </div>

        <div class="col-lg-4">
            <div class="card mb-4">
                <div class="card-header bg-primary text-white">
                    <h5 class="mb-0">📌 Detalhes da Partida</h5>
                </div>
                <div class="card-body">
                    <p><strong>Título:</strong><br>${player.title}</p>
                    <p><strong>Competição:</strong><br>${player.competition || 'Sem dados'}</p>
                    <p><strong>Data:</strong><br>${matchDate}</p>
                    <p><strong>Vídeo:</strong><br>${player.videos?.[0]?.title || 'Não disponível'}</p>
                </div>
            </div>

            <div class="card">
                <div class="card-header bg-info text-white">
                    <h5 class="mb-0">ℹ️ Informações</h5>
                </div>
                <div class="card-body">
                    <p class="small">Esta página mostra detalhes de uma partida de futebol usando a API pública do Scorebat e JavaScript assíncrono.</p>
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
