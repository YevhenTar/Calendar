import {Schedule, TableCalendar} from "./script.js";

const schedule = new Schedule();
const tableCalendar = new TableCalendar();

let selectList = document.getElementById("select-list");
let deleteButtons = document.getElementsByClassName('del-btn');

function attachDeleteHandlers(){
    for(let delButton of deleteButtons){
        delButton.addEventListener("click", (ev) =>{
            if (window.confirm(`Are you sure you want to delete "${ev.target.dataset.title}" event?`)){
                let eventTime = ev.target.dataset.time;
                let eventDay = ev.target.dataset.weekDay;
                schedule.deleteEvent(eventTime, eventDay);
                selectListOnChange();
            }
        });
    }
}

function selectListOnChange(){
    let filterName = selectList.value;
    let eventList = filterName === "" ? schedule.events: schedule.filterEvent(filterName);
    tableCalendar.tableDraw(eventList);
    attachDeleteHandlers();
}

selectListOnChange();

selectList.addEventListener("change", () => {
    selectListOnChange();
});
