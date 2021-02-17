"use strict";

class Participant {
    constructor(name) {
        this.name = name;
    }
}

const membersList = [
    new Participant("Mike"),
    new Participant("Sara"),
    new Participant("Albert"),
    new Participant("Sebastian"),
    new Participant("Alina"),
];

const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri"];
const timeFrames = ["10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00"];

export class Event {
    constructor(time, weekDay, title, participants) {
        this.time = time;
        this.weekDay = weekDay;
        this.title = title;
        this.participants = participants;
    }
}

export class Schedule {
    constructor() {
        this.events = this.restoreEvents();
    }

    restoreEvents() {
        let eventsLoad = localStorage.getItem("currentEvent");
        if (eventsLoad == null) {
            return [];
        } else {
            return JSON.parse(eventsLoad);
        }
    }

    storeEvents(events) {
        localStorage.setItem("currentEvent", JSON.stringify(events));
    }

    addEvent(time, weekDay, title, participants) {
        if (this.validateEvent(time, weekDay)) {
            this.events.push(new Event(time, weekDay, title, participants));
            this.storeEvents(this.events);
            return true;
        }
        return false;
    }

    deleteEvent(time, weekDay) {
        let a;
        for (let i = 0; i < this.events.length; i++) {
            let elem = this.events[i];
            if (elem.time === time && elem.weekDay === weekDay) {
                a = i;
            }
        }
        if (a !== undefined) {
            this.events.splice(a, 1);
            this.storeEvents(this.events);
        }
    }

    filterEvent(filterName) {
        let result = [];
        for (let i = 0; i < this.events.length; i++) {
            let elem = this.events[i];
            let nameList = elem.participants;
            for (let j = 0; j < nameList.length; j++) {
                let memberName = nameList[j];
                if (memberName === filterName) {
                    result.push(elem);
                }
            }
        }
        return result;

    }

    validateEvent(time, weekDay) {
        for (let i = 0; i < this.events.length; i++) {
            let eventElem = this.events[i];
            let eventDay = eventElem.weekDay;
            let eventTime = eventElem.time;
            if (eventTime === time && eventDay === weekDay) {
                return false;
            }
        }
        return true;
    }
}

export class TableCalendar {
    tableDraw(scheduleEvents) {
        let display = document.getElementById("display");


        let tableReport = "";
        let tableRow = "";


        let preparedList = this.sortEvent(scheduleEvents);
        for (let row = 0; row < timeFrames.length + 1; row++) {
            tableRow += "<tr>";
            for (let col = 0; col < weekDays.length + 1; col++) {
                if (row === 0 && col === 0) {
                    tableRow += "<th style='border: 1px solid grey'>Name</th>";
                } else if (row === 0) {
                    tableRow += "<th style='border: 1px solid grey'>" + weekDays[col - 1] + "</th>";
                } else if (col === 0) {
                    tableRow += "<td style='border: 1px solid grey; text-align: center'>" + timeFrames[row - 1] + "</td>";
                } else {
                    let actualDay = weekDays[col - 1];
                    let actualTime = timeFrames[row-1];
                    if (preparedList[actualDay] !== undefined && preparedList[actualDay][actualTime] !== undefined) {
                        let tableEvent = preparedList[actualDay][actualTime][0];
                        let actualTitle = tableEvent.title;
                        tableRow += `<td class="event-cell" style='border: 1px solid grey'><span class="event-box">${tableEvent.title}</span><img class="del-btn" data-time="${actualTime}" data-week-day="${actualDay}" data-title="${actualTitle}" src="img/close-cross.png" width="25" height="25"></td>`;
                    } else {
                        tableRow += `<td style='border: 1px solid grey'></td>`;
                    }
                }
            }
            tableRow += "</tr>";
        }

        tableReport = "<table>" + tableRow + "</table>";
        display.innerHTML = tableReport;

        return display;
    }

    sortEvent(eventsList) {
        let resultObject = {};

        for (let i = 0; i < eventsList.length; i++) {
            let elem = eventsList[i];
            let a = elem.weekDay;
            if (resultObject[a] === undefined) {
                resultObject[a] = {};
            }
            let b = elem.time;
            if (resultObject[a][b] === undefined) {
                resultObject[a][b] = [];
            }
            resultObject[a][b].push(elem);
        }
        return resultObject;
    }
}
