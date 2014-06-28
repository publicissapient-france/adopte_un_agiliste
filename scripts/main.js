$(function () {

    $('.display-all-coach').click(function () {
        $('#coach-list').toggleClass('open');
        var $button = $(this);
        var hiddenText = $button.data('hiddentext');
        var currentText = $button.html();
        $button.html(hiddenText);
        $button.data('hiddentext', currentText);
    });


    var agilisteMiniatureTemplate = TEMPLATES['agiliste-miniature'];


    var agilistes = [
        {
            image_url: 'benjamin_moitie_mini.png',
            name: 'Benjamin Moitié',
            title: 'Backlog Spécialiste',
            description: 'Le barbu'
        },
        {
            image_url: 'laurene_vol_mini.png',
            name: 'Laurène Vol',
            title: 'Kanban Experte',
            description: 'La pro du post-it'
        },
        {
            image_url: 'clement_rochas_mini.png',
            name: 'Clément Rochas',
            title: 'Le DevOps',
            description: "Les valeurs d'abord !"
        }

    ];

    var html = agilistes.map(function (agiliste) {
        agiliste.image_url = 'images/agiliste/' + agiliste.image_url;
        return agilisteMiniatureTemplate(agiliste);
    }).join('');

    $('#coach-list').append(html);

    //TODO A DEGAGER
    $('#coach-list').append(html);
    $('#coach-list').append(html);

});