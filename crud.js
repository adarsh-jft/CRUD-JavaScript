// var count = 0;
var selectedRow = null
var x = 1;

function tableRowCount() {
    x = document.getElementById("details").rows.length;
}

// function myFunction(x) {
//     var x;
//     if (x == 1) {
//         count = count + 1;
//     }
//     if (count == 1) {
//         document.getElementById("add").style.backgroundColor = "red";
//     } else if (count == 2) {
//         document.getElementById("add").style.backgroundColor = "green";
//     }
// }

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
    localStorage.setItem("id", x);
    formData["id"] = x;
    formData["fname"] = document.getElementById("fname").value;
    var y = formData["fname"];
    localStorage.setItem("fname", y);
    formData["lname"] = document.getElementById("lname").value;
    var z = formData["lname"];
    localStorage.setItem("lname", z);
    formData["age"] = document.getElementById("age").value;
    var a = formData["age"];
    localStorage.setItem("age", a);
    formData["pno"] = document.getElementById("pno").value;
    var b = formData["pno"];
    localStorage.setItem("pno", b);
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
    cell6.innerHTML = `<a href = "" onclick="onEdit(this)" data-toggle="modal" data-target="#exampleModal">Edit</a> <a href ="" onClick="onDelete(this)">Delete</a>`;

}

function resetForm() {
    // document.getElementById("id").value = "";
    document.getElementById("fname").value = "";
    document.getElementById("lname").value = "";
    document.getElementById("age").value = "";
    document.getElementById("pno").value = "";
    selectedRow = null;
}

function onEdit(td) {
    selectedRow = td.parentElement.parentElement;
    //document.getElementById("id").value = seletedRow.cells[0].innerHTML;
    document.getElementById("fname").value = selectedRow.cells[1].innerHTML;
    document.getElementById("lname").value = selectedRow.cells[2].innerHTML;
    document.getElementById("age").value = selectedRow.cells[3].innerHTML;
    document.getElementById("pno").value = selectedRow.cells[4].innerHTML;
}

function updateRecords(formData) {
    //selectedRow.cells[0].innerHTML = formData.id;
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

// function fetchData() {
//     fetch("https://jsonplaceholder.typicode.com/users")
//         .then(res => res.json())
//         .then(data => {
//             window.localStorage.setItem("name", JSON.stringify(data.name));
//             console.log(data);
//             // console.log(JSON.parse(window.localStorage.getItem("user")));

//         })
// }

// fetchData();