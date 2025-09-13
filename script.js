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

// نمایش فیلم‌ها در صفحه اصلی
function renderMovies() {
    const moviesContainer = document.getElementById('movies-container');
    if (!moviesContainer) return;
    
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
    
    const movieDetail = document.getElementById('movie-detail');
    if (!movieDetail) return;
    
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
    
    showSection(document.getElementById('detail-section'));
}

// جستجوی خودکار تصویر
function searchPoster() {
    const title = document.getElementById('movie-title');
    if (!title || !title.value) {
        alert('لطفا ابتدا عنوان فیلم را وارد کنید');
        return;
    }
    
    const searchPanel = document.getElementById('search-poster');
    const resultsContainer = document.getElementById('search-results');
    
    if (!searchPanel || !resultsContainer) return;
    
    // نمایش پیوند لودینگ
    resultsContainer.innerHTML = '<p>در حال جستجو...</p>';
    searchPanel.style.display = 'block';
    
    // شبیه‌سازی جستجو
    setTimeout(() => {
        resultsContainer.innerHTML = `
            <div class="poster-option" onclick="selectPoster('https://m.media-amazon.com/images/M/MV5BM2MyNjYxNmUtYTAwNi00MTYxLWJmNWYtYzZlODY3ZTk3OTFlXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg')">
                <img src="https://m.media-amazon.com/images/M/MV5BM2MyNjYxNmUtYTAwNi00MTYxLWJmNWYtYzZlODY3ZTk3OTFlXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg" alt="پوستر 1">
            </div>
            <div class="poster-option" onclick="selectPoster('https://m.media-amazon.com/images/M/MV5BNDE3ODcxYzMtY2YzZC00NmNlLWJiNDMtZDViZWM2MzIxZDYwXkEyXkFqcGdeQXVyNjAwNDUxODI@._V1_FMjpg_UX1000_.jpg')">
                <img src="https://m.media-amazon.com/images/M/MV5BNDE3ODcxYzMtY2YzZC00NmNlLWJiNDMtZDViZWM2MzIxZDYwXkEyXkFqcGdeQXVyNjAwNDUxODI@._V1_FMjpg_UX1000_.jpg" alt="پوستر 2">
            </div>
        `;
    }, 1000);
}

// انتخاب تصویر از نتایج جستجو
function selectPoster(url) {
    const thumbnailInput = document.getElementById('movie-thumbnail');
    const searchPanel = document.getElementById('search-poster');
    
    if (thumbnailInput) thumbnailInput.value = url;
    if (searchPanel) searchPanel.style.display = 'none';
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
    
    const videoPlayer = document.getElementById('video-player');
    if (!videoPlayer) return;
    
    videoPlayer.src = movie.video;
    showSection(document.getElementById('watch-section'));
    
    // تلاش برای پخش ویدیو
    setTimeout(() => {
        videoPlayer.play().catch(e => {
            console.log('پخش خودکار ممکن نیست، کاربر باید manually پخش کند');
        });
    }, 500);
}

// افزودن نظر
function addComment(movieId) {
    const commentTextElement = document.getElementById(`comment-text-${movieId}`);
    if (!commentTextElement) return;
    
    const commentText = commentTextElement.value;
    if (!commentText.trim()) {
        alert('لطفا متن نظر را وارد کنید');
        return;
    }
    
    const movieIndex = movies.findIndex(m => m.id === movieId);
    if (movieIndex === -1) return;
    
    movies[movieIndex].comments.push(commentText);
    localStorage.setItem('movies', JSON.stringify(movies));
    
    const commentsList = document.getElementById(`comments-${movieId}`);
    if (commentsList) {
        const newComment = document.createElement('div');
        newComment.className = 'comment';
        newComment.textContent = commentText;
        commentsList.appendChild(newComment);
    }
    
    commentTextElement.value = '';
    alert('نظر شما با موفقیت ثبت شد!');
}

// افزودن فیلم جدید
function addNewMovie() {
    const title = document.getElementById('movie-title');
    const director = document.getElementById('movie-director');
    const year = document.getElementById('movie-year');
    const thumbnail = document.getElementById('movie-thumbnail');
    const video = document.getElementById('movie-video');
    
    if (!title || !director || !year || !thumbnail || !video) {
        alert('خطا در پیدا کردن فیلدهای فرم');
        return;
    }
    
    if (!title.value || !director.value || !year.value || !thumbnail.value || !video.value) {
        alert('لطفا تمام فیلدها را پر کنید');
        return;
    }
    
    const newMovie = {
        id: movies.length > 0 ? Math.max(...movies.map(m => m.id)) + 1 : 1,
        title: title.value,
        director: director.value,
        year: year.value,
        thumbnail: thumbnail.value,
        video: video.value,
        comments: []
    };
    
    movies.push(newMovie);
    localStorage.setItem('movies', JSON.stringify(movies));
    
    // پاک کردن فرم
    title.value = '';
    director.value = '';
    year.value = '';
    thumbnail.value = '';
    video.value = '';
    
    alert('فیلم با موفقیت افزوده شد!');
    showSection(document.getElementById('home-section'));
    renderMovies();
}

// تغییر بین بخش‌ها
function showSection(section) {
    if (!section) return;
    
    const sections = document.querySelectorAll('.section');
    sections.forEach(sec => sec.classList.remove('active'));
    
    section.classList.add('active');
    window.scrollTo(0, 0);
}

// مدیریت ناوبری
function setActiveButton(btn) {
    const buttons = document.querySelectorAll('nav button');
    buttons.forEach(b => b.classList.remove('active'));
    if (btn) btn.classList.add('active');
}

// برگشت به خانه
function goHome() {
    showSection(document.getElementById('home-section'));
    setActiveButton(document.getElementById('home-btn'));
}

// برگشت از تماشای فیلم
function backFromWatch() {
    const videoPlayer = document.getElementById('video-player');
    if (videoPlayer) {
        videoPlayer.pause();
        videoPlayer.src = '';
    }
    showSection(document.getElementById('detail-section'));
}

// مقداردهی اولیه
document.addEventListener('DOMContentLoaded', function() {
    // تنظیم event listeners برای دکمه‌های ناوبری
    const homeBtn = document.getElementById('home-btn');
    const addMovieBtn = document.getElementById('add-movie-btn');
    const helpBtn = document.getElementById('help-btn');
    const backBtn = document.getElementById('back-btn');
    const backFromWatchBtn = document.getElementById('back-from-watch-btn');
    const submitMovieBtn = document.getElementById('submit-movie-btn');
    
    if (homeBtn) homeBtn.addEventListener('click', goHome);
    if (addMovieBtn) addMovieBtn.addEventListener('click', () => {
        showSection(document.getElementById('add-movie-section'));
        setActiveButton(addMovieBtn);
    });
    if (helpBtn) helpBtn.addEventListener('click', () => {
        showSection(document.getElementById('help-section'));
        setActiveButton(helpBtn);
    });
    if (backBtn) backBtn.addEventListener('click', goHome);
    if (backFromWatchBtn) backFromWatchBtn.addEventListener('click', backFromWatch);
    if (submitMovieBtn) submitMovieBtn.addEventListener('click', addNewMovie);
    
    // رندر اولیه فیلم‌ها
    renderMovies();
    
    console.log('اسکریپت با موفقیت لود شد!');
});

