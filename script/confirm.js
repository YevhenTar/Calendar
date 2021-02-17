"use strict";

import {Schedule} from "./script.js";

window.addEventListener("load", () => {
    let confirmButton = document.getElementById('confirm-btn');
    let eventName = document.getElementById('event-name');
    let participantsList = document.getElementById('participants-list');
    let dayList = document.getElementById('day-list');
    let timeList = document.getElementById('time-list');

    const schedule = new Schedule();

    confirmButton.addEventListener("click", () => {
        const participants = [];
        for (let option of participantsList.selectedOptions) {
            participants.push(option.value);
        }
        if(!schedule.addEvent(timeList.value, dayList.value, eventName.value, participants)){
            alert("Failed to create an event. Timeslot is already booked.");
        }
    });
});
