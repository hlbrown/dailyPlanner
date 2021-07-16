//var Tday = moment(new Date()).format('dddd, MMMM Do');
//$("#currentDay").text(Tday);
const todayDate = moment(new Date()).format('dddd, MMMM Do');
$("#currentDay").text(todayDate);

//get current time and also the current hour separately
const nowTime = moment().format('LT');
const nowHour = moment().format('HH');
let regHour = "";//fix military time

//use Maps to locally store the input
let myCal = new Map();

if(localStorage.getItem("myCal")){
    myCal = new Map(JSON.parse(localStorage.myCal));
}else{
    let myCal = new Map();
}
//only build rows for the hours9-5
for(let hour = 9; hour < 18; hour++){
    let timeBlock = $('<div>');

    if(hour < 12){//define morning and evening hours//or omit and use military time
        amPM = "AM";
    }else{
        amPM = "PM";
    }
    let timeDiv = $('<div>');
    if(hour > 12){
        regHour = hour - 12;
    }else{
        regHour = hour;
    }
    

 
    timeDiv.text(regHour + amPM);
    timeDiv.addClass('time-div');

    let inputDiv = $("<div>");//create the div for input
    let inputTextArea = $("<textarea>");
    inputTextArea.attr('id', 'textarea' + hour);

    inputDiv.append(inputTextArea);
    inputDiv.addClass("description");
  
   

    let saveIcon = $('<i>');
    saveIcon.addClass("fa fa-save");//save button from google icons, I added more css to put the icon in the middle of the button
    
    let save = $("<div>");
    save.addClass("saveBtn");
    save.attr('id', hour);

    save.append(saveIcon);
    timeBlock.append(timeDiv, inputDiv, save); //adding the 3 columns to the container
    timeBlock.addClass("time-block row");

    if(nowHour > hour){//changing the color of the input area based off of current time
        timeBlock.addClass("past");
    }
    else if(nowHour < hour){
        timeBlock.addClass("future");
    }else{
        timeBlock.addClass("present");
    }
    $('#timeBlocks').append(timeBlock);
}
myCal.forEach(function (text,key) {
    let newText = "#textarea" + key;
    document.querySelector(newText).value = text;
});
$(".saveBtn").on('click', function (){//saving the input to local storage//retains on refresh
    let newText = "#textarea" + (this.id);
    myCal.set((this.id), document.querySelector(newText).value);
    localStorage.myCal = JSON.stringify(Array.from(myCal.entries()));
    console.log(newText);
 
});