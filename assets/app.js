$(document).ready(function(){
    // Initialization phase
    // Initialize topics
    const topics = ['shark', 'goldfish', 'seal', 'crab', 'spongebob', 'pirahna', 'doggo', 'jeff', 'pikachu']

    // Populate topic-area using forEach and drawButton
    topics.forEach(drawButton)

    // drawButton
    function drawButton(topic){
        let button = $('<button/>');
        button.html(topic);
        button.addClass('topic btn-secondary');
        $('#topic-area').append(button);
    }

    // Topic button listener
    $('#topic-area').on('click', '.topic', function(){
        $('#gif-display > .row').empty();
        let topic = $(this).text();
        console.log(topic);
        let queryURL = `https://api.giphy.com/v1/gifs/search?api_key=IXXA5xeBHDdTORugqcihDVL4cBssPBZ1&q=${topic}&limit=10`;
        $.ajax({
            url: queryURL,
            method: 'GET'
        }).then(e => e.data.forEach(drawGIF));
    })

    // New topic listener
    $('#topic-form').submit(function(event){
        event.preventDefault();
        let input = $('#topic-input')
        drawButton(input.val());
        input.val('');
    })

    // GIF card constructor
    function drawGIF(element, index){
        let card=$("<div>");
        card.addClass('gif');
        let rating=$('<p>');
        rating.text('Rating: ' + element.rating)
        let image=$('<img>');
        image.attr('src', element.images.fixed_width_still.url);
        image.attr('animate', false);
        image.attr('data-gif', element.images.fixed_width.url);
        image.attr('data-img', element.images.fixed_width_still.url);
        card.append(image, rating);
        if (index < 4){
            $('#row-1').append(card);
        }
        else if (index < 8){
            $('#row-2').append(card);
        }
        else {
            $('#row-3').append(card);
        };
    }

    // GIF listener
    $('#gif-display').on('click', 'img', function(event){
        let gif = $(this);
        if (gif.attr('animate') === 'true'){
            gif.attr('src', gif.data('img'));
            gif.attr('animate', false);
        }
        else{
            gif.attr('src', gif.data('gif'));
            gif.attr('animate', true);
        }
    })
})