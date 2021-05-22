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