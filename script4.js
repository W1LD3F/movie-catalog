$(document).ready(function () {

    console.log("test");
    $("#test").text("Изменил текст")
    var paragraph1 = document.createElement("p");
    paragraph1.innerHTML = "Change text";
    var link1 = document.createElement("a")
    link1.innerHTML = "Link"
    link1.href = "#"
    $("#kittyImage").replaceWith(paragraph1, link1);
    $('.blocks').prepend('<div><img class="lawyer" src="kitty5.jpg" alt="Адвокат"><p class="string">Новый элемент в начале списка</p></div>');
    $('.blocks').append('<div><img class="lawyer" src="kitty5.jpg" alt="Адвокат"><p class="string">Новый элемент в конце списка</p></div>');
    //$('.blocks').empty();
    //$('.blocks div:first-child').remove();
});