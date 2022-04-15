// Creamos siempre nuestro document ready
// Que el DOM se haya cargado correctamente 
$(function(){
  
    // Cramos nuestras variables cons sus respectivos selectores
    let buscar = $('#addEnlace');
    let inputNumHero = $('#numberHero');
    let contentInfoHero = $('#dataHero');
 
    // CREAMOS LOS EVENTOS PARA SACAR EL NUMERO DEL INPUT
    inputNumHero.change((e)=>{
        e.preventDefault()
        let numId = inputNumHero.val()
        if(numId.length != 0 && numId > 0){
             buscarHero(numId)
        }else{
             alert('Ingrese un Numero Correcto')
        }
    })

   buscar.change((e)=>{
        e.preventDefault()
        let numId = inputNumHero.val()
        console.log("Es el id --->", numId)
        if(numId.length != 0 && numId > 0){
             buscarHero(numId)
        }else{
             alert('Ingrese un Numero Correcto')
        }
    })
    const buscarHero = (numId) =>{
        $.ajax({
            url  :`https://www.superheroapi.com/api.php/4905856019427443/${numId}`,
            type : 'GET',
            dataType:'json',

            success:function(response){
                console.log('Salida de response--->',response)
                const data = response

                const infoHero = {
                    imagen : data.image.url,
                    nombre : data.name,
                    conexiones : data.connections["group-affiliation"],//Cuando un nodo lleva guion se escriben de esta forma
                    publicadoPor : data.biography.publisher,
                    ocupacion : data.work.occupation,
                    primeraAparicion : data.biography["first-appearance"],
                    altura : data.appearance.height,
                    peso : data.appearance.weight,
                    alianzas : data.biography.aliases,
                }
        
                
                const { imagen,nombre, conexiones, publicadoPor, ocupacion, primeraAparicion, altura, peso, alianzas } = infoHero  
                
                pintarHero( imagen,nombre, conexiones, publicadoPor, ocupacion, primeraAparicion, altura, peso, alianzas )

            },

            error:function(xhr,status){
                alert('Hay problemas con el Sitio Web. Intenta más tarde')
            },

            complete:function(xhr,status){
                //alert('Se realizo la consulta')
            }



        })

        const pintarHero = ( imagen,nombre, conexiones, publicadoPor, ocupacion, primeraAparicion, altura, peso, alianzas) => {
            contentInfoHero.html(`<div class="card d-flex flex-row">
            <img src="${imagen}" class="card-img-left" alt="...">
            <div class="card-body">
              <h5 class="card-title">${nombre}</h5>
              <ul class="list-group list-group-flush">
                <li class="list-group-item">${conexiones}</li>
                <li class="list-group-item">${publicadoPor}</li>
                <li class="list-group-item">${ocupacion}</li>
                <li class="list-group-item">${primeraAparicion}</li>
                <li class="list-group-item">${altura}</li>
                <li class="list-group-item">${peso}</li>
                <li class="list-group-item">${alianzas}</li>
              </ul>
            </div>
          </div>`
            )
        }
    }
})