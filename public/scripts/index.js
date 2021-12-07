async function submitFile() {
    const file = document.getElementById("uploadFile").files[0];
    const shouldReplace = document.getElementById("addChoice").checked;
    
    var data = new FormData()
    data.append('file', file);
    data.append('shouldReplace', shouldReplace);
    let response = await fetch('/upload/file', {
        method: 'POST',
        body: data
    });
    response = await response.text();
    console.log(response);
}