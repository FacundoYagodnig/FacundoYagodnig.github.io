
 const  renderCards = async (cards) => {
  let plantillaHbs = await fetch('plantillas/cards.hbs').then(r => r.text())
  var template = Handlebars.compile(plantillaHbs);
  let html = template({ cards });
  document.getElementById("cards-container").innerHTML = html;

    // const xhr = new XMLHttpRequest();
    // xhr.open("get", "plantillas/cards.hbs");
    // xhr.addEventListener("load", () => {
    //   if (xhr.status == 200) {
    //     let cardsHbs = xhr.response;
    //     var template = Handlebars.compile(cardsHbs);
    //     let html = template({ cards: cards });

    //     document.getElementById("cards-container").innerHTML = html;
    //   }
    // });
    // xhr.send();
};

// let cards = [
//   new Card('notebook lenovo', 'con 2 juegos', 'img/productos/notebook-lenovo.jpg'),
//   new Card('apple iphone 11 pro max', 'con 2 juegos', 'img/productos/apple-iphone-11-pro-max.jpg'),
//   new Card('camara canon', 'con 2 juegos', 'img/productos/camara-canon.jpg'),
//   new Card('auriculares sony', 'con 2 juegos', 'img/productos/auriculares-sony.jpg'),
//   new Card('parlante jbl', 'con 2 juegos', 'img/productos/parlante-jbl.jpg'),
//   new Card('google nest mini', 'con 2 juegos', 'img/productos/google-nest-mini.jpg'),
//   new Card('samsung galaxy s21 plus 5g', 'con 2 juegos', 'img/productos/samsung-galaxy-s21-plus-5g.jpg'),
//   new Card('drone dji', 'con 2 juegos', 'img/productos/drone-dji.jpg'),                   
//   new Card('notebook lenovo', 'con 2 juegos', 'img/productos/notebook-lenovo.jpg'),      
//   new Card('dji mavic 2 pro', 'con 2 juegos', 'img/productos/dji-mavic-2-pro.jpg'),       
//   new Card('camara canon', 'con 2 juegos', 'img/productos/camara-canon.jpg'),             
//   new Card('chromecast google', 'con 2 juegos', 'img/productos/chromecast-google.jpg'),   
//   new Card('parlante jbl', 'con 2 juegos', 'img/productos/parlante-jbl.jpg'),             
//   new Card('google nest-mini', 'con 2 juegos', 'img/productos/google-nest-mini.jpg'),     
//   new Card('televisor lg', 'con 2 juegos', 'img/productos/televisor-lg.jpg'),             
//   new Card('drone dji', 'con 2 juegos', 'img/productos/drone-dji.jpg'),    
// ]




async function initInicio() {
  console.warn('initInicio()')

  let products = await productoController.getProducts()
  await renderCards(products)
  
  document.querySelector('.section-cards__header p').innerHTML = `Se encontraron ${products.length} productos`
 
}
