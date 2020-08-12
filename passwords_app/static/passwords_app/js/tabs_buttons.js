// // -----------------------------------------------------------------------------
// $(document).ready(function() {
//   //any section with 'datepicker as it's class will bring up a calendar when targeted
//   $(".datepicker").datepicker({
//     // changeMonth: true,
//     // changeYear: true,
//     // yearRange: "1900:2012",
//     // You can put more options here.
//   });//--- end datepicker ---
//
//   $(".no-enter").keypress(function(e) {
//     //Enter key won't submit form
//     if (e.which == 13) {
//       return false;
//     }
//   });
//
// });//end document.ready---------------------------------------------------------
// function FileUpload(){
//
// }

// -----------------------------------------------------------------------------
function ChangeTab(selection, target){
  var siblings = $(selection).siblings();
  //execute on tabs (selection)
  $(siblings).removeClass("active");
  $(selection).addClass("active");

  //execute on divs shown/invisible (target)
  var tab_group = $("#" + target).siblings();
  $(tab_group).addClass("hidden");
  $("#" + target).removeClass("hidden");
}

// -----------------------------------------------------------------------------
function expand_siblings(selection){
  var siblings = $(selection).siblings();
  $(siblings).toggle(500);
}

// -----------------------------------------------------------------------------
function toggle_div(div_id){
  var target = $(div_id);
  $(div_id).fadeToggle(200);
}

// -----------------------------------------------------------------------------
