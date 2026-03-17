const DATA_URL = 'https://raw.githubusercontent.com/gmcky139/movie-schedule-api/refs/heads/main/movies.json';

async function fetchMovies(){
    try{
        const response = await fetch(DATA_URL);
        const data = await response.json();

        const movieNameEl = document.getElementById('cinema_name');
        const movieListEl = document.getElementById('movie_list');

        movieNameEl.textContent = `${data.cinema_name}`;

        movieListEl.innerHTML = "";

        data.movies.forEach(movie => {
            const li = document.createElement('li');
            li.textContent = movie;
            movieListEl.appendChild(li);
        });
    }
    catch(error){
        console.error('映画のデータの取得に失敗しました:', error);
        document.getElementById('cinema_name').textContent = 'データの取得に失敗しました';
    }
}

fetchMovies();