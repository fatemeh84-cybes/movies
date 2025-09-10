// داده‌های نمونه فیلم‌ها
let movies = [
    {
        id: 1,
        title: "پدرخوانده",
        director: "فرانسیس فورد کوپولا",
        year: "1972",
        thumbnail: "https://m.media-amazon.com/images/M/MV5BM2MyNjYxNmUtYTAwNi00MTYxLWJmNWYtYzZlODY3ZTk3OTFlXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg",
        video: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
        comments: ["فیلم فوق‌العاده‌ای بود!", "دونالد ساترلند عالی بود"]
    },
    {
        id: 2,
        title: "رستگاری در شاوشنک",
        director: "فرانک دارابونت",
        year: "1994",
        thumbnail: "https://m.media-amazon.com/images/M/MV5BNDE3ODcxYzMtY2YzZC00NmNlLWJiNDMtZDViZWM2MzIxZDYwXkEyXkFqcGdeQXVyNjAwNDUxODI@._V1_FMjpg_UX1000_.jpg",
        video: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
        comments: ["امیدبخش و زیبا", "یکی از بهترین فیلم‌های تاریخ"]
    }
];

// ذخیره فیلم‌ها در localStorage در صورت عدم وجود
if (!localStorage.getItem('movies')) {
    localStorage.setItem('movies', JSON.stringify(movies));
} else {
    movies = JSON.parse(localStorage.getItem('movies'));
}

// المنت‌های DOM
const homeBtn = document.getElementById('home-btn');
const addMovieBtn = document.getElementById('add-movie-btn');
const helpBtn = document.getElementById('help-btn');
const backBtn = document.getElementById('back-btn');
const backFromWatchBtn = document.getElementById('back-from-watch-btn');
const submitMovieBtn = document.getElementById('submit-movie-btn');

const homeSection = document.getElementById('home-section');
const detailSection = document.getElementById('detail-section');
const watchSection = document.getElementById('watch-section');
const addMovieSection = document.getElementById('add-movie-section');
const helpSection = document.getElementById('help-section');

const moviesContainer = document.getElementById('movies-container');
const movieDetail = document.getElementById('movie-detail');
const videoPlayer = document.getElementById('video-player');

// نمایش فیلم‌ها در صفحه اصلی
function renderMovies() {
    moviesContainer.innerHTML = '';
    movies.forEach(movie => {
        const movieCard = document.createElement('div');
        movieCard.className = 'movie-card';
        movieCard.innerHTML = `
            <img src="${movie.thumbnail}" alt="${movie.title}" class="movie-thumbnail">
            <div class="movie-info">
                <div class="movie-title">${movie.title}</div>
                <div class="movie-director">کارگردان: ${movie.director}</div>
                <div class="movie-year">سال: ${movie.year}</div>
            </div>
        `;
        movieCard.addEventListener('click', () => showMovieDetail(movie.id));
        moviesContainer.appendChild(movieCard);
    });
}

// نمایش جزئیات فیلم
function showMovieDetail(movieId) {
    const movie = movies.find(m => m.id === movieId);
    if (!movie) return;
    
    movieDetail.innerHTML = `
        <div class="movie-detail-header">
            <img src="${movie.thumbnail}" alt="${movie.title}" class="movie-detail-thumbnail">
            <h2 class="movie-detail-title">${movie.title}</h2>
            <div class="movie-detail-meta">
                <span>کارگردان: ${movie.director}</span>
                <span>سال: ${movie.year}</span>
            </div>
        </div>
        
        <div class="action-buttons">
            <button class="btn btn-primary" onclick="downloadMovie(${movieId})">
                <i class="fas fa-download"></i> دانلود فیلم
            </button>
            <button class="btn btn-secondary" onclick="watchMovie(${movieId})">
                <i class="fas fa-play"></i> تماشای فیلم
            </button>
        </div>
        
        <div class="comments-section">
            <h3>نظرات کاربران</h3>
            <div class="comments-list" id="comments-${movieId}">
                ${movie.comments.map(comment => `<div class="comment">${comment}</div>`).join('')}
            </div>
            
            <div class="comment-form">
                <textarea id="comment-text-${movieId}" placeholder="نظر خود را بنویسید..."></textarea>
                <button class="btn btn-primary" onclick="addComment(${movieId})">
                    <i class="fas fa-paper-plane"></i> ثبت نظر
                </button>
            </div>
        </div>
    `;
    
    showSection(detailSection);
}

// جستجوی خودکار تصویر
function searchPoster() {
    const title = document.getElementById('movie-title').value;
    if (!title) {
        alert('لطفا ابتدا عنوان فیلم را وارد کنید');
        return;
    }
    
    const searchPanel = document.getElementById('search-poster');
    const resultsContainer = document.getElementById('search-results');
    
    // نمایش پیوند لودینگ
    resultsContainer.innerHTML = '<p>در حال جستجو...</p>';
    searchPanel.style.display = 'block';
    
    // در یک برنامه واقعی، اینجا باید یک درخواست به API تصاویر ارسال شود
    // برای نمونه، ما از تصاویر ثابت استفاده می‌کنیم
    setTimeout(() => {
        resultsContainer.innerHTML = `
            <div class="poster-option" onclick="selectPoster('https://m.media-amazon.com/images/M/MV5BM2MyNjYxNmUtYTAwNi00MTYxLWJmNWYtYzZlODY3ZTk3OTFlXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg')">
                <img src="https://m.media-amazon.com/images/M/MV5BM2MyNjYxNmUtYTAwNi00MTYxLWJmNWYtYzZlODY3ZTk3OTFlXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg" alt="پوستر 1">
            </div>
            <div class="poster-option" onclick="selectPoster('https://m.media-amazon.com/images/M/MV5BNDE3ODcxYzMtY2YzZC00NmNlLWJiNDMtZDViZWM2MzIxZDYwXkEyXkFqcGdeQXVyNjAwNDUxODI@._V1_FMjpg_UX1000_.jpg')">
                <img src="https://m.media-amazon.com/images/M/MV5BNDE3ODcxYzMtY2YzZC00NmNlLWJiNDMtZDViZWM2MzIxZDYwXkEyXkFqcGdeQXVyNjAwNDUxODI@._V1_FMjpg_UX1000_.jpg" alt="پوستر 2">
            </div>
            <div class="poster-option" onclick="selectPoster('https://m.media-amazon.com/images/M/MV5BNGNhMDIzZTUtNTBlZi00MTRlLWFjM2ItYzJjNDymEXKjVlXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg')">
                <img src="https://m.media-amazon.com/images/M/MV5BNGNhMDIzZTUtNTBlZi00MTRlLWFjM2ItYzJjNDymEXKjVlXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg" alt="پوستر 3">
            </div>
        `;
    }, 1500);
}

// انتخاب تصویر از نتایج جستجو
function selectPoster(url) {
    document.getElementById('movie-thumbnail').value = url;
    document.getElementById('search-poster').style.display = 'none';
    alert('تصویر انتخاب شد!');
}

// دانلود فیلم
function downloadMovie(movieId) {
    const movie = movies.find(m => m.id === movieId);
    if (!movie) return;
    
    alert(`در حال دانلود فیلم: ${movie.title}`);
    
    // شبیه‌سازی دانلود
    const a = document.createElement('a');
    a.href = movie.video;
    a.download = `${movie.title}.mp4`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

// تماشای فیلم
function watchMovie(movieId) {
    const movie = movies.find(m => m.id === movieId);
    if (!movie) return;
    
    videoPlayer.src = movie.video;
    showSection(watchSection);
    
    setTimeout(() => {
        videoPlayer.play().catch(e => {
            console.log('اتوماتیک پخش نشد، نیاز به تعامل کاربر');
        });
    }, 500);
}

// افزودن نظر
function addComment(movieId) {
    const commentText = document.getElementById(`comment-text-${movieId}`).value;
    if (!commentText.trim()) return;
    
    const movieIndex = movies.findIndex(m => m.id === movieId);
    if (movieIndex === -1) return;
    
    movies[movieIndex].comments.push(commentText);
    localStorage.setItem('movies', JSON.stringify(movies));
    
    const commentsList = document.getElementById(`comments-${movieId}`);
    const newComment = document.createElement('div');
    newComment.className = 'comment';
    newComment.textContent = commentText;
    commentsList.appendChild(newComment);
    
    document.getElementById(`comment-text-${movieId}`).value = '';
}

// افزودن فیلم جدید
submitMovieBtn.addEventListener('click', () => {
    const title = document.getElementById('movie-title').value;
    const director = document.getElementById('movie-director').value;
    const year = document.getElementById('movie-year').value;
    const thumbnail = document.getElementById('movie-thumbnail').value;
    const video = document.getElementById('movie-video').value;
    
    if (!title || !director || !year || !thumbnail || !video) {
        alert('لطفا تمام فیلدها را پر کنید');
        return;
    }
    
    const newMovie = {
        id: movies.length > 0 ? Math.max(...movies.map(m => m.id)) + 1 : 1,
        title,
        director,
        year,
        thumbnail,
        video,
        comments: []
    };
    
    movies.push(newMovie);
    localStorage.setItem('movies', JSON.stringify(movies));
    
    document.getElementById('movie-title').value = '';
    document.getElementById('movie-director').value = '';
    document.getElementById('movie-year').value = '';
    document.getElementById('movie-thumbnail').value = '';
    document.getElementById('movie-video').value = '';
    
    alert('فیلم با موفقیت افزوده شد');
    showSection(homeSection);
    renderMovies();
});

// تغییر بین بخش‌ها
function showSection(section) {
    homeSection.classList.remove('active');
    detailSection.classList.remove('active');
    watchSection.classList.remove('active');
    addMovieSection.classList.remove('active');
    helpSection.classList.remove('active');
    
    section.classList.add('active');
    
    window.scrollTo(0, 0);
}

// مدیریت ناوبری
homeBtn.addEventListener('click', () => {
    showSection(homeSection);
    setActiveButton(homeBtn);
});

addMovieBtn.addEventListener('click', () => {
    showSection(addMovieSection);
    setActiveButton(addMovieBtn);
});

helpBtn.addEventListener('click', () => {
    showSection(helpSection);
    setActiveButton(helpBtn);
});

backBtn.addEventListener('click', () => {
    showSection(homeSection);
    setActiveButton(homeBtn);
});

backFromWatchBtn.addEventListener('click', () => {
    videoPlayer.pause();
    showSection(detailSection);
});

function setActiveButton(btn) {
    homeBtn.classList.remove('active');
    addMovieBtn.classList.remove('active');
    helpBtn.classList.remove('active');
    btn.classList.add('active');
}

// مقداردهی اولیه
document.addEventListener('DOMContentLoaded', function() {
    renderMovies();
});
