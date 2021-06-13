var item = document.getElementById("item");
var btnSave = document.getElementById("save");
var btnClear = document.getElementById("clear");
var totalCounter = document.querySelector("span#contador");
var list = document.querySelector("ul");
var itemList = document.getElementsByTagName("li");

var render = [];

var localStorageSize = localStorage.length;

if (localStorageSize == 0) {
    totalCounter.innerHTML = "Sem itens";
} else {
    totalCounter.innerHTML = "<strong>" + localStorageSize + "</strong> ";
}

entrada.addEventListener("submit", function(){
    if (item.value != "") {
        localStorage.setItem(localStorageSize, item.value);
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
    render.push(`
        <li class='list-group-item list-group-item-primary w-100 my-1' onclick='mark(${i})'>
            ${localStorage.getItem(i)}
            <i></i>
        </li>
        `);
}

for(var j=0; j < itemList.length; j++) {
    itemList[j].addEventListener("click", function(){
        itemList[j].setAttribute("class", "alert alert-info");
    });
}

list.innerHTML = render.toString().replaceAll(",", "");

function mark(id){
    document.getElementsByTagName("li")[id].setAttribute("class", "list-group-item list-group-item-success w-100 my-1");
    document.getElementsByTagName("li")[id].setAttribute("onclick", "unmark("+ id +")");
}

function unmark(id){
    document.getElementsByTagName("li")[id].setAttribute("class", "list-group-item list-group-item-info w-100 my-1");
    document.getElementsByTagName("li")[id].setAttribute("onclick", "mark("+ id +")");
}