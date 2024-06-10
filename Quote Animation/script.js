document.addEventListener("DOMContentLoaded", function () {
  const quotes = document.querySelectorAll(".quote");

  quotes.forEach((quote, index) => {
    if (index < 3) {
      quote.classList.add("show", "slide-up");
    } else if (index < 6) {
      quote.classList.add("show", "fade-in");
    } else if (index < 9) {
      quote.classList.add("show", "rotate");
    } else {
      quote.classList.add("show", "zoom-in");
    }
  });

  const checkQuotes = () => {
    const triggerBottom = (window.innerHeight / 5) * 4;

    quotes.forEach((quote, index) => {
      const quoteTop = quote.getBoundingClientRect().top;
      if (quoteTop < triggerBottom) {
        quote.classList.add("show");
      } else {
        quote.classList.remove("show");
      }
    });
  };

  window.addEventListener("scroll", checkQuotes);
  checkQuotes();
});
