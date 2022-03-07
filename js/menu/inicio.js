const renderCards = async (cards) => {
  let plantillaHbs = await fetch("plantillas/cards.hbs").then((r) => r.text());
  Handlebars.registerHelper("toLocaleString", function (number) {
    return number.toLocaleString("es-AR");
  });
  var template = Handlebars.compile(plantillaHbs);
  let html = template({ cards });
  document.getElementById("cards-container").innerHTML = html;
};

class Carrousel {
  startPlay;
  menuToggle = document.querySelector(".menu-toggle");
  navbar = document.querySelector(".nav-bar");
  header = document.querySelector(".manu-header");
  constructor() {
    this.carrousel = document.querySelector(".carrousel");
    this.slider = document.querySelectorAll(".slider");
    this.imgs = document.querySelector(".slider img");
    this.prevBtn = document.querySelector(".prev-btn");
    this.nextBtn = document.querySelector(".next-btn");
    this.dots = document.querySelectorAll(".dot-icon");

    this.totalLength = this.slider.length;
    this.slideCounter = 0;
  }
  //go next image
  goNextImage = () => {
    this.slideCounter++;
    this.slider.forEach((slide) => {
      slide.classList.remove("active");
    });
    this.dots.forEach((dot) => {
      dot.classList.remove("active");
    });

    if (this.slideCounter > this.totalLength - 1) {
      this.slideCounter = 0;
    }

    this.slider[this.slideCounter].classList.add("active");
    this.dots[this.slideCounter].classList.add("active");
    console.log(this.slideCounter);
  };

  //go previous image
  goPreviousImage = () => {
    this.slideCounter--;
    this.slider.forEach((slide) => {
      slide.classList.remove("active");
    });
    this.dots.forEach((dot) => {
      dot.classList.remove("active");
    });

    if (this.slideCounter < 0) {
      this.slideCounter = this.totalLength - 1;
    }

    this.slider[this.slideCounter].classList.add("active");
    this.dots[this.slideCounter].classList.add("active");
    console.log(this.slideCounter);
  };

  dotNavigation = (index) => {
    this.slider.forEach((slide) => {
      slide.classList.remove("active");
    });
    this.dots.forEach((dot) => {
      dot.classList.remove("active");
    });

    this.slider[index].classList.add("active");
    this.dots[index].classList.add("active");
  };

  //start autoplay

  autoplay = () => {
    Carrousel.startPlay = setInterval(this.goNextImage, 4000);
  };

  initCarrousel = async () => {
    this.nextBtn.addEventListener("click", this.goNextImage);
    this.prevBtn.addEventListener("click", this.goPreviousImage);
    this.dots.forEach((dot, index) => {
      dot.addEventListener("click", () => {
        this.dotNavigation(index);
        this.slideCounter = index;
      });
    });

    this.carrousel.addEventListener("mouseover", () => {
      clearInterval(Carrousel.startPlay);
    });
    this.carrousel.addEventListener("mouseout", () => {
      this.autoplay();
    });

    this.autoplay();
  };
}

async function initInicio() {
  console.warn("initInicio()");

  let products = await productoController.getProducts();
  await renderCards(products);

  const carrousel2 = new Carrousel();
  carrousel2.initCarrousel();

  document.querySelector(
    ".section-cards__header p"
  ).innerHTML = `Se encontraron ${products.length} productos`;
}
