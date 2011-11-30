// Read a page's GET URL variables and return them as an associative array.
function getUrlVars() {
  var vars = [], hash;
  var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
  for(var i = 0; i < hashes.length; i++) {
    hash = hashes[i].split('=');
    vars.push(hash[0]);
    vars[hash[0]] = hash[1];
  }
  return vars;
}

function kgToLbs(kg) {
  return kg * 2.20462262;
};

function calcEdus(lbs) {
  var edus = lbs / 190;
  return edus.toFixed(2);
};

function submitted() {
  var iambenching = $('input[name=iambenching]').val();
  if (isNaN(iambenching) || iambenching <= 0)
    return;

  var lbsorkg = $('select[name=lbsorkg]').val();
  if (lbsorkg == "kg")
    iambenching = kgToLbs(iambenching);

  tellme(iambenching);
}

function tellme(iambenching) {
  var edus = calcEdus(iambenching);

  var msg;
  if (edus < 1) {
    msg = "Ha, you suck! That's only " + edus + " edus.";
  } else if (edus == 1) {
    msg = "Hello edubation. Do you like it here?";
  } else {
    msg = "Nope! You are " + edus + " times better than edubation, ";
    if (edus >= 2)
      msg += "you beast!";
    else
      msg += "not bad.";
  }

  $('#whatareyoubenching').replaceWith('<h1 id="msg">' + msg + '</h1>');
  $('#msg').fadeIn(100);

};

$(document).ready(function() {

  var url_vars = getUrlVars()
  var url_kg   = url_vars["kg"]
  var url_lbs  = url_vars["lbs"]
  if (!isNaN(url_lbs)) {
    tellme(url_lbs);
  } else if (!isNaN(url_kg)) {
    tellme(kgToLbs(url_kg));
  } else {
    $("input[name=iambenching]").select();
    $("input[name=iambenching], select[name=lbsorkg]").keyup(function(event) {
      if (event.which == 13) {
        event.preventDefault();
        submitted();
      }
    });
  }
});
