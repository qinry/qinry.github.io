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

        $(ele).parent().prepend(button);

    });
    $("pre").each(function(idx,elem){
        $(elem).mouseenter(function(){
            $("button.copy-code-button").eq(idx).show()
        })
        $(elem).mouseleave(function(){
            $("button.copy-code-button").eq(idx).hide()
        })
    })
}