const DATA_URL = 'https://raw.githubusercontent.com/gmcky139/movie-schedule-api/refs/heads/main/api.json';

async function fetchMovies(){
    const statusMessageEl = document.getElementById('status_message');
    const cinemasContainerEl = document.getElementById('cinemas_container');

    try{
        const response = await fetch(DATA_URL + "?t=" + new Date().getTime());
        const data = await response.json();

        // 読み込み中の文字を消して、コンテナを空にする
        statusMessageEl.style.display = "none";
        cinemasContainerEl.innerHTML = "";

        // 📦 新しい api.json の構造に合わせて、2つのデータを取り出す
        const schedules = data.schedules;
        const movieDetails = data.movie_details;

        // data.forEach ではなく、schedules.forEach に変更！
        schedules.forEach(cinema => {
            const cinemaTitle = document.createElement('h2');
            cinemaTitle.className = 'cinema-title'; // CSSに合わせてハイフンにしました
            cinemaTitle.textContent = `${cinema.cinema_name}`;
            cinemasContainerEl.appendChild(cinemaTitle);

            // リストの枠組みを「グリッド（網目）」に変更
            const movieGrid = document.createElement('ul');
            movieGrid.className = 'movie-grid'; 

            cinema.movies.forEach(movieTitle => {
                // 1つの映画を表す「カード」を作成
                const card = document.createElement('li');
                card.className = 'movie-card';

                // 📸 ポスター画像を作成
                const img = document.createElement('img');
                // 図鑑（movieDetails）にその映画があり、かつ画像URLが存在するかチェック
                if (movieDetails[movieTitle] && movieDetails[movieTitle].poster_url) {
                    img.src = movieDetails[movieTitle].poster_url;
                } else {
                    // 画像が取得できなかった時用のダミーテキスト（後でNo Image画像にしてもOK）
                    img.alt = "画像なし";
                }

                // 📝 タイトルを作成
                const titleEl = document.createElement('p');
                titleEl.className = 'title';
                titleEl.textContent = movieTitle;

                // カードの中に、画像とタイトルを順番にガチャンと入れる
                card.appendChild(img);
                card.appendChild(titleEl);

                // 完成したカードをグリッドに追加
                movieGrid.appendChild(card);
            });

            cinemasContainerEl.appendChild(movieGrid);
        });
    }
    catch(error){
        console.error('映画のデータの取得に失敗しました:', error);
        statusMessageEl.style.display = "block";
        statusMessageEl.textContent = "データの読み込みに失敗しました ";
    }
}

fetchMovies();