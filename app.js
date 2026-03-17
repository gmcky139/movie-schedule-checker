const DATA_URL = 'https://raw.githubusercontent.com/gmcky139/movie-schedule-api/refs/heads/main/movies.json';

async function fetchMovies(){
    const statusMessageEl = document.getElementById('status_message');
    const cinemasContainerEl = document.getElementById('cinemas_container');

    try{
        const response = await fetch(DATA_URL + "?t=" + new Date().getTime());
        const data = await response.json();

        // 読み込み中の文字を消して、コンテナを空にする
        statusMessageEl.style.display = "none";
        cinemasContainerEl.innerHTML = "";

        data.forEach(cinema => {
            const cinemaTitle = document.createElement('h2');
            cinemaTitle.className = 'cinema_title';
            cinemaTitle.textContent = `${cinema.cinema_name}`;
            cinemasContainerEl.appendChild(cinemaTitle);

            const movieList = document.createElement('ul');
            movieList.className = 'movie_list';

            cinema.movies.forEach(movie => {
                const li = document.createElement('li');
                li.textContent = movie;
                movieList.appendChild(li);
            });

            cinemasContainerEl.appendChild(movieList);
        });
    }
    catch(error){
        console.error('映画のデータの取得に失敗しました:', error);
        statusMessageEl.style.display = "block";
        statusMessageEl.textContent = "データの読み込みに失敗しました ";
    }
}

fetchMovies();