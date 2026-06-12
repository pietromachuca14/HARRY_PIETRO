# AV1 DWB - Partidas de Futebol ⚽

**Avaliação:** Desenvolvimento de Websites (DWB) - Parte 1

**Aluno:** Pietro  
**Data de Entrega:** 08/05/2026  
**Tipo:** Projeto Prático Individual

---

## 📋 Descrição do Projeto

Aplicação web que exibe uma lista de partidas de futebol em cards responsivos. Os dados são carregados de uma API pública usando JavaScript puro, HTML5, CSS3 e Bootstrap 5.

O projeto demonstra consumo assíncrono de API, renderização dinâmica no DOM e navegação para uma página de detalhes da partida.

---

## 🚀 Tecnologias Utilizadas

- HTML5
- CSS3
- Bootstrap 5
- JavaScript (ES6+)
- Fetch API
- Async/Await
- API pública Scorebat

---

## 📁 Estrutura do Projeto

```
av1-dwb-pietro-2bimestre/
│
├── index.html          # Página principal com listagem de partidas
├── detalhes.html       # Página de detalhes da partida
│
├── css/
│   └── style.css       # Estilos personalizados
│
├── js/
│   ├── script.js       # Lógica da página de listagem
│   └── detalhes.js     # Lógica da página de detalhes
│
├── README.md           # Documentação do projeto
└── .gitignore          # Arquivos ignorados pelo Git
```

---

## 🔌 Fonte de Dados

A aplicação consome dados da API pública do Scorebat:

`https://www.scorebat.com/video-api/v3/`

A resposta inclui partidas com título, competição, data, imagem em miniatura e vídeo de destaques.

### Exemplo de partida

```json
{
  "title": "Angers - PSG",
  "competition": "FRANCE: Ligue 1",
  "date": "2026-06-12T19:30:00+00:00",
  "thumbnail": "https://www.scorebat.com/thumbnail.jpg",
  "matchviewUrl": "https://www.scorebat.com/embed/matchview/123456/",
  "videos": [
    {
      "title": "Highlights",
      "embed": "<iframe ...></iframe>"
    }
  ]
}
```

### Comportamento em caso de falha

Se a API não estiver acessível, o projeto usa um fallback local de partidas definidas em `js/script.js` e `js/detalhes.js`.

---

## 🎯 Funcionalidades

- Listagem de partidas de futebol em cards responsivos
- Busca por título ou competição
- Filtro por competição
- Indicador de carregamento durante a requisição
- Mensagem quando não há resultados
- Página de detalhes com informações da partida e vídeo incorporado

---

## 💻 Como Usar

### Abrir localmente

A aplicação usa `fetch`, então é recomendado servir os arquivos com um servidor local.

Opções:

- Usar a extensão Live Server do VS Code
- Usar `python -m http.server` na pasta do projeto

```bash
cd c:\Users\pietro_machuca\HARRY_PIETRO\av1-dwb-pietro-2bimestre
python -m http.server 5500
```

Depois acesse:

`http://127.0.0.1:5500/index.html`

### Abrir diretamente

Também é possível abrir `index.html` diretamente, mas a requisição `fetch` pode falhar em alguns navegadores se o arquivo estiver sendo servido via protocolo `file://`.

---

## 🚀 Fluxo da Aplicação

1. A página `index.html` carrega `js/script.js`
2. `fetchMatches()` solicita dados à API do Scorebat
3. Os dados são transformados em objetos com `id`
4. O conteúdo é renderizado em cards
5. Busca e filtro atualizam os resultados em tempo real
6. O botão de detalhes leva a `detalhes.html?id=<id>`

---

## 🧠 Como o código funciona

### `js/script.js`

- `fetchMatches()` busca os dados da API
- `loadPlayers()` controla o carregamento, aplica fallback e inicia a renderização
- `populatePositionFilter()` preenche o filtro de competição
- `displayPlayers()` cria os cards de partidas
- `filterPlayers()` filtra por texto e competição

### `js/detalhes.js`

- `getPlayerIdFromURL()` lê o parâmetro `id`
- `loadPlayerDetails()` busca a lista de partidas e encontra a partida correta
- `displayPlayerDetails()` mostra detalhes, data formatada e o vídeo de destaque

---

## 📌 Observações

- A API pública do Scorebat não exige autenticação
- A lista de partidas pode variar conforme a resposta do servidor
- A página de detalhes depende do parâmetro `id` na URL

---

## ✅ Status

- Projeto alinhado ao consumo de API pública
- Busca e filtro funcionais
- Interface responsiva com Bootstrap
- Página de detalhes implementada

---

## 📄 Licença

Projeto criado para fins educacionais.

---

**Última atualização:** 12/06/2026
