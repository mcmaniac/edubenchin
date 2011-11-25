function kgToLbs(kg) {
  return kg * 2.20462262;
};

function calcEdus(lbs) {
  var edus = lbs / 190;
  return edus.toFixed(2);
};

function tellme() {

  var iambenching = $('input[name=iambenching]').val();
  if (isNaN(iambenching) || iambenching <= 0)
    return;

  var lbsorkg = $('select[name=lbsorkg]').val();
  if (lbsorkg == "kg")
    iambenching = kgToLbs(iambenching);

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
  $("input[name=iambenching]").select();
  $("input[name=iambenching], select[name=lbsorkg]").keyup(function(event) {
    if (event.which == 13) {
      event.preventDefault();
      tellme();
    }
  });
});
