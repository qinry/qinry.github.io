$(function(){
    if (navigator && navigator.clipboard) {
        addCopyButtons(navigator.clipboard);
    } else {
        var script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/clipboard-polyfill/2.7.0/clipboard-polyfill.promise.js';
        script.integrity = 'sha256-waClS2re9NUbXRsryKoof+F9qc1gjjIhc2eT7ZbIv94=';
        script.crossOrigin = 'anonymous';
        script.onload = function() {
            addCopyButtons(clipboard);
        };
    }

});

function addCopyButtons(clipboard) {
    $('pre > code').each(function(index, ele){
        var button = $('<button></button>');
        button.addClass('copy-code-button');
        button.attr('type', 'button');
        button.text('copy');
        button.click(function(){
            clipboard.writeText($(ele).text()).then(
                function() {
                    /* Chrome doesn't seem to blur automatically, leaving the button
                       in a focused state */
                    button.blur();

                    button.text('Copied!');
                    setTimeout(function() {
                        button.text('copy');
                    }, 2000);
                },
                function(error) {
                    button.text('Error');
                    console.error('Failed to copy',error);
                }
            );
        });

        if ($(ele).parents('div.highligh').length == 0) {
            $(ele).parent().before(button);
        } else {
            $(ele).parents('div.highlight').before(button);
        }
    });
   
}