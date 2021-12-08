async function submitFile() {
    const file = document.getElementById("uploadFile").files[0];
    const shouldReplace = document.getElementById("replaceChoice").checked;
    
    try {
        let data = new FormData()
        data.append('file', file);
        data.append('shouldReplace', shouldReplace);
        let response = await fetch('/upload/file', {
            method: 'POST',
            body: data,
        });
        response = await response.text();
        if(response === 'success') {
            window.location.href = '/';
        }
        else {
            throw response;
        }
    }
    catch(err) {
        // code for giving the user a feedback that there is something wrong happened
    }
}

async function query() {
    const date = document.getElementById("date").value,
        time = document.getElementById("time").value,
        patientName = document.getElementById("patientName").value,
        loincCode = document.getElementById("loincCode").value,
        validDate = document.getElementById("validDate").value,
        validTime = document.getElementById("validTime").value;
    
    try {
        let query = {};
        if(date)
            query.date = date;
        if(time)
            query.time = time;
        query.patientName = patientName;
        query.loincCode = loincCode;
        if(validDate)
            query.validDate = validDate;
        if(validTime)
            query.validTime = validTime;
        let url = new URL('/query', document.baseURI);
        url.search = new URLSearchParams(query).toString();
        let response = await fetch(url);
        if(response.ok){
            response = await response.json();
            console.log(response);
        }
        else
            throw 'bad';
    }
    catch(err) {
        // code for giving the user a feedback that there is something wrong happened
        console.log(err);
    }
}