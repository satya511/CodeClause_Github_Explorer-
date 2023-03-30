const BASE_URL = 'https://api.github.com';

function getUser(username) {
    return fetch(`${BASE_URL}/users/${username}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            return response.json();
        });
}

function getRepos(username) {
    return fetch(`${BASE_URL}/users/${username}/repos`)
        .then(response => {
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            return response.json();
        });
}

function getFollowers(username) {
    return fetch(`${BASE_URL}/users/${username}/followers`)
        .then(response => {
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            return response.json();
        });
}

function displayResults(user, repos, followers) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = `
		<h2>${user.name}</h2>
		<p>Number of repositories: ${repos.length}</p>
		<p>Number of followers: ${followers.length}</p>
	`;
}

document.getElementById('search-btn').addEventListener('click', () => {
    const username = document.getElementById('username').value;

    getUser(username)
        .then(user => {
            return Promise.all([
                user,
                getRepos(username),
                getFollowers(username)
            ]);
        })
        .then(([user, repos, followers]) => {
            displayResults(user, repos, followers);
        })
        .catch(error => {
            alert(`Error: ${error.message}`);
        });
});