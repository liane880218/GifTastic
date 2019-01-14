$(document).ready(function() {
    $("#errorDiv").hide(); 

    //Variables
    var animalsArray = ["dog", "cat", "rabbit", "hamnster", "skunk", "goldfish", "bird", "ferret", "turtle", "sugar glider", "chinchilla", 
    "hedgehog", "hermit crab", "gerbil", "pygmy goat", "chicken", "capybara", "teacup pig", "serval", "salamander", "frog"];
    var buttonID = "";
    var buttonName = "";
    var exist = "";
    var topic = "";
    var Key = "";
    var imgURL = "";
    var title = "";
    var newButtonID = "";
    var newBotton = "";
    var image = "";
    var rating = "";

    //Appending a button for each element on the array
    function addButtons(value){
        for(var j = 0; j < animalsArray.length; j++){
            newBotton = $("<button>");
            newBotton.attr("class", "animalButton");
            newBotton.attr("id", animalsArray[j]);
            newBotton.text(animalsArray[j]);
            $("#buttonsContainer").append(newBotton);
        }    
    }

    addButtons();

    //First letter of the buttonID to upper case in order to be displayed as a title
    function firstLetterUpperCase(val){
        newButtonID = val.charAt(0).toUpperCase() + val.slice(1);
      }
    
    //Search pictures on the API depending on the clicked button
    function search() {
        $("#errorDiv").hide(); 
        buttonID = $(this).attr("id");
        $("#picturesContainer").empty();  
        title = $("<h1>");
        title.attr("id", buttonID);
        firstLetterUpperCase(buttonID);
        title.text(newButtonID);
        $("#picturesContainer").append(title);

        topic = encodeURIComponent(buttonID.toLowerCase());
        Key = "i14JcVmLpIQbL3bCRF4qITtWNG3TdAIV";     
        imgURL = "https://api.giphy.com/v1/gifs/search"
        $.ajax({
            url: imgURL+'?rating=pg-13&limit=10&q='+topic+'&api_key='+Key,
        }).done(function(response) {
            if(response.data.length > 0){//Founded images for the topic
                for (var i = 0; i < 10; i++) {//Appending 10 images and rating of the topic
                    container = $("<div>");
                    container.attr("class", "imgRating");
                    rating = $("<p>");
                    rating.text("Raiting: " + response.data[i].rating);
                    image = $("<img>");
                    image.attr("src", response.data[i].images.original.url);
                    image.attr("data-animate", response.data[i].images.original.url);
                    image.attr("data-still", response.data[i].images.original_still.url);
                    image.attr("data-state", "animate");
                    image.attr("class", "gif");
                    $(container).append(rating);  
                    $(container).append(image); 
                    $("#picturesContainer").append(container);  
                }
                // console.log(response);
            }else{//Not founded images for the topic
                $("#error").text("There is not results");
                $("#errorDiv").show();
            }  
        });
    }

    $(document).on("click", ".animalButton", search);

    //pause and play the animation
    function stillAnimate(){
        var state = $(this).attr("data-state");
        if(state === "still"){
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        }else{
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
    }

    $(document).on("click", ".gif", stillAnimate);

    //Add new buttons
    function addAnimals() {
        event.preventDefault();
        exist = "";
        buttonName = $("#nameButton").val().toLowerCase();
        if(buttonName !== ""){//The name of the button is not empty
            exist = animalsArray.indexOf(buttonName);
            if(exist === -1){//The name of the button is not on the array
                animalsArray.push(buttonName);
                $("#buttonsContainer").empty();
                addButtons();
            }else{//The name of the button is on the array
                $("#error").text("The button already exist");
                $("#errorDiv").show(); 
            }
        $("#nameButton").val("");
        }else{//The name of the button is empty
            $("#error").text("Please enter the button name");
            $("#errorDiv").show(); 
        }     
    }

    $(document).on("click", "#addButton", addAnimals);
    
    $( "#nameButton" ).keypress(function() {
        $("#errorDiv").hide(); 
    });

    //Reset the game
    function reset() {
        animalsArray = ["dog", "cat", "rabbit", "hamnster", "skunk", "goldfish", "bird", "ferret", "turtle", "sugar glider", "chinchilla", 
        "hedgehog", "hermit crab", "gerbil", "pygmy goat", "chicken", "capybara", "teacup pig", "serval", "salamander", "frog"];  
        $("#buttonsContainer").empty();
        $("#picturesContainer").empty();
        $("#errorDiv").hide(); 
        addButtons();
    }

    $(document).on("click", "#resetButton", reset);
});