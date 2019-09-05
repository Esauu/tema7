document.addEventListener("DOMContentLoaded", start);

let madlisteArray = [];
let filter = "alle";
const filterKnapper = document.querySelectorAll("nav button");
let ret;


function start() {
    const filterKnapper = document.querySelectorAll("nav button");
    filterKnapper.forEach(knap => knap.addEventListener("click", filtrer));
    skjuldetalje();
    hentJson();
}



function filtrer() {
    filter = this.dataset.ret;

    document.querySelector(".active").classList.remove("active");
    this.classList.add("active");
    hentJson();
}

async function hentJson() {
    const jsonURL = "https://spreadsheets.google.com/feeds/list/17Dd7DvkPaFamNUdUKlrFgnH6POvBJXac7qyiS6zNRw0/od6/public/values?alt=json";
    const response = await fetch(jsonURL);
    //console.log(respone);
    madlisteArray = await response.json()
    //console.log(madlisteArray);

    visJson();
}

function visJson() {

    const skabelon = document.querySelector("template").content;
    const listeElm = document.querySelector("#liste");
    listeElm.textContent = "";

    madlisteArray.feed.entry.forEach((ret, i) => {
        if (ret.gsx$kategori.$t == filter || filter == "alle") {
            const klon = skabelon.cloneNode(true);
            //console.log(klon);



            const h2 = klon.querySelector("h2");
            h2.textContent = ret.gsx$navn.$t;


            //  const p = klon.querySelector("p");
            //   p.textContent += ret.gsx$kort.$t + " " + ret.gsx$pris.$t + ",-";


            klon.querySelector(".tekst").textContent = ret.gsx$kort.$t;
            klon.querySelector(".pris").textContent = ret.gsx$pris.$t + ",-";


            const img = klon.querySelector("img");
            // <img src="imgs/small/baltiskbondesuppe-sm.jpg">

            img.src = "imgs/small/" + ret.gsx$billede.$t + "-sm.jpg";
            //img.alt = "Billede af " + /imgs/.gsx$billede.$t;


            listeElm.appendChild(klon);

            listeElm.lastElementChild.addEventListener("click", () => {
                visdetalje(ret)
            });

        }

    });
}


function visdetalje(ret) {

    document.querySelector("#detalje").style.display = "block";

    document.querySelector("#detalje .luk").addEventListener("click", skjuldetalje);

    document.querySelector("#detalje h2").textContent = ret.gsx$navn.$t;

    document.querySelector("#detalje img").src = "imgs/large/" + ret.gsx$billede.$t + ".jpg";

    document.querySelector("#detalje p").textContent = ret.gsx$lang.$t;


    //  document.querySelector("#detalje img").src = ret.gsx$billede.$t;
    //     document.querySelector("#detalje img").alt = `billede af ${ret.gsx$billede}`;

    console.log(ret)
}


function skjuldetalje() {

    document.querySelector("#detalje").style.display = "none";

}
