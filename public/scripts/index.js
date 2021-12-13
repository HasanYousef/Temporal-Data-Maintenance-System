async function submitFile() {
    const file = document.getElementById("uploadFile").files[0];
    const shouldReplace = document.getElementById("replaceChoice").checked;

    let dngr = document.getElementById('upload-danger'),
        succ = document.getElementById('upload-success');
    dngr.classList.add('d-none');
    succ.classList.add('d-none');
    
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
            succ.classList.remove('d-none');
        }
        else {
            throw response;
        }
    }
    catch(err) {
        dngr.classList.remove('d-none');
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
        if(patientName.split(' ').length !== 2)
            throw 'Invalid name format'
        query.patientName = patientName;
        query.loincCode = loincCode;
        if(validDate)
            query.validDate = validDate;
        if(validTime)
            query.validTime = validTime;
        let url = new URL('/query', document.baseURI);
        url.search = new URLSearchParams(query).toString();
        let btn = document.getElementById('search-button');
        btn.disabled = true;
        btn.innerHTML = `
            <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
            Search
        `;
        let response = await fetch(url);
        if(response.ok){
            response = await response.json();
            if(!response || Object.keys(response).length === 0) {
                document.getElementById('search-result').innerHTML = `
                    <h5>Nothing found</h5>
                `;
            }
            else {
                const dateFormatOptions = {
                    year: 'numeric',
                    month: 'numeric',
                    day: 'numeric',
                    hour: 'numeric',
                    minute: 'numeric',
                };
                let deletedAt;
                if(response.deletedAt) {
                    deletedAt = `
                        <br>
                        <span class="text-danger">Deleted at: ${(new Date(response.deletedAt)).toLocaleString('en-US', dateFormatOptions)}</span>
                    `;
                }
                document.getElementById('search-result').innerHTML = `
                    <div class="card" style="width: 100%;">
                        <div class="card-body">
                            <h5 class="card-title">${response.firstName} ${response.lastName}</h5>
                            <h6 class="card-subtitle mb-2 text-muted">${response.loincNum}  (${response.loincDescription})</h6>
                            <p class="card-text">Value: ${response.value}${response.unit !== 'none' ? ' ' + response.unit : ''}</p>
                            <p class="card-text">
                                Valid start time: ${(new Date(response.validStartTime)).toLocaleString('en-US', dateFormatOptions)}
                                <br>
                                Transaction time: ${(new Date(response.transactionTime)).toLocaleString('en-US', dateFormatOptions)}
                                ${response.deletedAt ? deletedAt : ''}
                            </p>
                        </div>
                    </div>
                `;
            }
            btn.disabled = false;
            btn.innerHTML = `
                Search
            `;
        }
        else
            throw 'bad';
    }
    catch(err) {
        console.log(err)
    }
}

async function deleteEvent() {
    const patientName = document.getElementById("patientName").value,
        loincCode = document.getElementById("loincCode").value,
        validDate = document.getElementById("validDate").value,
        validTime = document.getElementById("validTime").value;
        
    let dngr = document.getElementById('delete-danger'),
        succ = document.getElementById('delete-success');

    dngr.classList.add('d-none');
    succ.classList.add('d-none');
    
    try {
        let deleteQuery = {
            patientName,
            loincCode,validDate,
            validTime,
        };
        let response = await fetch('/delete', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(deleteQuery),
        });
        if(response.ok){
            succ.classList.remove('d-none');
        }
        else{
            throw 'bad';
        }
    }
    catch {
        dngr.classList.remove('d-none');
    }
}