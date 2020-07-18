$(document).ready(function () {
  // moment
  const m = moment();
  // display current day on page
  // HH:mm is for 24-Hour military time © https://momentjs.com/docs/
  $("#currentDay").html(moment().format("dddd, MMMM Do YYYY, HH:mm"));
  // consol log moment and dates
  console.log(moment());
  console.log(m.format("dddd, MMMM Do YYYY, HH:mm"));

  var planner =
    // load any saved data from localStorage
    JSON.parse(localStorage.getItem("planner")) || hourUpdater();
  console.log(planner);

  for (var time in planner) {
    // console log current time slots available
    console.log(time, planner[time]);
    // make table
    var tr = $("<tr>");
    var tdTime = $("<td>").addClass("hour").text(time);
    var tdEvent = $("<td>").addClass("textArea");

    // get current number of hours
    var currentHour;
    // check if we've moved past this time
    if (moment(time, "HH:mm").isSame(moment(), "hour")) {
      currentHour = "present";
      // if the current hour is greater than the block hour
      // remove class "past" and "present", add class "future"
    } else if (moment(time, "HH:mm").isAfter(moment())) {
      currentHour = "future";
      // add class "past"
    } else if (moment(time, "HH:mm").isBefore(moment())) {
      currentHour = "past";
    }

    // text area
    var eventText = $("<textarea>")
      .addClass("description")
      .addClass(currentHour)
      .attr("data-time", time)
      .val(planner[time]);
    // tdEvent = eventText
    tdEvent.append(eventText);

    // tdSaveBtn
    var tdSaveBtn = $("<td>").addClass("saveBtn"); // col-md-1
    // saveIco
    var saveBtnIcon = $("<i>").addClass("far fa-save fa-2x");
    // saveBtnIcon = save
    tdSaveBtn.append(saveBtnIcon);

    tr.append(tdTime, tdEvent, tdSaveBtn);
    // myPlanner = tr
    $("#myPlanner").append(tr);
  }

  function hourUpdater() {
    var tempPlanner = {};
    // interval to check if current time needs to be updated
    for (var i = 8; i < 18; i++) {
      tempPlanner[moment(i, "HH").format("HH:mm")] = "";
    }
    return tempPlanner;
  }

  // listen for save button clicks
  $(".saveBtn").on("click", function () {
    // set icon color after save
    $(this).css("color", "lightgrey");
    // get nearby values
    var time = $(this).parent().find(".description").attr("data-time");
    var text = $(this).parent().find(".description").val();
    // consol log time and text value
    console.clear();
    console.log(time, text);

    planner[time] = text;
    // save the value in localStorage as time
    localStorage.setItem("planner", JSON.stringify(planner));
  });
});

// save all
$(".saveallbtn").on("click", function () {
  // $(".saveallbtn") selects the button class="saveallbtn"
  // on saveallbtn click select all classes names saveBtn and click
  $(".saveBtn").click();
});

// clear all
function clearAll() {
  // clear schedule
  localStorage.clear();
  // refresh page
  location.reload();
}
