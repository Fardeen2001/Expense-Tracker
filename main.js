let form = document.getElementById('addform');
let items = document.getElementById("list");

form.addEventListener("submit", addDetails);

let details = localStorage.getItem("details");
details = details ? JSON.parse(details) : [];

function displayInfo() {
  items.innerHTML = "";
  for (let i = 0; i < details.length; i++) {
    let singleDetail = details[i];
    let li = document.createElement('li');
    li.className = "list-group-item";
    li.innerHTML = `${singleDetail.price} - ${singleDetail.des} - ${singleDetail.opt}
      <button type="button" class="btn btn-danger btn-sm float-end" onclick="deleteInfo(${i})">Delete</button>
      <button type="button" class="btn btn-warning btn-sm float-end mx-2" onclick="editInfo(${i})">Edit</button>`;
    items.appendChild(li);
  }
}

function addDetails(e) {
  e.preventDefault();

  let priceVal = document.getElementById("specificSizeInputPrice").value;
  let desVal = document.getElementById("specificSizeInputGroupDescription").value;
  let optionValue = document.getElementById("specificSizeSelect");
  let optVal = optionValue.options[optionValue.selectedIndex].text;

  let expDetail = {
    price: priceVal,
    des: desVal,
    opt: optVal
  };

  details.push(expDetail);
  localStorage.setItem("details", JSON.stringify(details));

  displayInfo();
  form.reset();
}

function editInfo(index) {
  let det = details[index];
  let newPriceVal = document.getElementById("specificSizeInputPrice");
  let newDesVal = document.getElementById("specificSizeInputGroupDescription");
  let newOptionValue = document.getElementById("specificSizeSelect");
  let newOptVal = newOptionValue.options[newOptionValue.selectedIndex].text;

  newPriceVal.value = det.price;
  newDesVal.value = det.des;
  newOptionValue.value = newOptVal;

  const updateButton = document.createElement('button');
  updateButton.className = 'btn btn-outline-dark';
  updateButton.innerHTML = 'Update';
  updateButton.addEventListener('click', () => {
    det.price = newPriceVal.value;
    det.des = newDesVal.value;
    det.opt = newOptVal;

    localStorage.setItem('details', JSON.stringify(details));
    displayInfo();

    newPriceVal.value = '';
    newDesVal.value = '';
    newOptionValue.value = 'Choose...';

    updateButton.parentNode.replaceChild(submitButton, updateButton);
  });

  let submitButton = document.getElementById("submitBtn");
  submitButton.parentNode.replaceChild(updateButton, submitButton);
}

function deleteInfo(index) {
  details.splice(index, 1);
  localStorage.setItem("details", JSON.stringify(details));
  displayInfo();
}

displayInfo();
