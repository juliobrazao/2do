var item = document.getElementById("item");
var btnSave = document.getElementById("save");
var btnClear = document.getElementById("clear");
var totalCounter = document.querySelector("span#total_counter");
var totalMarked = document.querySelector("span#total_marked");
var totalUnmarked = document.querySelector("span#total_unmarked");
var list = document.querySelector("ul");
var itemList = document.getElementsByTagName("li");

var marked = [];
var unmarked = [];

contagemParcial();

var render = [];

var localStorageSize = localStorage.length;
var markedItems = marked.length;
var unmarkedItems = unmarked.length;

if (localStorageSize == 0) {
    totalCounter.innerHTML = "Sem itens";
} else {
    totalCounter.setAttribute("class", "badge navbar-text rounded-pill bg-info text-dark");
    totalCounter.innerHTML = "<strong>" + localStorageSize + "</strong> ";
    totalMarked.innerHTML = "<strong>" + markedItems + "</strong>";
    totalUnmarked.innerHTML = "<strong>" + unmarkedItems + "</strong>";
}

entrada.addEventListener("submit", function(){
    if (item.value != "") {
        localStorage.setItem(localStorageSize, "__u_" + item.value);
        window.location.href = "./";
    }
});

btnClear.addEventListener("click", function(){
    Swal.fire({
        title: 'Atenção!',
        text: "Você deseja limpar sua lista? Este processo é irreversível.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sim',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire(
            '',
            'Sua lista está limpa!',
            'success'
          ).then((result) => {
              if (result.isConfirmed){
                localStorage.clear();
                window.location.href = "./";
              }
          });
        }
        
      })

});

for(var i=0; i < localStorageSize; i++) {
    if (localStorage.getItem(i).substring(0,4) == "__u_") {
        render.push(`
        <li class='list-group-item list-group-item-warning w-100 my-1' onclick='mark(${i})'>
            <div class='row'>
                <div class='col-1 text-center'>
                    <i class='bi bi-eye-slash-fill' onclick='hideForever(${i})'></i>
                </div>
                <div class='col-9 text-start'>
                    ${localStorage.getItem(i).substring(4)}
                </div>
                <div class='col-2 text-end'>
                    <i class='bi bi-check-all' onclick="deleteItem(${i})" id='item-icon'></i>
                </div>
            </div>
        </li>
        `);    
    } else if (localStorage.getItem(i).substring(0,4) == "__m_") {
        render.push(`
        <li class='list-group-item list-group-item-success w-100 my-1' onclick='unmark(${i})'>
            <div class='row'>
                <div class='col-1 text-center'>
                    <i class='bi bi-eye-slash-fill' onclick='hideForever(${i})'></i>
                </div>
                <div class='col-9 text-start'>
                    ${localStorage.getItem(i).substring(4)}
                </div>
                <div class='col-2 text-end'>
                    <i class='bi bi-check-all' onclick="deleteItem(${i})" id='item-icon'></i>
                </div>
            </div>
        </li>
        `);    
    } else if (localStorage.getItem(i).substring(0,4) == "__h_") {
        render.push(`
        <li class='list-group-item list-group-item-info w-100 my-1 d-none' onclick='unmark(${i})'>
            <div class='row'>
                <div class='col-8'>
                    ${localStorage.getItem(i).substring(4)}
                </div>
                <div class='col-2'>
                    <i class='bi bi-check-all' onclick="deleteItem(${i})" id='item-icon'></i>
                </div>
            </div>
        </li>
        `);
    }
    
}

for(var j=0; j < itemList.length; j++) {
    itemList[j].addEventListener("click", function(){
        itemList[j].setAttribute("class", "alert alert-info");
    });
}

list.innerHTML = render.toString().replaceAll(",", "");

function mark(id){
    document.getElementsByTagName("li")[id].setAttribute("onclick", "unmark("+ id +")");
    localStorage.setItem(id, localStorage.getItem(id).replace("__u_", "__m_"));
    window.location.href = "./";

}

function unmark(id){
    document.getElementsByTagName("li")[id].setAttribute("onclick", "mark("+ id +")");
    localStorage.setItem(id, localStorage.getItem(id).replace("__m_", "__u_"));
    window.location.href = "./";
}

function contagemParcial(){
    for (let i=0; i < localStorage.length; i++){
        if (localStorage.getItem(i)[2] == 'm'){
            marked.push(i);
        } else if (localStorage.getItem(i)[2] == 'u'){
            unmarked.push(i);
        }
    }
}

function hideForever(id){
    console.log(localStorage.getItem(id));
}