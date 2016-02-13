$(function(){

    $("#typed").typed({
        strings: ["a web developer.", "an iOS developer.", "Fengwei Zhang."],
        // stringsElement: $('#typed-strings'),
        typeSpeed: 30,
        backDelay: 500,
        // loop: false,
        // contentType: 'html',
        loopCount: false,
        callback: function(){ foo(); },
        resetCallback: function() { newTyped(); }
    });
    $(".reset").click(function(){
        $("#typed").typed('reset');
    });
});
function newTyped(){ /* A new typed object */ }
function foo(){ console.log("Callback"); }
