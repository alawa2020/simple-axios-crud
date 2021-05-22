const d = document,
$crudTitle = d.querySelector(".crud-title"),
$crudForm = d.querySelector(".crud-form"),
$crudTable = d.querySelector(".crud-table"),
$crudTemplate = d.querySelector(".crud-template").content,
$fragment = d.createDocumentFragment();


//READ
const getAll = async ()=>{
    try {
        let res = await axios.get("http://localhost:5555/doteros"),
        json = await res.data;
 
        json.forEach(el=>{

            $crudTemplate.getElementById("td-id").textContent = el.id;
            $crudTemplate.getElementById("td-name").textContent = el.nombre;
            $crudTemplate.getElementById("td-team").textContent= el.equipo;
            $crudTemplate.getElementById("td-position").textContent = el.posicion;

            $crudTemplate.querySelector(".edit-button").dataset.id = el.id;
            $crudTemplate.querySelector(".edit-button").dataset.name = el.nombre;
            $crudTemplate.querySelector(".edit-button").dataset.team = el.equipo;
            $crudTemplate.querySelector(".edit-button").dataset.position = el.posicion;

            $crudTemplate.querySelector(".delete-button").dataset.id = el.id;

            const $clone = d.importNode($crudTemplate,true);
            $fragment.appendChild($clone);

        });

        $crudTable.querySelector("tbody").appendChild($fragment);

    } catch (err) {
        let message = err.statusText || "Ocurrio un error";
        d.querySelector(".div-lista").textContent = `Error:${err.status}:${message}`
       
    }
}
//READ
d.addEventListener("DOMContentLoaded",getAll());

//CREATE and UPDATE
d.addEventListener("submit",async e=>{
    if(e.target === $crudForm){
        e.preventDefault();

        //CREATE
        if(!e.target.id.value){
            try {
                let options = {
                    method:"POST",
                    headers:{
                        "Content-type":"application/json;charset=utf-8"
                    },
                    data:JSON.stringify({
                        nombre:e.target.nombre.value,
                        posicion:e.target.posicion.value,
                        equipo:e.target.equipo.value
                    })
                }
                let res = await axios("http://localhost:5555/doteros",options);
                
            } catch (err) {
                console.log(err)
                
            }

        }else{
            //UPDATE
           
            try {

                let options ={
                    method:"PUT",
                    headers:{
                        "Content-type":"application/json;charset=utf-8"
                    },
                    data:JSON.stringify({
                        nombre:e.target.nombre.value,
                        posicion:e.target.posicion.value,
                        equipo:e.target.equipo.value
                    })
                }

                let res = axios(`http://localhost:5555/doteros/${e.target.id.value}`,options)
            } catch (err) {

                console.log(err)
                
            }
        }

    }
});

//UPDATE   and  DELETE
d.addEventListener("click",async e=>{
    if(e.target.matches(".edit-button")){
        $crudTitle.textContent = `Actualizando al jugador ${e.target.dataset.id}`;
        $crudForm.querySelector("#form-button").value = "Actualizar";
        $crudForm.nombre.value = e.target.dataset.name;
        $crudForm.equipo.value = e.target.dataset.team;
        $crudForm.posicion.value = e.target.dataset.position;
        $crudForm.id.value = e.target.dataset.id;
    }

    if(e.target.matches(".delete-button")){
        let isDelete = confirm(`¿Eliminar al jugador ${e.target.dataset.id}?`)
        if(isDelete){
            try {
                let options = {
                    method:"DELETE",
                    headers:{
                        "Content-type":"application/json;charset=utf-8"
                    }
                }
                let res = axios(`http://localhost:5555/doteros/${e.target.dataset.id}`,options)
            } catch (err) {
                console.log(err)
                
            }
        }
    }
})