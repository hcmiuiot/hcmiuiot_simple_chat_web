//take username
var username;
document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('#btnUsername').onclick = () => {
        username = document.querySelector('#usernameInput').value;
    };
});


var clientSocket = io({ transports: ['websocket'], upgrade: false });

document.addEventListener('DOMContentLoaded', function () {
    document.querySelector('#send-container').onsubmit = function (
        e
    ) {
        e.preventDefault();
        if ($("#codecheck").is(":checked")) {
            clientSocket.emit(
                'code snippet',
                username,
                document.getElementById('txt-input').value
            );
            document.getElementById('txt-input').value = '';
            console.log('send code');
        }
        else {
            clientSocket.emit(
                'chat message',
                username,
                document.getElementById('txt-input').value,
                document.getElementById('lang').value 
            );
            document.getElementById('txt-input').value = '';
            console.log('send msg');
        }
    };
});


clientSocket.on('chat message', (msgsname, msg) => {
   
    var node = document.createElement('SECTION');
    var kirby = document.createElement("IMG");
    kirby.setAttribute('class', 'ava');
    kirby.setAttribute('src', 'https://www.spriters-resource.com/resources/sheet_icons/65/67841.png');

    if (msgsname === username) {
        setAtt(node, 'class', 'message -right');

        setAtt(node, 'id', 'right-msg');
        //Add msg:

        var nodemsg = document.createElement('DIV');
        var nodename = document.createElement("I");
        nodemsg.setAttribute(
            'class',
            'nes-balloon from-right'
        );
        nodename.setAttribute(
            'style',
            'color: lightgrey; margin-bottom: 0px; font-size: 20px '
        );
        var msgnode = document.createTextNode(msg);
        var namenode = document.createTextNode(msgsname);
        nodemsg.appendChild(msgnode);
        nodename.appendChild(namenode);
        node.appendChild(nodemsg);
        node.appendChild(nodename);
        node.appendChild(kirby);
        document.getElementById('msg-area').appendChild(node);
        console.log(node);
        darkmode();

    }
    else {
        setAtt(node, 'class', 'message -left');
        setAtt(node, 'id', 'left-msg');
        //Add msg:
        var nodemsg = document.createElement('P');

        var nodename = document.createElement("I");
        nodemsg.setAttribute(
            'class',
            'nes-balloon from-left'
        );
        nodename.setAttribute(
            'style',
            'font-style: oblique; font-size: 20; color: pink'
        );
        var msgnode = document.createTextNode(msg);
        var namenode = document.createTextNode(msgsname);
        nodename.appendChild(namenode);
        nodemsg.appendChild(msgnode);
        node.appendChild(nodename);
        node.appendChild(nodemsg);
        node.appendChild(kirby);
        document.getElementById('msg-area').appendChild(node);
        darkmode();

    }
    document.querySelector(
        '#msg-area'
    ).scrollTop = document.querySelector('#msg-area').scrollHeight;
    // end here
});

clientSocket.on('code snippet', (name, code, lang) => {
    var prenode = document.createElement('PRE');
    var codenode = document.createElement('CODE');
    setAtt(prenode, 'class', lang);
    setAtt(codenode, 'class', lang);
    var html = Prism.highlight(code, Prism.languages.javascript, 'javascript');
    codenode.innerHTML = html;
    prenode.appendChild(codenode);
    document.getElementById('msg-area').appendChild(prenode);
    document.querySelector(
        '#msg-area'
    ).scrollTop = document.querySelector('#msg-area').scrollHeight;
});


function setAtt(node, att, attvalues) {
    node.setAttribute(att, attvalues);
};



function darkmode() {

    if ($("#darkbox").is(":checked")) {
        $(".bg-image").attr("src", "/images/SnowNight.png");
        $(".ava").attr('src', '/images/rsz_3341.png');
        $(".nes-balloon").addClass("is-dark");
    }
    else {
        $(".bg-image").attr("src", "/images/Snow.png");
        $(".nes-balloon").removeClass("is-dark");
        $(".ava").attr('src', 'https://www.spriters-resource.com/resources/sheet_icons/65/67841.png');
    }
}

