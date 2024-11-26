document.addEventListener("load", getPage('home'));


function loadContent(file){
        var content=document.getElementById("content-page");

        fetch("./"+file+".html")
        .then(function(response) {
            console.log(response.ok);
            if (!response.ok) {
                // make the promise be rejected if we didn't get a 2xx response
                throw new Error("Not 2xx response", {cause: response});
            } else {
                console.log(response.text());
                var content=document.getElementById("content-page").innerHTML=response.text();
            }
            //return response.text()
        })
        //.then(function(html) {
        //    var content=document.getElementById("content-page").innerHTML=html;
        //})
        .catch(function(err) {
            console.log('Failed to fetch page: ', err);
           //loadContent('home');

        });

}

async function getPage(file) {
    // Clean "active" class from Menu
    var menus = document.getElementsByClassName("nav-link");
    for (var i = 0; i < menus.length; i++) {
        menus[i].classList.remove('active');
    }

    let Result = await fetch("./"+file+".html");
    if (Result.ok) {
        console.log(file)
        var menu = document.getElementById(file);
        menu.className="nav-link active";

        let htmlPart = await Result.text();
        var content=document.getElementById("content-page").innerHTML=htmlPart;

    } else {
        getPage('home');
    }
}


