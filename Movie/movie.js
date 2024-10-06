$(document).ready(function() {
    // Function to filter movies based on category and search query
    function filterMovies() {
        const query = $('#searchInput').val().toLowerCase();
        const category = $('#categorySelect').val();

        $('.movie-card').on('click', function() {
            const movieDetails = $(this).find('.movie-details');
            const isVisible = movieDetails.is(':visible');
            
            // Hide all other movie details
            $('.movie-details').slideUp();
            
            // Zoom out effect
            $('.movie-card').css('transform', 'scale(1)'); // Reset other cards
            if (!isVisible) {
                $(this).css('transform', 'scale(1.1)'); // Zoom in the clicked card
                movieDetails.slideDown();
            } else {
                $(this).css('transform', 'scale(1)'); // Reset if already visible
            }
        });
    }

    // Search button click
    $('#searchButton').on('click', filterMovies);

    // Optional: Search on Enter key press
    $('#searchInput').on('keypress', function(e) {
        if (e.which === 13) { // Enter key
            $('#searchButton').click();
        }
    });

    // Category change
    $('#categorySelect').on('change', function() {
        const selectedCategory = $(this).val();
        if (selectedCategory !== 'all') {
            $('html, body').animate({
                scrollTop: $(`#${selectedCategory}`).offset().top
            }, 500);
        }
        filterMovies(); // Filter movies as well
    });

    // Toggle functionality for movie sections
    $('.toggle-arrow').on('click', function() {
        const section = $(this).closest('h2').next('.movie-section'); // Select the next movie-section
        section.slideToggle(); // Toggle visibility
        const icon = $(this).find('i');
        icon.toggleClass('fa-chevron-down fa-chevron-up'); // Change arrow direction
    });

    // Optional: Expand sections on mouse enter
    $('.movie-list').hover(
        function() {
            $(this).find('.movie-section').stop(true, true).slideDown();
        },
        function() {
            $(this).find('.movie-section').stop(true, true).slideUp();
        }
    );
});