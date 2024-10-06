$(document).ready(function() {
    // Toggle search input visibility
    $(".search_icon").click(function() {
        const searchInput = $("#searchInput");
        searchInput.toggleClass("visible");
        searchInput.focus();
    });

    // Search content as user types
    $("#searchInput").on("keyup", function(event) {
        const query = event.target.value.toLowerCase();
        const resultsContainer = $("#searchResults");
        resultsContainer.empty(); // Clear previous results

        // Define your search data; this can be links and titles of your content
        const data = [
            { title: "Movies", link: "Movie/movie.html" },
            { title: "Apps and Software", link: "Apps and Software/apps&software.html" },
            { title: "Tips and Tricks", link: "Tips and Tricks/tips&tricks.html" },
            { title: "Free ChatBot", link: "FreeChatbot/freechatbot.html" },
            { title: "About Us", link: "AboutUs/aboutus.html" },
            // Add more items as needed
        ];

        if (query) {
            const results = data.filter(item => item.title.toLowerCase().includes(query));
            results.forEach(item => {
                const resultItem = $("<div></div>").text(item.title);
                resultItem.on("click", function() {
                    window.location.href = item.link; // Redirect on click
                });
                resultsContainer.append(resultItem);
            });
            resultsContainer.show(); // Show results if there are any
        } else {
            resultsContainer.hide(); // Hide if input is empty
        }
    });

    // Hide results when clicking outside
    $(document).on("click", function(event) {
        if (!$(event.target).closest(".searchbar").length) {
            $("#searchResults").hide(); // Hide results
        }
    });

    // Discord link alert
    document.getElementById('discord-link').addEventListener('click', function(event) {
        event.preventDefault(); // Prevent the default anchor behavior
        alert('Not available'); // Show alert
    });
});