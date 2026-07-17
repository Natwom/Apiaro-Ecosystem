/* ============================================
   APIARO — Music Player JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {
    // Music Player State
    let isPlaying = false;
    let currentSong = {
        title: 'Midnight Dreams',
        artist: 'Luna Eclipse',
        duration: 225 // seconds
    };
    let currentTime = 0;
    let progressInterval;

    // Elements
    const playBtn = document.getElementById('playBtn');
    const progressBar = document.getElementById('progressBar');
    const progressFill = document.getElementById('progressFill');
    const playerTitle = document.getElementById('playerTitle');
    const playerArtist = document.getElementById('playerArtist');
    const playerArt = document.getElementById('playerArt');

    // Play/Pause Toggle
    if (playBtn) {
        playBtn.addEventListener('click', togglePlay);
    }

    function togglePlay() {
        isPlaying = !isPlaying;
        const icon = playBtn.querySelector('i');
        
        if (isPlaying) {
            icon.className = 'fas fa-pause';
            startProgress();
        } else {
            icon.className = 'fas fa-play';
            stopProgress();
        }
    }

    // Progress Bar
    function startProgress() {
        progressInterval = setInterval(() => {
            currentTime += 1;
            const percentage = (currentTime / currentSong.duration) * 100;
            
            if (progressFill) {
                progressFill.style.width = percentage + '%';
            }
            
            if (currentTime >= currentSong.duration) {
                currentTime = 0;
                togglePlay();
            }
        }, 1000);
    }

    function stopProgress() {
        clearInterval(progressInterval);
    }

    // Click on progress bar to seek
    if (progressBar) {
        progressBar.addEventListener('click', (e) => {
            const rect = progressBar.getBoundingClientRect();
            const clickX = e.clientX - rect.left;
            const percentage = (clickX / rect.width) * 100;
            currentTime = (percentage / 100) * currentSong.duration;
            
            if (progressFill) {
                progressFill.style.width = percentage + '%';
            }
        });
    }

    // Song Selection
    const songItems = document.querySelectorAll('.song-item');
    songItems.forEach(item => {
        const playButton = item.querySelector('.song-play');
        const likeButton = item.querySelector('.song-like');
        
        if (playButton) {
            playButton.addEventListener('click', () => {
                const songTitle = item.getAttribute('data-song');
                const artist = item.getAttribute('data-artist');
                
                // Update player
                if (playerTitle) playerTitle.textContent = songTitle;
                if (playerArtist) playerArtist.textContent = artist;
                
                // Update current song
                currentSong = {
                    title: songTitle,
                    artist: artist,
                    duration: 225
                };
                currentTime = 0;
                
                // Reset progress
                if (progressFill) progressFill.style.width = '0%';
                
                // Start playing
                if (!isPlaying) {
                    togglePlay();
                }
                
                // Update active state
                songItems.forEach(s => s.classList.remove('active'));
                item.classList.add('active');
            });
        }
        
        if (likeButton) {
            likeButton.addEventListener('click', () => {
                const icon = likeButton.querySelector('i');
                if (icon.classList.contains('far')) {
                    icon.classList.remove('far');
                    icon.classList.add('fas');
                    icon.style.color = '#f5576c';
                } else {
                    icon.classList.remove('fas');
                    icon.classList.add('far');
                    icon.style.color = '';
                }
            });
        }
    });

    // Player Controls
    const prevBtn = document.querySelector('.ctrl-btn:nth-child(2)');
    const nextBtn = document.querySelector('.ctrl-btn:nth-child(4)');
    
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            // Simulate previous song
            currentTime = 0;
            if (progressFill) progressFill.style.width = '0%';
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            // Simulate next song
            currentTime = 0;
            if (progressFill) progressFill.style.width = '0%';
        });
    }

    // Volume Control
    const volumeInput = document.querySelector('.volume-control input[type="range"]');
    if (volumeInput) {
        volumeInput.addEventListener('input', (e) => {
            const volume = e.target.value;
            console.log('Volume:', volume);
        });
    }

    // Album Card Click
    const albumCards = document.querySelectorAll('.album-card');
    albumCards.forEach(card => {
        card.addEventListener('click', () => {
            const albumTitle = card.querySelector('h4').textContent;
            const artist = card.querySelector('p').textContent;
            
            if (playerTitle) playerTitle.textContent = albumTitle;
            if (playerArtist) playerArtist.textContent = artist;
            
            currentTime = 0;
            if (progressFill) progressFill.style.width = '0%';
            
            if (!isPlaying) {
                togglePlay();
            }
        });
    });

    // Genre Card Click
    const genreCards = document.querySelectorAll('.genre-card');
    genreCards.forEach(card => {
        card.addEventListener('click', () => {
            const genre = card.querySelector('span').textContent;
            console.log('Selected genre:', genre);
        });
    });

    // Keyboard Shortcuts
    document.addEventListener('keydown', (e) => {
        if (e.code === 'Space' && e.target.tagName !== 'INPUT') {
            e.preventDefault();
            togglePlay();
        }
    });
});