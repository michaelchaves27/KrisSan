window.onload = loadPagina;

function loadPagina(){

CallService();
initMap();


}
var datos;
var datoClick = 0;


function CallService() {
  var uriServer = "https://michaelchaves27.github.io/Json/Productos.json";
  //datoClick = parseInt(this.name)
  $.ajax(
    {
      url: uriServer,
      type: "get",
      dataType: "json",
      success: OnSuccess,
      error: OnError
    }
  );
}
function OnSuccess(data) {
    datos = data;
    cargarMenu();
  }
  
  function OnError(jqXHR, textStatus, errorThrown) {
  
  }

  function cargarMenu() {

    let container = document.getElementById("menu-container-id");
    container.innerHTML = "";
    datos.Productos.forEach(producto => {
      let contenedorProducto = `  <div class="col-md-3">
      <div class="card mb-4 product-wap rounded-0">
          <div class="card rounded-0">
              <img class="card-img rounded-0 img-fluid" src=${producto.imagen}>
              <div class="card-img-overlay rounded-0 product-overlay d-flex align-items-center justify-content-center">
                  <ul class="list-unstyled">    
                  </ul>
              </div>
          </div>
          <div class="card-body">
              <a href="shop-single.html" class="h3 text-decoration-none">${producto.nombre}</a>
              <ul class="w-100 list-unstyled d-flex justify-content-between mb-0">
                  
                  <li class="pt-2">
                      <span class="product-color-dot color-dot-red float-left rounded-circle ml-1"></span>
                      <span class="product-color-dot color-dot-blue float-left rounded-circle ml-1"></span>
                      <span class="product-color-dot color-dot-black float-left rounded-circle ml-1"></span>
                      <span class="product-color-dot color-dot-light float-left rounded-circle ml-1"></span>
                      <span class="product-color-dot color-dot-green float-left rounded-circle ml-1"></span>
                  </li>
              </ul>
              <ul class="list-unstyled d-flex justify-content-center mb-1">
                  <li>
                      <i class="text-warning fa fa-star"></i>
                      <i class="text-warning fa fa-star"></i>
                      <i class="text-warning fa fa-star"></i>
                      <i class="text-warning fa fa-star"></i>
                      <i class="text-muted fa fa-star"></i>
                  </li>
              </ul>
              <p class="text-center mb-0">₡${producto.precio}</p>
          </div>
      </div>
  </div>`;
      
     
  
      container.innerHTML += contenedorProducto;
  
      //container.appendChild(contenedorPlatillo);
    });
}


function initMap() {

    const coords={ lat: 10.402445283456759,  lng: -84.37902729467332 };
    const coords2={ lat: 10.411023024209975,  lng: -84.38392718221732 };

    const map = new google.maps.Map(document.getElementById("mapid"), {
      center: coords,
      zoom: 14,
    });


     marker = new google.maps.Marker({
       
        position: coords,
        map,
        title: "KrisSan",
      });

      var objeDR={
        map
      }

      var OjeDS={
        origin: coords2,
        destination: coords,
        travelMode: google.maps.TravelMode.DRIVING
      }

      var ds =new google.maps.DirectionService();

      var dr =new google.maps.DirectionRenderer(objeDR);

      ds.route(OjeDS, fnRoutear)


  
  }
  
  function fnRoutear(resultados, status){
if(status=='OK'){
    dr.setDirections(resultados);
}else{
    alert('Error')
}
  }