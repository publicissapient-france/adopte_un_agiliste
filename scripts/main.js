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


    ///part principal
    var agilisteMainTexts = [
        {
            title: 'Je livre toujours en retard',
            text: "La mission de Xebia est de développer du logiciel de très haute qualité (Software Development Done" +
                "Right)." +
                "L'ambition de notre équipe agile est de changer, dans le paysage de l'IT en France," +
                "les pratiques peu efficaces et une culture tayloriste du développement logiciel. Nous vous proposons" +
                "une" +
                "offre d'accompagnement riche et complète, depuis l'idée jusqu'à la production. Notre offre vous" +
                "permettra de" +
                "tirer" +
                "le meilleur de vos équipes en les associant étroitement à notre démarche. Nous partageons également" +
                "généreusement notre" +
                "savoir-faire au travers de notre blog, de publications, ou participations aux conférences.'",
            name: 'Gwenael Bonhommeau',
            image_url: 'gweneal_bonhommeau.JPG'
        },
        {
            title: 'Je livre toujours en retard 2',
            text: "La mission de Xebia est de développer du logiciel de très haute qualité (Software Development Done" +
                "Right)." +
                "L'ambition de notre équipe agile est de changer, dans le paysage de l'IT en France," +
                "les pratiques peu efficaces et une culture tayloriste du développement logiciel. Nous vous proposons" +
                "une" +
                "offre d'accompagnement riche et complète, depuis l'idée jusqu'à la production. Notre offre vous" +
                "permettra de" +
                "tirer" +
                "le meilleur de vos équipes en les associant étroitement à notre démarche. Nous partageons également" +
                "généreusement notre" +
                "savoir-faire au travers de notre blog, de publications, ou participations aux conférences.'",
            name: 'Gwenael Bonhommeau',
            image_url: 'gweneal_bonhommeau.JPG'
        },
        {
            title: 'Je livre toujours en retard 3',
            text: "La mission de Xebia est de développer du logiciel de très haute qualité (Software Development Done" +
                "Right)." +
                "L'ambition de notre équipe agile est de changer, dans le paysage de l'IT en France," +
                "les pratiques peu efficaces et une culture tayloriste du développement logiciel. Nous vous proposons" +
                "une" +
                "offre d'accompagnement riche et complète, depuis l'idée jusqu'à la production. Notre offre vous" +
                "permettra de" +
                "tirer" +
                "le meilleur de vos équipes en les associant étroitement à notre démarche. Nous partageons également" +
                "généreusement notre" +
                "savoir-faire au travers de notre blog, de publications, ou participations aux conférences.'",
            name: 'Gwenael Bonhommeau',
            image_url: 'gweneal_bonhommeau.JPG'
        }


    ];
    var agilisteMainTextTpl = TEMPLATES['agiliste-main-text'];
    var htmlMainText = agilisteMainTexts.map(function (agiliste) {
        return agilisteMainTextTpl(agiliste);
    }).join('');

    var $agilisteMainTextScroller = $('#agiliste-main-text-wrapper .scroller');
    $agilisteMainTextScroller.append(htmlMainText);
    var widthOfOneElement = $('.agiliste-text-wrapper').outerWidth(true);

    var agilistePhotoTpl = TEMPLATES['agiliste-photo-wrapper'];
    var htmlPhoto = agilisteMainTexts.map(function (agiliste) {
        agiliste.image_url = 'images/agiliste/' + agiliste.image_url;
        return agilistePhotoTpl(agiliste);
    }).join('');

    $('#scroller-photo-agiliste').append(htmlPhoto);

    var scrollerModel = {
        currentPosition: 0,
        nbOfElement: agilisteMainTexts.length,
        scrollLeft: function () {
            this.currentPosition--;
            if (this.currentPosition < 0) {
                this.currentPosition = this.nbOfElement - 1;
            }
            this.displayNewPosition();
        },
        scrollRight: function () {
            this.currentPosition++;
            if (this.currentPosition > this.nbOfElement - 1) {
                this.currentPosition = 0;
            }

            this.displayNewPosition();
        },
        displayNewPosition: function () {
            $agilisteMainTextScroller.css('left', -this.currentPosition * widthOfOneElement);
            $('#scroller-photo-agiliste').css('left', -this.currentPosition * widthOfOneElement);
        }
    };


    var leftPostionElement = function (idx) {
        var $wrapper = $(this);
        $wrapper.css('left', idx * widthOfOneElement);
    }

    var leftPositioningAgiliste = function () {
        widthOfOneElement = $('.agiliste-text-wrapper').outerWidth(true);
        $('.agiliste-photo-wrapper').each(leftPostionElement);
        $('.agiliste-text-wrapper').each(leftPostionElement);
        scrollerModel.displayNewPosition();
    };


    $(window).resize(function () {
        leftPositioningAgiliste();
    });
    leftPositioningAgiliste();


    $('.left-scroll').click(function () {
        scrollerModel.scrollLeft();
    });
    $('.right-scroll').click(function () {
        scrollerModel.scrollRight();
    });
});