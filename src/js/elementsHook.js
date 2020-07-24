export const event = (selector, type, action) => {
  return selector.addEventListener(type, action);
};
