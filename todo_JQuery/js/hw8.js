$(document).ready(function() {

    // добавление задания
    $('#add').click(function(e) {
        e.preventDefault();

        var inputVal = $('#input').val();

        if (inputVal !== '') {
            $('#list').append('<li>' + inputVal + '</li>');
            $('#message').text('Элемент был добавлен');
            $('#message').show();
            setTimeout(function() {
                $('#message').hide();
            }, 2000);
        }

        $('#input').val('');
    });

    // отображение заданий
    $('#show').click(function(e) {
        e.preventDefault();

        $('#list').toggle();
    });

});
