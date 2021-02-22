var selectedRow = null
var x = 1;

function tableRowCount() {
    x = document.getElementById("details").rows.length;
    document.getElementById("rowCount").innerHTML = "Total Rows " + (x - 1);
}

function onFormSubmit() {
    // var validateName = document.getElementById("name").value;
    if (document.getElementById("name").value != "" && document.getElementById("uname").value != "" && document.getElementById("email").value != "" && document.getElementById("pno").value != "") {
        var formData = readFormData();
        if (selectedRow == null) {
            addRecord(formData);
        } else {
            updateRecords(formData);
        }
        resetForm();
        tableRowCount();
    } else {
        alert('Insufficient Details !')
    }

}

function readFormData() {
    formData = {
        id: x,
        name: document.getElementById("name").value,
        username: document.getElementById("uname").value,
        phone: document.getElementById("email").value,
        email: document.getElementById("pno").value
    }
    if (!localStorage.getItem("data")) {
        localStorage.setItem('data', data)
    } else {
        let stored = localStorage.getItem('data')
        let stored_obj = JSON.parse(stored);
        // var stored=JSON.parse(localStorage.getItem("data"))
        //console.log(stored_obj)
        stored_obj.push(formData)
        console.log(stored_obj)
        let myObj = JSON.stringify(stored_obj)
        localStorage.setItem("data", myObj)
    }
    var FormData = {};
    FormData["id"] = x;
    FormData["name"] = document.getElementById("name").value;
    FormData["uname"] = document.getElementById("uname").value;
    FormData["email"] = document.getElementById("email").value;
    FormData["pno"] = document.getElementById("pno").value;
    return FormData;
}

function addRecord(data) {
    var table = document.getElementById("details").
    getElementsByTagName('tbody')[0];
    var newRow = table.insertRow(table.length);
    cell1 = newRow.insertCell(0);
    cell1.innerHTML = data.id;
    cell2 = newRow.insertCell(1);
    cell2.innerHTML = data.name;
    cell3 = newRow.insertCell(2);
    cell3.innerHTML = data.uname;
    cell4 = newRow.insertCell(3);
    cell4.innerHTML = data.email;
    cell5 = newRow.insertCell(4);
    cell5.innerHTML = data.pno;
    cell6 = newRow.insertCell(5);
    cell6.innerHTML = `<button  onclick="onEdit(this)" data-toggle="modal" data-target="#exampleModal">Edit</button> <button  data-toggle='modal' data-target='#delete' onClick='onDelete2(this)'>Delete</button>`;

}

function resetForm() {
    document.getElementById("name").value = "";
    document.getElementById("uname").value = "";
    document.getElementById("email").value = "";
    document.getElementById("pno").value = "";
    selectedRow = null;
}

function onEdit(td) {
    selectedRow = td.parentElement.parentElement;
    document.getElementById("id").value = selectedRow.cells[0].innerHTML;
    document.getElementById("name").value = selectedRow.cells[1].innerHTML;
    document.getElementById("uname").value = selectedRow.cells[2].innerHTML;
    document.getElementById("email").value = selectedRow.cells[3].innerHTML;
    document.getElementById("pno").value = selectedRow.cells[4].innerHTML;
}

function updateRecords(formData) {
    selectedRow.cells[1].innerHTML = formData.name;
    selectedRow.cells[2].innerHTML = formData.uname;
    selectedRow.cells[3].innerHTML = formData.email;
    selectedRow.cells[4].innerHTML = formData.pno;
}

function onDelete() {
    document.getElementById("details").deleteRow(row.rowIndex);
    tableRowCount();

}

function onDelete2(td) {
    row = td.parentElement.parentElement;
}

function fetchData() {
    fetch("https://jsonplaceholder.typicode.com/users").then(
        res => {
            res.json().then(
                data => {
                    // console.log(data);

                    if (data.length > 0) {
                        var temp = "";
                        x = data.length + 1;
                        if (!localStorage.getItem("data")) {
                            localStorage.setItem("data", data)
                        } else {
                            let newData = localStorage.getItem("data")
                            let newData2 = JSON.parse(newData)
                            console.log(newData2)
                            for (let i = 0; i < newData2.length; i++) {
                                temp += "<tr>";
                                temp += "<td>" + newData2[i].id + "</td>";
                                temp += "<td>" + newData2[i].name + "</td>";
                                temp += "<td>" + newData2[i].username + "</td>";
                                temp += "<td>" + newData2[i].phone + "</td>";
                                temp += "<td>" + newData2[i].email + "</td>";
                                temp += "<td><button onClick='onEdit(this)' data-toggle='modal' data-target='#exampleModal'> Edit</button> <button data-toggle='modal' data-target='#delete' onClick='onDelete2(this)'>Delete</button>";
                            }
                        }
                        document.getElementById("data").innerHTML = temp;
                        let myObj = JSON.stringify(data);
                        localStorage.setItem("data", myObj);
                    }
                }
            )
        }
    )

}

fetchData();