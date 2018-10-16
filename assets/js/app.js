var movies = ["alien", "comet", "rocky", "inception"];

//  var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + movies[i] + "&api_key=s62m25VSdI2GEDmSCqsdB8puDw7F6XRh&limit=20";



function renderButtons() {

    $("#buttons-view").empty();

    for (var i = 0; i < movies.length; i++) {
        var a = $("<button>");
        a.addClass("movie col-2");
        a.attr("data-name", movies[i])
        a.text(movies[i]);
        $("#buttons-view").append(a);
    };
};
renderButtons();
$("#add-movie").on("click", function (event) {
    event.preventDefault();

    var newMovie = $("#movie-input").val().trim();
    movies.push(newMovie);
    console.log(movies);
    renderButtons();
});

$(document).on("click", ".movie", function () {
    console.log("click");
    event.preventDefault();
    var movie = $(this).attr("data-name");
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + movie + "&api_key=s62m25VSdI2GEDmSCqsdB8puDw7F6XRh&limit=20";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        var results = response.data;
        console.log(results);

        for (var i = 0; i < results.length; i++) {

            var stillImage = results[i].images.fixed_height_still.url;
            var animatedImage = results[i].images.fixed_height.url;
            // console.log(stillImage);
            // console.log(animatedImage);
            var gifDiv = $("<div>");

            var rating = results[i].rating;

            var p = $("<p>").text("Rating: " + rating);

            var image = $("<img>");
            gifDiv.attr("class", "col-12 col-md-4 gifs");

            image.attr("src", stillImage);
            image.attr("data-still", stillImage);
            image.attr("data-animate", animatedImage);
            image.attr("data-state", "still");
            image.addClass("images");



            gifDiv.append(p);
            gifDiv.append(image);
            $("#gifs-appear-here").prepend(gifDiv);
        };

    });
});

$(document).on("click", ".images", function () {

    var state = $(this).attr("data-state");
    console.log(state);

    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }

});
