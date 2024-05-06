const submit = document.getElementById("btn-submit");

function addFunds(addition) {
    fetch('https://funding-requests-management-dfae31570a7e.herokuapp.com/funds', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(addition)
    })
        .then(response => {
            console.log("The fetch function was successful"); 
            return response.json();
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

submit.addEventListener('click', event => {
    event.preventDefault();
    const name = document.getElementById("fund-name").value;
    const type = document.getElementById("Type").value; 
    const estimatedFund = document.getElementById("est-fund").value;
    const applicantFund = document.getElementById("fund-applicant").value;
    const suitable = document.getElementById("fund-applicant").value;
    const deadline = document.getElementById("app-deadline").value;
    const summary = document.getElementById("more-info").value;
    addFunds({ name, type, estimatedFund, applicantFund, suitable, deadline, summary });
});

