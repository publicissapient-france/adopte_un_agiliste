$(function () {

    $('.display-all-coach').click(function () {
        $('#coach-list').toggleClass('open');
        var $button = $(this);
        var hiddenText = $button.data('hiddentext');
        var currentText = $button.html();
        $button.html(hiddenText);
        $button.data('hiddentext', currentText);
    });


    //partie miniatures
    var agilisteMiniatureTemplate = TEMPLATES['agiliste-miniature'];

    var agilistes = AGILISTE_MINIATURE;

    var html = agilistes.map(function (agiliste) {
        agiliste.image_url = 'images/agiliste/' + agiliste.image_url;
        return agilisteMiniatureTemplate(agiliste);
    }).join('');

    $('#coach-list').append(html);

    ///partie principale
    var agilisteMainTexts = AGILISTE_MAIN;

    var widthOfOneElement = $('.agiliste-photo-wrapper').outerWidth(true);

    var agilistePhotoTpl = TEMPLATES['agiliste-photo-wrapper'];
    var htmlPhoto = agilisteMainTexts.map(function (agiliste) {
        var originalImageUrl = agiliste.image_url
        agiliste.image_url = 'images/agilistes/' + originalImageUrl;
        agiliste.tampon_url= 'images/agilistes/tampon-' + originalImageUrl.replace('jpg','png');
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
            var newLeftPosition = -this.currentPosition * widthOfOneElement;
            $('#scroller-photo-agiliste').css('left', newLeftPosition);
        }
    };

    var leftPositioningAgiliste = function () {
        var $agilisteTextWrapper = $('.agiliste-photo-wrapper');
        widthOfOneElement = $agilisteTextWrapper.outerWidth(true);

        scrollerModel.displayNewPosition();
    };

    $(window).resize(leftPositioningAgiliste);
    leftPositioningAgiliste();

    $('.left-scroll').click(function () {
        scrollerModel.scrollLeft()
    });
    $('.right-scroll').click(function () {
        scrollerModel.scrollRight()
    });

    $('.adopt-me').click(function () {
        $('#adopt-me-modal').modal({})
    });

    $('#contact-form').submit(function (event) {
        event.preventDefault();

        var fields = ['firstname', 'lastname', 'company', 'phone', 'email'];
        var lineFeed = '%0D%0A';
        var body = fields.map(function (field) {
            var value = $('#' + field).val();
            var label = $('label[for=' + field + ']').text().replace('*', '');
            return label + ' : ' + value + lineFeed;
        }).join('');
        window.location = 'mailto:info@xebia.fr?subject=Adopter un agiliste&body=' + body + lineFeed

        $('#adopt-me-modal').modal('hide');
        $('#thanks-modal').modal('show');
    });


    $('.scroll-down').click(function () {
        var scrollDownPos = $(this).offset().top;
        $('html, body').animate({
            scrollTop: scrollDownPos
        })
    });
});