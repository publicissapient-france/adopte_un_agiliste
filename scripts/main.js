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
    var agilisteMainTextTpl = TEMPLATES['agiliste-main-text'];
    var htmlMainText = agilisteMainTexts.map(function (agiliste) {
        return agilisteMainTextTpl(agiliste);
    }).join('');

    var $agilisteMainTextScroller = $('#agiliste-main-text-wrapper');
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
            var newLeftPosition = -this.currentPosition * widthOfOneElement;
            $agilisteMainTextScroller.css('left', newLeftPosition);
            $('#scroller-photo-agiliste').css('left', newLeftPosition);
        }
    };


    var leftPostionElement = function (idx) {
        $(this).css('left', idx * widthOfOneElement);
    };

    var leftPositioningAgiliste = function () {
        var $agilisteTextWrapper = $('.agiliste-text-wrapper');
        widthOfOneElement = $agilisteTextWrapper.outerWidth(true);
        $('.agiliste-photo-wrapper').each(leftPostionElement);
        $agilisteTextWrapper.each(leftPostionElement);
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
});