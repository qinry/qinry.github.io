$(function(){
    hljs.highlightAll();

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
    $(window).scroll(function() {
        if ($(this).scrollTop() >= $(window).height()) {
            // console.log($(window).height())
            $(".backtop-btn").show()
        } else {
            $(".backtop-btn").hide()
        }
    })
    $(".backtop-btn").click(function(){
        $(window).scrollTop(0)
    })

    // 添加短代码tabs/tab
    $('.tab-content').find('.tab-pane').each(function (idx, item) {
        var navTabs = $(this).closest('.code-tabs').find('.nav-tabs'),
            title = $(this).attr('title');
        navTabs.append('<li><a href="#">' + title + '</a></li');
    });

    updateCurrentTab()


    $('.nav-tabs a').click(function (e) {
        e.preventDefault();
        var tab = $(this).parent(),
                  tabIndex = tab.index(),
                  tabPanel = $(this).closest('.code-tabs'),
                  tabPane = tabPanel.find('.tab-pane').eq(tabIndex);
        tabPanel.find('.active').removeClass('active');
        tab.addClass('active');
        tabPane.addClass('active');

        // Store the number of config language selected in users' localStorage
         if(window.localStorage) {
            window.localStorage.setItem("configLangPref", tabIndex + 1)
         }

         // After click update here not only selected part of code but others
         updateCurrentTab()

    });

    function updateCurrentTab() {
        var holder = '.nav-tabs a'

        // By default current tab number is 1
        var tabNumber = 1

        // Get saved tab number
        if (window.localStorage.getItem('configLangPref')) {
           tabNumber = window.localStorage.getItem('configLangPref')
        }

        // Remove 'active' code to avoid multiple examples of code
        $('.nav-tabs a').closest('.code-tabs').find('.active').removeClass('active');

        // Set 'active' state to current li(language) and div(code) by tabNumber
        $('.code-tabs ul.nav-tabs').find("li:nth-of-type(" + tabNumber + ")" ).addClass('active');
        $('.code-tabs .tab-content').find("div:nth-of-type(" + tabNumber + ")").addClass('active');

    }
});