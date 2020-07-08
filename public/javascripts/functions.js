    var form = document.getElementById('submit');
    form.onclick = () => {
        var textInput = document.getElementById('txt-input').value;
        var splitText = textInput.split(' ');
        
            for(let i=0; i<=splitText.length-1; i++) {
                var result =splitText[i].split('').find(char => char == '.');
                console.log(result);
                if( result == '.') {
                    var append = `<iframe src= ${splitText[i]}> </iframe>`;
                    console.log(append);
                    break;
                };
            }
        console.log(textInput);
    }
