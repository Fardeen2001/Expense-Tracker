let form = document.getElementById("addform");
let items= document.getElementById("list");

form.addEventListener('submit',adduser);

let details = localStorage.getItem("details");
details = details ? JSON.parse(details) : [];

function display(){
    items.innerHTML="";
    for(let i=0;i<details.length;i++){
        let user = details[i];
        let li = document.createElement('li');
        li.className="list-group-item";
        li.innerHTML=`${user.price}-${user.des}-${user.opt}<button type="button" class="btn btn-danger btn-sm float-end" onclick='deleteuser(${i})'>Delete</button><button type="button" class="btn btn-warning btn-sm float-end mx-2" onclick='edituser("${user.price}","${user.des}","${user.opt}",${i})'>Edit</button>`
        items.appendChild(li)
    }
}

function adduser(e){
    e.preventDefault();
    let price = document.getElementById("specificSizeInputPrice").value;
    let des = document.getElementById("specificSizeInputGroupDescription").value;
    let opt = document.getElementById("specificSizeSelect").value;
    let userobj = {
        price: price,
        des: des,
        opt: opt
      };
      if(price=="" || des=="" || opt===""){
        alert("enter proper values")
      }else{
      details.push(userobj);
      localStorage.setItem("details", JSON.stringify(details));
      display();
      form.reset();
      }
}
function deleteuser(index){
    details.splice(index, 1);
    localStorage.setItem("details", JSON.stringify(details));
    display();
}
function edituser(price,des,opt,index){
    document.getElementById("specificSizeInputPrice").value=price;
    document.getElementById("specificSizeInputGroupDescription").value=des;
    document.getElementById("specificSizeSelect").value=opt;
    deleteuser(index)
    //opt.options[opt.selectedIndex].text=opt;
}
display();