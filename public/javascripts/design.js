// Show the modal for username when load page
$('#staticBackdrop').modal("show");

// Check filling username
document.querySelector('#usernameInput').onkeyup = () => {
    if (document.querySelector('#usernameInput').value === '') 
        document.querySelector('#btnUsername').disabled = true;
    else
        document.querySelector('#btnUsername').disabled = false;
}
