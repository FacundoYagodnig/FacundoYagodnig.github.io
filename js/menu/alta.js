  class AltaForm {
    form = null
    inputs = null
    selects = null   //porque pasamos todos estos en null al comienzo ??
    option = null
    option2 = null
    btnSubmit = null
    validationArray = [false, false, false, false, false];
      
    regExpArray = [
      /^(([A-Z][a-z]{2,20}( [\d]{0,3}){0,3})){0,3}$/,     //nombre
      /^[\d]+$/,              //precio
      /^[\d]+$/,              //stock
      /^.+$/,                   //foto
      /^.+$/, //detalles
    ];

    constructor(renderTablaAlta, saveProduct ){
      this.form = document.querySelector(".alta-container__form");
      this.inputs = document.querySelectorAll(".alta-container form input");
      this.selects = document.querySelectorAll('.alta-container select')
      this.btnSubmit = document.querySelector("#submit-btn");
      this.btnSubmit.disabled = true;

      this.inputs.forEach((input, index) => { 
        
        if(input.type != 'checkbox') {
          input.addEventListener("input", () => {
            this.validator(input.value, this.regExpArray[index], index);
            if(renderTablaAlta) renderTablaAlta(!this.invalidFields(), productoController.productsList)
          });
        }
      });
  
      this.form.addEventListener("submit", e => { //porque poner este y el anterior recorrido para renderizar la tabla dentro del constructor?

        e.preventDefault();
        
        this.option = this.selects[0].options[this.selects[0].selectedIndex].text //porque solo me funciona aca y no como los demas ??
        this.option2 = this.selects[1].options[this.selects[1].selectedIndex].text
        let product =  this.leerProductoIngresado(this.option,this.option2)
        this.limpiarFormulario()

        if(saveProduct) saveProduct(product)
    
      });

    }
   
  setCustomCartel = function(mensaje, index) {
    let divs = document.querySelectorAll(".input-container div");
    divs[index].innerHTML = mensaje;
    divs[index].style.display = mensaje ? "block" : "none";
  };

  invalidFields() {
    //si cualquiera de las validaciones es false , son todas false , si son todas true queda en true y luego retorna el contrario para que lo tome el boton.disabled y se habilite o no
    let valid =
     this.validationArray[0] &&
     this.validationArray[1] &&
     this.validationArray[2] &&
     this.validationArray[3] &&
     this.validationArray[4] 
    
    console.log(`Are all the fields valid? : ${valid}`);
    return !valid;
  };

   validator (value, regExp, index) {
    

    if (!regExp.test(value)) {
      this.setCustomCartel('invalid value', index)
      this.validationArray[index] = false; //si falla la validacion, lo pasamos a false , ya que si la validacion sucede, pasara a true y el boton lo pasa a false mediante la funcion
      this.btnSubmit.disabled = true; //boton deshabilitado
  
      return null;
    }

    this.validationArray[index] = true;
    this.btnSubmit.disabled = this.invalidFields(); //la funcion toma el valor de validationArray y lo pasa de true a false o de false a true. En este caso si todas son true lo pasa a false y se habilita
    this.setCustomCartel("", index);
    return value;
  };

  

   leerProductoIngresado(option,option2){
   
    return  {
        name: this.inputs[0].value,
        price: this.inputs[1].value,
        stock: this.inputs[2].value,
        brand: option,
        category: option2,
        photo: this.inputs[3].value,
        details: this.inputs[4].value,
        send: this.inputs[5].checked,
        cantidad : 0,
        total:0,
    };
  }

  limpiarFormulario(){
    
    this.inputs.forEach(input => {
    
      if(input.type != 'checkbox') input.value = ''
      else if(input.type == 'checkbox') input.checked = false
  })
    this.btnSubmit.disabled = true;
    this.validationArray = [false, false, false, false, false];
  }

  
}

function renderTablaAlta(validos, productsList) {
  const xhr = new XMLHttpRequest();
  xhr.open("get", "plantillas/listado.hbs");
  xhr.addEventListener("load", () => {
    if (xhr.status == 200) {
      let plantillaHbs = xhr.response;

      var template = Handlebars.compile(plantillaHbs);
      let html = template({ productsList, validos });

      document.getElementById("product-list").innerHTML = html;
    }
  });
  xhr.send();
};


let formularioAlta = null

async function initAlta() {
  console.warn('initAlta()')

  formularioAlta = new AltaForm(renderTablaAlta, productoController.saveProduct)

  let productsList = await productoController.getProducts()
  renderTablaAlta(null, productsList)


}

