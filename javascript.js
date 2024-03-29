$(document).ready(function () {
    //Array for searched topics to be added
    var topics = [];

    //Function with AJAX call to GIPHY; Q parameters for API link set to search term, limit 10 results
    //Create div with respective still and animate image sources with "data-state", "data-still" and "data-animate" attributes
    function displayGame() {

        var x = $(this).data("search");
        console.log(x);

        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + x + "&api_key=nVS5k6qOWoBkM38J5rqXcn127Vi5QSFz&limit=10";

        console.log(queryURL);

        $.ajax({
            url: queryURL,
            method: "GET"
        }).done(function (response) {
            var results = response.data;
            console.log(results);
            for (var i = 0; i < results.length; i++) {

                var gameDiv = $("<div class='col-md-4'>");

                var rating = results[i].rating;
                var defaultAnimatedSrc = results[i].images.fixed_height.url;
                var staticSrc = results[i].images.fixed_height_still.url;
                var gameImage = $("<img>");
                var p = $("<p>").text("Rating: " + rating);

                gameImage.attr("src", staticSrc);
                gameImage.addClass("gameGiphy");
                gameImage.attr("data-state", "still");
                gameImage.attr("data-still", staticSrc);
                gameImage.attr("data-animate", defaultAnimatedSrc);
                gameDiv.append(p);
                gameDiv.append(gameImage);
                $("#gifArea").prepend(gameDiv);

            }
        });
    }

    //Submit button click event takes search term from form input, trims and pushes to topics array, displays button
    $("#addGame").on("click", function (event) {
        event.preventDefault();
        var newGame = $("#gameInput").val().trim();
        topics.push(newGame);
        console.log(topics);
        $("#gameInput").val('');
        displayButtons();
    });

    //Function iterates through topics array to display button with array values in "myButtons" section of HTML
    function displayButtons() {
        $("#myButtons").empty();
        for (var i = 0; i < topics.length; i++) {
            var a = $('<button class="btn btn-primary">');
            a.attr("id", "game");
            a.attr("data-search", topics[i]);
            a.text(topics[i]);
            $("#myButtons").append(a);
        }
    }


    displayButtons();

    //Click event on button with id of "game" executes displayGamefunction
    $(document).on("click", "#game", displayGame);

    //Click event on gifs with class of "gameGiphy" executes pausePlayGifs function
    $(document).on("click", ".gameGiphy", pausePlayGifs);

    //Function accesses "data-state" attribute and depending on status, changes image source to "data-animate" or "data-still"
    function pausePlayGifs() {
        var state = $(this).attr("data-state");
        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
    }

});