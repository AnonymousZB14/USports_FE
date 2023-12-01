export const scrollHandler = (element: HTMLElement) => {
  console.log(element);
  element.addEventListener("scroll", (e) => {
    if (element.scrollTop > 10) {
      element.classList.add('scrolled')
    } else {
      element.classList.remove('scrolled')
      
    }
  });
};
