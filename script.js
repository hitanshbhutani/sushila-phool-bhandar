/* script.js - Sushila Phool Bhandar
   three small things: the open/closed line in the header,
   the search on the rate list, and the enquiry form.
   plain javascript, no jquery. */

var SHOP_NUMBER = "919811000000";   // placeholder number for the college project


/* ---------- 1. open or closed right now ---------- */

function shopHoursForToday(){
  var d = new Date();
  // tuesday is mandir day, stall opens earlier and shuts later
  if (d.getDay() === 2) {
    return { open: 5 * 60, close: 22 * 60 + 30 };
  }
  return { open: 5 * 60 + 30, close: 21 * 60 + 30 };
}

function showOpenStatus(){
  var el = document.getElementById("openNow");
  if (!el) return;

  var now  = new Date();
  var mins = now.getHours() * 60 + now.getMinutes();
  var h    = shopHoursForToday();

  if (mins >= h.open && mins < h.close) {
    el.textContent = "Open right now";
    el.style.color = "#ffd479";
  } else {
    // work out the opening time to show
    var openTxt = (h.open === 300) ? "5:00 am" : "5:30 am";
    el.textContent = "Closed - opens " + openTxt;
    el.style.color = "#c9b6a0";
  }
}


/* ---------- 2. search on the rate list ---------- */

function setupSearch(){
  var box = document.getElementById("q");
  var tbl = document.getElementById("rates");
  if (!box || !tbl) return;

  var none = document.getElementById("noresult");
  var rows = tbl.querySelectorAll("tbody tr");

  box.addEventListener("input", function(){
    var term  = box.value.toLowerCase().trim();
    var found = 0;

    for (var i = 0; i < rows.length; i++) {
      var row = rows[i];
      // the grey heading rows use colspan, keep them only when nothing is typed
      var isHeading = row.cells.length === 1;

      if (term === "") {
        row.style.display = "";
        found++;
      } else if (isHeading) {
        row.style.display = "none";
      } else if (row.textContent.toLowerCase().indexOf(term) > -1) {
        row.style.display = "";
        found++;
      } else {
        row.style.display = "none";
      }
    }

    none.style.display = (found === 0) ? "block" : "none";
  });
}


/* ---------- 3. enquiry form -> whatsapp ---------- */

function cleanPhone(v){
  var digits = v.replace(/\D/g, "");
  if (digits.length === 12 && digits.indexOf("91") === 0) digits = digits.slice(2);
  if (digits.length === 11 && digits.charAt(0) === "0")   digits = digits.slice(1);
  return digits;
}

function markBad(id, bad){
  var f = document.getElementById(id);
  if (!f) return;
  if (bad) { f.classList.add("bad"); } else { f.classList.remove("bad"); }
}

function niceDate(v){
  if (!v) return "";
  var p = v.split("-");           // comes in as yyyy-mm-dd
  if (p.length !== 3) return v;
  return p[2] + "/" + p[1] + "/" + p[0];
}

function setupForm(){
  var form = document.getElementById("enq");
  if (!form) return;

  form.addEventListener("submit", function(e){
    e.preventDefault();

    var nm   = document.getElementById("nm").value.trim();
    var ph   = cleanPhone(document.getElementById("ph").value);
    var need = document.getElementById("need").value;
    var dt   = document.getElementById("dt").value;
    var msg  = document.getElementById("msg").value.trim();

    var nameBad  = (nm.length < 2);
    var phoneBad = !/^[6-9][0-9]{9}$/.test(ph);
    var msgBad   = (msg.length < 5);

    markBad("f-name", nameBad);
    markBad("f-ph",   phoneBad);
    markBad("f-msg",  msgBad);

    if (nameBad || phoneBad || msgBad) {
      // put the cursor on the first thing that is wrong
      var first = form.querySelector(".field.bad input, .field.bad textarea");
      if (first) first.focus();
      return;
    }

    var lines = [];
    lines.push("Namaste, this is an order enquiry from your website.");
    lines.push("");
    lines.push("Name: " + nm);
    lines.push("Phone: " + ph);
    lines.push("Need: " + need);
    if (dt) lines.push("Date: " + niceDate(dt));
    lines.push("Details: " + msg);

    var url = "https://wa.me/" + SHOP_NUMBER + "?text=" + encodeURIComponent(lines.join("\n"));
    window.open(url, "_blank");

    document.getElementById("sent").style.display = "block";
    form.reset();
  });
}


/* run everything */
showOpenStatus();
setupSearch();
setupForm();
