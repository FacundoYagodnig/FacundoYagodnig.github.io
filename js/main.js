class Main {

 async ajax (url, metodo='get') {
  return await fetch(url, {method : metodo}).then(r => r.text())
  };

 getFileName(id)  {
  return 'vistas/' + id + '.html'};

  marcarLink(id) {
    let links = document.querySelectorAll('header nav a')
    links.forEach( link => {
        if(link.id == id) link.classList.add('active')
        else link.classList.remove('active')
    })
}

initJS(id){

  if(id == 'alta'){
    initAlta()}

  else if(id == 'inicio'){
   initInicio()}

  else if(id == 'nosotros'){
    initNosotros()}

  else if(id == 'contacto'){
   initContacto()}

  else if(id == 'carrito'){
    initCarrito()}

}

 async cargarPlantilla(id){
 
    let fileName = this.getFileName(id);
    let plantilla = await this.ajax(fileName)
    // Carga del código de vista (HTML) de la plantilla
    let main = document.querySelector('main')
    main.innerHTML = plantilla

     // Carga del código script (JS) de la plantilla
     this.initJS(id)

  }
    
 async getPlantillas(){
  /* Carga inicial de la plantilla, segun la url visitada */
  let id = location.hash.slice(1) || 'inicio'; //si no esta definido, sale inicio
  this.marcarLink(id)
  await this.cargarPlantilla(id);

  /* Carga de cada uno de los contenidos segun la navegacion local */
  let links = document.querySelectorAll("header nav a");

  links.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();

      let id = link.id;
      console.log(id);
      location.hash = id;
    });
  });

  window.addEventListener("hashchange", async () => {
      let id = location.hash.slice(1) || 'inicio'; //si no esta definido, sale inicio
      this.marcarLink(id)
      await this.cargarPlantilla(id);
    });
  }

  async start() {
    await this.getPlantillas()
  }

}


const main = new Main()
main.start()