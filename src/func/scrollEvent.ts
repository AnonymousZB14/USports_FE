export const scrollHandler = (element: HTMLElement) => {
  element.addEventListener("scroll", (e) => {
    if (element.scrollTop > 40) {
      element.classList.add("scrolled");
    } else {
      element.classList.remove("scrolled");
    }
  });
};
