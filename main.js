let villeChoisie;

if ("geolocation" in navigator) {
  navigator.geolocation.watchPosition(
    (position) => {
      const url = "https://api.openweathermap.org/data/2.5/weather?lat=" + position.coords.latitude + "&lon=" + position.coords.longitude + "&appid=dc8c9152e8adaad0ec8bf635818c0d42&units=metric";

      let requete = new XMLHttpRequest();
      requete.open("GET", url);
      requete.responseType = "json";
      requete.send();

      requete.onload = function () {
        if (requete.readyState === XMLHttpRequest.DONE) {
          if (requete.status === 200) {
            let reponse = requete.response;
            let temperature = reponse.main.temp;
            let ville = reponse.name;
            document.querySelector("#temperature_label").textContent = temperature;
            document.querySelector("#ville").textContent = ville;
          } else {
            alert("Un problème est intervenu, merci de revenir plus tard.");
          }
        }
      };
    },
    erreur,
    options
  );

  var options = {
    enableHighAccuracy: true,
  };
} else {
  villeChoisie = "saint-saulve";
  recevoirTemperature(villeChoisie);
}

let changerDeVille = document.querySelector("#changer");
changerDeVille.addEventListener("click", () => {
  villeChoisie = prompt("Quelle ville souhaitez-vous voir ?");
  recevoirTemperature(villeChoisie);
});

function erreur() {
  villeChoisie = "Saint-Saulve";
  recevoirTemperature(villeChoisie);
}

function recevoirTemperature(ville) {
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + ville + "&appid=dc8c9152e8adaad0ec8bf635818c0d42&units=metric";

  let requete = new XMLHttpRequest();
  requete.open("GET", url);
  requete.responseType = "json";
  requete.send();

  requete.onload = function () {
    if (requete.readyState === XMLHttpRequest.DONE) {
      if (requete.status === 200) {
        let reponse = requete.response;
        let temperature = reponse.main.temp;
        let ville = reponse.name;
        document.querySelector("#temperature_label").textContent = temperature;
        document.querySelector("#ville").textContent = ville;
      } else {
        alert("Un problème est intervenu, merci de revenir plus tard.");
      }
    }
  };
}
