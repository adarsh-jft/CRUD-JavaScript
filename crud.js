var selectedRow = null
var x = 1;

function tableRowCount() {
    x = document.getElementById("details").rows.length;
}



function onFormSubmit() {
    var formData = readFormData();
    if (selectedRow == null) {
        addRecord(formData);
    } else {
        updateRecords(formData);
    }
    resetForm();
    tableRowCount();
}

function readFormData() {
    var formData = {};
    formData["id"] = x;
    formData["fname"] = document.getElementById("fname").value;
    formData["lname"] = document.getElementById("lname").value;
    formData["age"] = document.getElementById("age").value;
    formData["pno"] = document.getElementById("pno").value;
    return formData;


}

function addRecord(data) {
    var table = document.getElementById("details").
    getElementsByTagName('tbody')[0];
    var newRow = table.insertRow(table.length);
    cell1 = newRow.insertCell(0);
    cell1.innerHTML = data.id;
    cell2 = newRow.insertCell(1);
    cell2.innerHTML = data.fname;
    cell3 = newRow.insertCell(2);
    cell3.innerHTML = data.lname;
    cell4 = newRow.insertCell(3);
    cell4.innerHTML = data.age;
    cell5 = newRow.insertCell(4);
    cell5.innerHTML = data.pno;
    cell6 = newRow.insertCell(5);
    cell6.innerHTML = `<button  onclick="onEdit(this)" data-toggle="modal" data-target="#exampleModal">Edit</button> <button onClick="onDelete(this)">Delete</button>`;

}

function resetForm() {
    document.getElementById("fname").value = "";
    document.getElementById("lname").value = "";
    document.getElementById("age").value = "";
    document.getElementById("pno").value = "";
    selectedRow = null;
}

function onEdit(td) {
    selectedRow = td.parentElement.parentElement;
    document.getElementById("fname").value = selectedRow.cells[1].innerHTML;
    document.getElementById("lname").value = selectedRow.cells[2].innerHTML;
    document.getElementById("age").value = selectedRow.cells[3].innerHTML;
    document.getElementById("pno").value = selectedRow.cells[4].innerHTML;
}

function updateRecords(formData) {
    selectedRow.cells[1].innerHTML = formData.fname;
    selectedRow.cells[2].innerHTML = formData.lname;
    selectedRow.cells[3].innerHTML = formData.age;
    selectedRow.cells[4].innerHTML = formData.pno;
}

function onDelete(td) {
    if (confirm('Are you sure you want to delete this record ?')) {
        row = td.parentElement.parentElement;
        document.getElementById("details").deleteRow(row.rowIndex);
        resetForm();
    }

}

function fetchData() {
    fetch("https://jsonplaceholder.typicode.com/users").then(
        res => {
            res.json().then(
                data => {
                    console.log(data);

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
                                temp += "<td><button class='btn btn-warning' onClick='onEdit(this)' data-toggle='modal' data-target='#exampleModal'>Edit</button> <button class='btn btn-danger' onClick='onDelete(this)'>Delete</button>";
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