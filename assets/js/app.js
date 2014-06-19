$(document).ready(function () {
  var frames = 400;
  var anim = "easeOutExpo";
  var h = $(window).height();
  $("#head").fitText(0.255);
  $("#left").height(h);
  $("#blog").height(h - 100);
  $("#works").height(h);
  $("#contact").height(h);
  $(".full").click(function () {
    openPage(this);
  });
  $(".menuitem").click(function () {
    if ($(this).hasClass("first")) {
      openPage($("#blog"));
    } else if ($(this).hasClass("second")) {
      openPage($("#works"));
    } else openPage($("#contact"));
  });

  function openPage(t) {
    if (!$(t).hasClass("open")) {
      $(".open").parent().switchClass("pure-u-17-24", "pure-u-1-24", frames, anim)
      $(".open").children().hide();
      $(".open").switchClass("open", "closed", frames, anim);
      $(t).switchClass("closed", "open", frames, anim);
      $(t).parent().switchClass("pure-u-1-24", "pure-u-17-24", frames, anim);
      $(t).children().show("fade",1000);
    }
  }
});