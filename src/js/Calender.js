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
    this.getFirstDay = (year, month) => this.today(year, month, 1);
    this.getLastDay = (year, month) => this.today(year, month, 0);
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
  mountCalender() {
    // log("mountCalender");
  }
}
