    var form = document.getElementById('submit');
    form.onclick = () => {
        var textInput = document.getElementById('txt-input').value;
        var splitText = textInput.split(' ');
        
<<<<<<< HEAD
            for(let i=0; i<=splitText.length-1; i++) {
                var result =splitText[i].split('').find(char => char == '.');
                console.log(result);
                if( result == '.') {
                    var append = `<iframe src="${splitText[i]}"></iframe>`;
=======
        for(let i=0; i<=splitText.length-1; i++) {
            var result =splitText[i].split('').find(char => char == '.');
            if( result == '.') {
                    var append = `<iframe src=' ${splitText[i]}'> </iframe>`;
>>>>>>> ebd2f7e541cedf0d66e6da9676eecb451635677f
                    console.log(append);
                    break;
                };
            }
        console.log(textInput);
    }
