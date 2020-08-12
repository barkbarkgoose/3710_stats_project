$('#password-form').on('submit', function(event){
  // vvv prevent the page refresh vvv
  // --- a couple of checks for empty form or spaces in password ---
  event.preventDefault();

  var password = $('#password').val()
  if (/\s/g.test(password) > 0){
    alert("No Spaces Please");
    return false;
  }
  var plength = password.length;
  if (plength == 0){
    return false;
  }
  //
  $("#time-list").children().hide(); // want this to be re-hidden each time if getting new info
  $("#super-time-list").children().hide();
  $("#botnet-time-list").children().hide();
  $("#regular-title").hide();
  $("#super-title").hide();
  $("#botnet-title").hide();

  // --- give password
  var user_data = {
    'password': password,

  };

  // --- success and error functions depending on ajax response ---
  function GET_success(response){
    console.log(response); // sanity check
    fill_statsdiv(response);
    return true;
  }
  function GET_error(response){
    return false;
  }

  // --- make the ajax call here ---
  ajax_request("GET", "/", user_data, GET_success, GET_error);
});

function fill_statsdiv(response){
  // --- get all the character types present in password ---
  var boolString = "<p>Your password contains ";
  var boolCount = 0;
  var boolKeys = Object.keys(response['stats']['bools']);
  //
  boolKeys.forEach(function (item, index){
    if (response['stats']['bools'][item] == true){
      boolCount++;
      boolString += "<strong>" + item + "</strong>, ";
    }
  });
  //
  if (boolCount > 0){
    // --- get rid of last comma/space ---
    boolString = boolString.substring(0, boolString.length-2);
    if (boolCount > 1){
      var comma = boolString.lastIndexOf(", ");
      boolString = boolString.substring(0, comma) + " and " + boolString.substring(comma+2, boolString.length);
    }
  }
  boolString += "<br> Total possible characters: <strong>" + response['stats']['possible characters'] + "</strong>";
  boolString += "<br> Password length: <strong>" + response['stats']['length'] + "</strong></p>";
  // --- put boolstring into #present-chars div ---
  var chardiv = $("#present-chars");
  $(chardiv).html(boolString);
  //
  // --- put estimated times to guess  ---
  var timeKeys = Object.keys(response['stats']['times']);
  timeKeys.forEach(function (item, index){
    // --- regular CPU ---
    $("#regular-title").show();
    $("#"+item).show();
    $("#"+item).html(item + ": <strong>" + response['stats']['times'][item] + "</strong>");
    // --- supercomputer/GPU stuff (x100 speed)---
    if (parseInt(response['stats']['times'][item])/100 >= .01){
      $("#super-title").show();
      $("#super-"+item).show();
      $("#super-"+item).html(item + ": <strong>" + (response['stats']['times'][item]/100).toFixed(2) + "</strong>");
    }
    // --- botnet (x100k speed)---
    if (parseInt(response['stats']['times'][item])/100000 >= .01){
      $("#botnet-title").show();
      $("#botnet-"+item).show();
      $("#botnet-"+item).html(item + ": <strong>" + (response['stats']['times'][item]/100000).toFixed(2) + "</strong>");
    }
  });


  // for (var i=0; i < response['bool'].length; i++){
  //   if (response['bool'][i])
  // }

  var hashdiv = $("#hash");
  $(hashdiv).html("<b>using SHA512 your password generated the following hash:</b> " + response['hash']);
}
