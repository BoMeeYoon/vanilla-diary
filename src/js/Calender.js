import { event } from "./elementsHook.js";
import calenderState from "./CalenderStates.js";

const log = console.log;
const tag = "[Calender.js]";
export default class Calender {
  constructor() {
    this.months = calenderState.months;
    this.days = calenderState.days;
    this.today = new Date();
    this.activeMonth = this.today.getMonth();
    this.activeDate = this.today;
  }
  init() {
    this.bindElements();
    this.bindEvents();
    this.getFirstDay = (year, month) => new Date(year, month, 1);
    this.getLastDay = (year, month) => new Date(year, month, 0);
    this.mountCalender();
  }
  bindElements() {
    this.yearEl = document.querySelector(".calender__active-year");
    this.monthEl = document.querySelector(".calender__active-month");
    this.prevBtn = document.querySelector(".calender__prev-month");
    this.nextBtn = document.querySelector(".calender__next-month");
    this.thead = document.querySelector(".calender__weeks");
    this.tbody = document.querySelector(".calender__dates");
  }
  bindEvents() {
    event(this.prevBtn, "click", () => this.activeMonthHandler("PREV"));
    event(this.nextBtn, "click", () => this.activeMonthHandler("NEXT"));
  }
  activeMonthHandler(type) {
    switch (type) {
      case "PREV":
        this.getAnotherMonth(--this.activeMonth);
        break;
      case "NEXT":
        this.getAnotherMonth(++this.activeMonth);
        break;
      default:
        throw new Error(`Unhandled activeMonthHandler`);
    }
    this.mountCalender();
  }
  getAnotherMonth(activeMonth) {
    const date = new Date();
    date.setDate(1);
    date.setMonth(activeMonth);
    this.activeDate = date;
    return date;
  }
  // SET days and dates
  mountCalender() {
    this.mountMonthAndYear();
    this.mountWeek();
    this.mountDate();
    // this.bindDateElements();
  }
  mountMonthAndYear() {
    this.yearEl.textContent = this.activeDate.getFullYear();
    this.monthEl.textContent = this.months[this.activeDate.getMonth()];
  }
  mountWeek() {
    this.thead.innerHTML = this.days.reduce((html, day) => {
      return (html += `<th id="${day}">${day}</th>`);
    }, "");
  }
  mountDate() {
    const activeDateHtml = this.getActiveDateHtml();
    this.tbody.innerHTML =
      activeDateHtml.reduce((html, date) => {
        return (html += date);
      }, `<tr>`) + `</tr>`;
  }
  getActiveDate() {
    const year = this.activeDate.getFullYear();
    const month = this.activeMonth;
    let days;
    switch (month) {
      case 1:
        return year % 4 === 0 && !year % 100 === 0 ? (days = 29) : (days = 28);
      case 3:
      case 5:
      case 8:
      case 10:
        return (days = 30);
      default:
        return (days = 31);
    }
  }
  getSpecificDay() {
    const activeDate = this.activeDate;
    const activeYear = activeDate.getFullYear();
    const activeMonth = activeDate.getMonth();
    const activeFirstDay = this.getFirstDay(activeYear, activeMonth);
    const prevMonthLastDate = this.getLastDay(activeYear, activeMonth);
    return {
      activeFirstDay: activeFirstDay.getDay(),
      prevMonthLastDate: prevMonthLastDate.getDate(),
    };
  }
  getActiveDateHtml() {
    const { activeFirstDay, prevMonthLastDate } = this.getSpecificDay();
    const todayDate = this.today.getDate();
    const currMonth = this.today.getMonth();
    const activeDays = this.getActiveDate();
    const activeYear = this.activeDate.getFullYear();
    const activeMonth = this.activeMonth;
    const activeDateHtml = [];

    const currFirstDay = activeFirstDay - 1;
    let nextMonthDate = 1;

    for (let i = 0; i < 7 * 6; i++) {
      if (i < activeFirstDay) {
        activeDateHtml.push(
          `<td id="${activeYear} -${activeMonth}-${
            prevMonthLastDate + i - currFirstDay
          } class="prev">${prevMonthLastDate + i - currFirstDay}</td>`
        );
      } else if (i > activeDays + currFirstDay) {
        activeDateHtml.push(
          `<td id="${activeYear}-${activeMonth}-${nextMonthDate}" class="next">${nextMonthDate}</td>`
        );
        nextMonthDate++;
      } else {
        todayDate === i - currFirstDay && currMonth === activeMonth
          ? activeDateHtml.push(
              `<td id="${activeYear}-${activeMonth}-${i - currFirstDay}">${
                i - currFirstDay
              }</td>`
            )
          : activeDateHtml.push(
              `<td id="${activeYear}-${activeMonth}-${i - currFirstDay}">${
                i - currFirstDay
              }</td>`
            );
      }
    }
    return this.getActiveWeeklyHtml(activeDateHtml);
  }
  getActiveWeeklyHtml(dateHtml) {
    const weeklyHtml = dateHtml;
    for (let i = 1; i < 6; i++) {
      const index = i * 7;
      index === 7
        ? weeklyHtml.splice(index, 0, `</tr><tr>`)
        : weeklyHtml.splice(index + i - 1, 0, `</tr><tr>`);
    }
    return weeklyHtml;
  }
}
