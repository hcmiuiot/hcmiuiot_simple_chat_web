    var form = document.getElementById('submit');
    var append = '';
    form.onclick = () => {
        var textInput = document.getElementById('txt-input').value;
        var splitText = textInput.split(' ');
        var ifr = document.getElementsByClassName('ifr');

        for(let i=0; i<=splitText.length-1; i++) {
            var result =splitText[i].split('').find(char => char == '.');
            if( result == '.') {
                    append = `<iframe width="560" height="315" src="${result}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
                    console.log(append);
                    
                    break;
                };
            }
        console.log(textInput);
        var ifr = document.getElementsByClassName('ifr');
        ifr[ifr.length-1].innerHTML = append;
    }
