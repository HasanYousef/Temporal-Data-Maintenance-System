async function submitFile() {
    const file = document.getElementById("uploadFile").files[0];
    const shouldReplace = document.getElementById("replaceChoice").checked;
    
    try {
        var data = new FormData()
        data.append('file', file);
        data.append('shouldReplace', shouldReplace);
        let response = await fetch('/upload/file', {
            method: 'POST',
            body: data
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