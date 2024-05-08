let budget;
let information;
let dataList;
let applicantDataList;
let selectedValue;

function bursaryInfo(selectedValue, data) {
    for (let i = 0; i < data.length; i++) {
        if (data[i].name == selectedValue) {
            information = data[i];
            break;
        }
    }
    budget = information.estimatedFund;
    document.getElementById("name").innerHTML = `Name: ${information.name}`;
    document.getElementById("available").innerHTML = `Available funds: R${budget}`;
}

function accept(index) {
        document.getElementById("summary").innerHTML = `Last accepted applicant: <br> <strong>${applicantDataList[index].applicantName}</strong>`;
        information.estimatedFund -= information.applicantFund;
        budget = information.estimatedFund;
        document.getElementById("available").innerHTML = `Available funds: R${budget}`;
}

function errorMessage(){
    alert("Unfortunately, you have gone beyond your budget!");
}

function changeButton(className, type) {
    const rejectButtons = document.querySelectorAll(`.reject-${className}`);
    const acceptButtons = document.querySelectorAll(`.accept-${className}`);
    
    if(information.estimatedFund > information.applicantFund){
        rejectButtons.forEach(button => {
            const paragraph = document.createElement('p');
            paragraph.style.color = "#138808"
            paragraph.innerText = "Option selected";
            button.parentNode.replaceChild(paragraph, button);
        });

        acceptButtons.forEach(button => {
            button.parentNode.removeChild(button);
        });

        if(type == "accept"){
            accept(className);
        }
    }else{
        errorMessage();
    }
}

const url = (input) => {
    return input.split(" ").join("%20");
}

document.addEventListener('DOMContentLoaded', () => {
    const dropdown = document.getElementById("funds");
    let updateFunds = document.getElementById("updateFund");

    fetch(`https://funding-requests-management-dfae31570a7e.herokuapp.com/funds`, {
        method: 'GET'
    })
    .then(response => response.json())
    .then(data => {
        dataList = data;
        dropdown.innerHTML = `<option value="Select">Select</option>`;
        data.forEach(element => {
            dropdown.innerHTML += `<option value="${element.name}">${element.name}</option>`
        });
    }).catch(error => {
        console.error(error);
    })

    dropdown.addEventListener('change', () => {
        selectedValue = dropdown.value;
        bursaryInfo(selectedValue, dataList);

        fetch(`https://funding-requests-management-dfae31570a7e.herokuapp.com/applicants/${url(selectedValue)}`, {
            method: 'GET'
        })
        .then(response => response.json())
        .then(data => {
            if (data.length > 0) {
                applicantDataList = data;
                updateFunds.innerHTML = `<ul id="applicants">`
                for (let i = 0; i < data.length; i++) {
                    updateFunds.innerHTML += `<li>Applicant: ${data[i].applicantName} <br> <input id="rejectBtn" class="reject-${i}" onClick='changeButton("${i}", "reject");' type='button' value='Reject'> <input id="acceptBtn" type='button' class="accept-${i}" onClick='changeButton("${i}", "accept");' value='Accept'><li>`;
                }
                updateFunds.innerHTML += `</ul>`
            } else {
                updateFunds.innerHTML = `No applicants have been found for ${selectedValue}`
            }
        }).catch(error => {
            console.error('Error:', error);
        })

    })
})
