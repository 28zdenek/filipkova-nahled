// Mobilní menu
(function () {
  var btn = document.querySelector(".burger");
  var nav = document.getElementById("navigace");
  if (!btn || !nav) return;
  btn.addEventListener("click", function () {
    var otevreno = nav.classList.toggle("otevreno");
    btn.setAttribute("aria-expanded", otevreno ? "true" : "false");
  });
  nav.addEventListener("click", function (e) {
    if (e.target.closest("a")) {
      nav.classList.remove("otevreno");
      btn.setAttribute("aria-expanded", "false");
    }
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && nav.classList.contains("otevreno")) {
      nav.classList.remove("otevreno");
      btn.setAttribute("aria-expanded", "false");
      btn.focus();
    }
  });
})();

// Poptávkový formulář: předvyplnění z ?zajem=, časová značka proti spamu, hláška o chybě
(function () {
  var form = document.getElementById("poptavka-form");
  if (!form) return;
  var params = new URLSearchParams(location.search);
  var zajem = params.get("zajem");
  if (zajem) {
    var volba = form.querySelector('input[name="potreba[]"][value="' + zajem + '"]');
    if (volba) volba.checked = true;
  }
  var cas = form.querySelector('input[name="t"]');
  if (cas) cas.value = String(Math.floor(Date.now() / 1000));
  if (params.get("chyba")) {
    var hlaska = document.getElementById("form-chyba");
    if (hlaska) { hlaska.hidden = false; hlaska.focus(); }
  }
})();

// Kontakt: tlačítko e-mailu s předvyplněným předmětem podle ?zajem= a osnovou zprávy
(function () {
  var odkaz = document.getElementById("poptavka-mail");
  if (!odkaz) return;
  var nazvy = {
    ucetnictvi: "účetnictví", prevzeti: "převzetí účetnictví", mzdy: "zpracování mezd",
    spolecnost: "česká společnost", sidlo: "sídlo společnosti", kancelar: "sdílená kancelář"
  };
  var zajem = nazvy[new URLSearchParams(location.search).get("zajem")];
  var predmet = "Poptávka – " + (zajem || "spolupráce");
  var telo = "Dobrý den,\n\nmám zájem o: " + (zajem || "") +
    "\nIČO (pokud společnost existuje): \nPlátce DPH: ano / ne\nPřibližný počet dokladů měsíčně: " +
    "\nPočet zaměstnanců: \nOd kdy: \n\nTelefon: \n";
  odkaz.href = "mailto:info@filipkova.cz?subject=" + encodeURIComponent(predmet) + "&body=" + encodeURIComponent(telo);
})();
