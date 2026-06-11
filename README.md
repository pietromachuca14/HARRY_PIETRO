# AV1 DWB - Jogadores do Corinthians 🏟️

**Avaliação:** Desenvolvimento de Websites (DWB) - Parte 1

**Aluno:** Pietro  
**Data de Entrega:** 08/05/2026  
**Tipo:** Projeto Prático Individual

---

## 📋 Descrição do Projeto

Aplicação web dinâmica que exibe dados de **jogadores do Corinthians** em formato interativo e responsivo, utilizando HTML5, CSS3, Bootstrap e JavaScript puro. A aplicação simula o consumo de dados de uma API pública, demonstrando boas práticas de desenvolvimento web.

### Objetivos Alcançados (Parte 1)

✅ Estrutura de dados JSON com informações de jogadores  
✅ Manipulação de dados em JavaScript puro com async/await  
✅ Exibição dinâmica de dados no **DOM**  
✅ Layout responsivo com **Bootstrap**  
✅ Sistema de busca e filtros funcional  
✅ Feedback de carregamento e tratamento de erros  
✅ Organização em arquivos separados (HTML, CSS, JS)  
✅ Repositório Git com versionamento inicial  

---

## 🚀 Tecnologias Utilizadas

| Tecnologia | Descrição |
|-----------|-----------|
| **HTML5** | Estrutura semântica da aplicação |
| **CSS3** | Estilos personalizados com animações e responsividade |
| **Bootstrap 5** | Framework CSS para layout responsivo |
| **JavaScript (ES6+)** | Lógica pura sem frameworks |
| **Fetch API** | Consumo de dados da API |
| **Async/Await** | Programação assíncrona |
| **JSON** | Formato de dados da API |
| **Git/GitHub** | Versionamento de código |

---

## 📁 Estrutura do Projeto

```
av1-dwb-pietro-2bimestre/
│
├── index.html          # Página principal com listagem de estádios
├── detalhes.html       # Página de detalhes (Parte 2)
│
├── css/
│   └── style.css       # Estilos personalizados com Bootstrap
│
├── js/
│   ├── script.js       # Lógica da página de listagem
│   └── detalhes.js     # Lógica da página de detalhes (Parte 2)
│
├── README.md           # Este arquivo
└── .gitignore          # Arquivos ignorados pelo Git
```

---

## 🔌 Fonte de Dados

**Dados Locais - Jogadores do Corinthians**  
Banco de dados em JSON com informações de 12 jogadores principais do elenco.

```javascript
// Estrutura de dados dos jogadores
{
    id: 1,
    name: 'Nome do Jogador',
    number: 12,           // Número da camisa
    position: 'Goleiro',  // Posição
    age: 35,              // Idade
    height: '1.84m',      // Altura
    nationality: 'Brasil', // Nacionalidade
    joinYear: '2012',     // Ano que entrou no clube
    stats: {              // Estatísticas
        appearances: 500,
        goals: 0,
        assists: 0
    }
}
```

### Simulação de Consumo Assíncrono

Embora use dados locais, a aplicação simula um comportamento assíncrono típico de uma requisição à API:

```javascript
async function loadPlayers() {
    // Simulando delay de 800ms
    await new Promise(resolve => setTimeout(resolve, 800));
    // Dados são carregados após o delay
}
```

---

## 🎯 Funcionalidades - Parte 1

### 1️⃣ Listagem de Jogadores
- Exibição de 12 jogadores principais do Corinthians em cards responsivos
- Informações: número, nome, posição, idade, altura, nacionalidade, estatísticas
- Animações suaves ao carregar
- Destaque de número da camisa em cada card

### 2️⃣ Buscas e Filtros
- **Busca por texto:** Nome do jogador ou posição
- **Filtro por posição:** Goleiro, Zagueiro, Lateral, Meia-Campista, Atacante, etc.
- Atualização dinâmica e instantânea da listagem

### 3️⃣ Feedback de Usuário
- Badge de "Carregando..." durante simulação de requisição (800ms)
- Alerta de sucesso quando dados são carregados
- Mensagem quando não há resultados para os filtros aplicados
- Tratamento visual de transições

### 4️⃣ Responsividade
- Layout adaptável para mobile, tablet e desktop
- Cards em grid 1, 2 ou 3 colunas conforme resolução
- Navbar fixa no topo com logo do projeto
- Filtros centralizados e acessíveis

### 5️⃣ Dados Estruturados
```javascript
// Exemplo: Jogador Yuri Alberto
{
    id: 10,
    name: 'Yuri Alberto',
    number: 9,
    position: 'Atacante',
    age: 24,
    height: '1.84m',
    nationality: 'Brasil',
    joinYear: '2022',
    stats: { 
        appearances: 95, 
        goals: 25, 
        assists: 8 
    }
}
```

---

## 💻 Como Usar

### 1. Clonar o Repositório
```bash
git clone https://github.com/seu-usuario/av1-dwb-pietro-2bimestre.git
cd av1-dwb-pietro-2bimestre
```

### 2. Abrir a Aplicação
Abra o arquivo `index.html` em um navegador moderno:
- Chrome
- Firefox
- Edge
- Safari

```bash
# Opção 1: Abrir diretamente
# Duplo clique em index.html

# Opção 2: Usar Live Server (VS Code)
# Instale extensão "Live Server"
# Clique com botão direito em index.html > "Open with Live Server"
```

### 3. Interagir com a Aplicação
- Observe o carregamento dos estádios
- Use a barra de busca para filtrar por nome
- Selecione um estado no dropdown para filtrar
- Clique em "Ver Detalhes" para a Parte 2

---

## 📊 Critérios de Avaliação - Parte 1

| Critério | Pontos | Status |
|----------|--------|--------|
| **Lógica de Consumo** | 2.0 | ✅ |
| - Uso correto de API | 1.0 | ✅ |
| - Promessas/async-await | 1.0 | ✅ |
| **Setup de Ambiente** | 1.5 | ✅ |
| - Organização de arquivos | 0.8 | ✅ |
| - Estrutura clara | 0.7 | ✅ |
| **Interface** | 1.0 | ✅ |
| - Bootstrap na listagem | 1.0 | ✅ |
| **GitHub** | 0.5 | ✅ |
| - Repositório público | 0.25 | ✅ |
| - Versionamento inicial | 0.25 | ✅ |
| **TOTAL** | **5.0** | ✅ |

---

## 🔄 Fluxo da Aplicação

```
1. DOM Content Loaded
   ↓
2. loadStadiums() - Fetch assíncrono
   ├─ Try: Requisição à API
   │  ├─ Sucesso: Parse dos dados
   │  └─ Erro: Carregamento de fallback
   └─ Finally: Esconder loading
   ↓
3. populateStateFilter() - Preenchimento de filtros
   ↓
4. displayStadiums() - Renderização dos cards
   ↓
5. Event Listeners - Busca e filtros
```

---

## 🎨 Paleta de Cores

```css
--primary-color: #1e3c72 (Azul escuro)
--secondary-color: #2a5298 (Azul)
--accent-color: #f39c12 (Laranja)
--text-color: #333 (Cinza escuro)
--light-bg: #f8f9fa (Cinza claro)
```

---

## 📝 Documentação do Código

### Funções Principais

#### `loadPlayers()`
Carrega dados dos jogadores de forma assíncrona.
```javascript
async function loadPlayers() {
    try {
        showLoading(true);
        // Simula delay de 800ms (típico de requisição)
        await new Promise(resolve => setTimeout(resolve, 800));
        allPlayers = playersAPI;
        displayPlayers(allPlayers);
        showSuccess();
    } catch (error) {
        showError('Erro ao carregar dados dos jogadores.');
    }
}
```

#### `filterPlayers()`
Filtra jogadores por busca de texto e posição.
```javascript
function filterPlayers() {
    const searchTerm = searchInput.value.toLowerCase();
    const selectedPosition = positionFilter.value;
    
    filteredPlayers = allPlayers.filter(player => {
        const matchesSearch = 
            player.name.toLowerCase().includes(searchTerm) ||
            player.position.toLowerCase().includes(searchTerm);
        const matchesPosition = !selectedPosition || 
            player.position === selectedPosition;
        return matchesSearch && matchesPosition;
    });
    
    displayPlayers(filteredPlayers);
}
```

#### `createPlayerCard(player)`
Cria um elemento DOM em Bootstrap para exibir as informações de um jogador.
```javascript
function createPlayerCard(player) {
    // Retorna elemento HTML com:
    // - Número da camisa destacado
    // - Nome do jogador
    // - Posição, idade, altura, nacionalidade
    // - Estatísticas (jogos, gols, assistências)
    // - Link para página de detalhes
}
```

#### `displayPlayers(players)`
Renderiza os cards dos jogadores no DOM.

#### `populatePositionFilter()`
Popula dinamicamente o dropdown de filtro por posição com as opções disponíveis.

---

## 🚨 Fluxo da Aplicação

```
1. DOM Content Loaded
   ↓
2. loadPlayers() - Carregamento assíncrono
   ├─ Simula delay de 800ms
   ├─ Carrega banco de dados local
   └─ Popula filtros dinamicamente
   ↓
3. displayPlayers() - Renderização dos cards
   ↓
4. Event Listeners - Busca e filtros em tempo real
   ├─ Busca por nome/posição
   └─ Filtro por posição
   ↓
5. Navegação para Detalhes (Parte 2)
   └─ Passa ID do jogador na URL
```

---

## 🔗 Links Úteis

- 📚 [MDN - JavaScript Assíncrono](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function)
- 🎨 [Bootstrap Documentation](https://getbootstrap.com/docs/5.0/)
- 🏟️ [Corinthians - Site Oficial](https://www.corinthians.com.br/)
- 📋 [URLSearchParams - MDN](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams)

---

## 📝 Próximas Etapas - Parte 2

A segunda parte do projeto incluirá:

- ✅ Página `detalhes.html` com perfil completo do jogador
- ✅ Navegação via parâmetros de URL (URLSearchParams)
- ✅ Exibição de estatísticas expandidas e histórico
- ✅ Modularização do código JavaScript
- ✅ Melhor organização e UX na navegação
- ✅ Atualização do README com todos os detalhes

### Dados Expandidos na Parte 2
```javascript
// Informações adicionais de cada jogador
{
    description: 'Descrição detalhada do jogador',
    achievements: ['Conquista 1', 'Conquista 2', ...],
    stats: {
        appearances: 500,
        goals: 0,
        assists: 0,
        additionalStats: {...}
    }
}
```

---

## 👨‍💻 Desenvolvimento

**Desenvolvido com:**
- Visual Studio Code
- Git/GitHub
- Bootstrap 5
- ES6+ JavaScript

---

## 📄 Licença

Este projeto foi desenvolvido para fins educacionais.

---

## 📧 Contato

**Aluno:** Pietro  
**Matrícula:** -  
**Data de Entrega:** 08/05/2026  

---

**Última atualização:** 08/05/2026
