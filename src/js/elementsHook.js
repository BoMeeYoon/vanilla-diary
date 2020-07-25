export const $ = (selector) => document.querySelector(selector);

export const all$ = (selector) => document.querySelectorAll(selector);

export const event = (selector, type, action) =>
  selector.addEventListener(type, action);

export const addClassName = (selector, className) =>
  selector.classList.add(className);

export const toggleClassName = (selector, className) =>
  selector.classList.toggle(className);

export const removeClassName = (selector, className) =>
  selector.classList.remove(className);
