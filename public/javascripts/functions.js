    var form = document.getElementById('submit');
    var append = '';
    form.onclick = () => {
        var textInput = document.getElementById('txt-input').value;
        var splitText = textInput.split(' ');
        var ifr = document.getElementsByClassName('ifr');

        for(let i=0; i<=splitText.length-1; i++) {
            var result =splitText[i].split('').find(char => char == '.');
            if( result == '.') {
                    append = `<iframe src=' ${splitText[i]}'> </iframe>`;
                    console.log(append);
                    
                    break;
                };
            }
        console.log(textInput);
        var ifr = document.getElementsByClassName('ifr');
        ifr[ifr.length-1].innerHTML = append;
    }
