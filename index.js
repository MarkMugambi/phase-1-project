const scoresContainer = document.getElementById('live-scores');
const refreshButton = document.getElementById('refresh-button');
const lastUpdatedSpan = document.getElementById('last-updated');
const filterBySport = document.getElementById('filter-by-sport');
const filterByLeague = document.getElementById('filter-by-league');
const searchBar = document.getElementById('search-bar');
const searchButton = document.getElementById('search-button');
const favoriteTeamsList = document.getElementById('favorite-teams');

const baseUrl = 'https://rapidapi.com/apidojo/api/livescore6'; 
let favoriteTeams = []; // Array to store favorite team IDs

const RapidAPIConnect = require('rapidapi-connect'); // Install rapidapi-connect library

const apiKey = 'YOUR_RAPIDAPI_KEY'; // Replace with your actual API key
const host = 'apidojo.com'; // Host for LiveScore6 API

const rapidApi = new RapidAPIConnect(apiKey, host);

// Function to display a single match
function displayMatch(match) {
  const matchElement = document.createElement('li');
  matchElement.classList.add('match');

  const team1Element = document.createElement('span');
  team1Element.classList.add('team', 'team-home');
  team1Element.textContent = match.team1;
  matchElement.appendChild(team1Element);

  const scoreElement = document.createElement('span');
  scoreElement.classList.add('score');
  scoreElement.textContent = `${match.score1} - ${match.score2}`;
  matchElement.appendChild(scoreElement);

  const team2Element = document.createElement('span');
  team2Element.classList.add('team', 'team-away');
  team2Element.textContent = match.team2;
  matchElement.appendChild(team2Element);

  if (match.status) {
    const statusElement = document.createElement('span');
    statusElement.classList.add('status');
    statusElement.textContent = match.status;
    matchElement.appendChild(statusElement);
  }

  // Add a button to toggle favorites (implementation included)
  const favoriteButton = document.createElement('button');
  favoriteButton.classList.add('favorite-btn');
  if (isFavorite(match.id)) {
    favoriteButton.classList.add('active');
    favoriteButton.textContent = 'Remove Favorite';
  } else {
    favoriteButton.textContent = 'Add Favorite';
  }
  favoriteButton.addEventListener('click', () => {
    toggleFavorite(match.id);
  });
  matchElement.appendChild(favoriteButton);

  scoresContainer.appendChild(matchElement);
}

// Function to check if a team is favorited
function isFavorite(teamId) {
  return favoriteTeams.includes(teamId);
}

// Function to toggle a team as favorite
function toggleFavorite(teamId) {
  if (isFavorite(teamId)) {
    favoriteTeams = favoriteTeams.filter(id => id !== teamId);
  } else {
    favoriteTeams.push(teamId);
  }
  updateFavoriteTeamsList();
}

// Function to update the list of favorite teams
function updateFavoriteTeamsList() {
  favoriteTeamsList.innerHTML = ''; // Clear existing favorites
  if (favoriteTeams.length > 0) {
    favoriteTeams.forEach(teamId => {
      const favoriteTeamElement = document.createElement('li');
      favoriteTeamElement.textContent = `Team ID: ${teamId}`;
      favoriteTeamsList.appendChild(favoriteTeamElement);
    });
  } else {
    favoriteTeamsList.textContent = 'No favorite teams yet.';
  }
}

// Function to update last updated time
function updateLastUpdated() {
  const now = new Date();
  lastUpdatedSpan.textContent = `Last Updated: ${now.toLocaleTimeString()}`;
}

// Function to fetch live scores
JavaScript
async function fetchLiveScores() {
  try {
    const options = {
      url: '/v2/sports',
      params: {
        q: filterBySport.value, // Filter by sport
        leagues: filterByLeague.value, // Optional filter by league (if available)
      },
      headers: {
        'x-rapidapi-host': host,
        'x-rapidapi-key': apiKey,
      },
    };

    const response = await rapidApi.get(options);
    // ... (process response data)
  } catch (error) {
    console.error('Error:', error);
  }
}