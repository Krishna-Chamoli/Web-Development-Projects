var socket = io('http://localhost:3000');
const sound = new Audio("../sounds/ting.mp3");

const messagebox = document.getElementById("messagebox");

function append(message, position){
    var element = document.createElement('div');
    if(position == "center"){
        element.classList.add(position)
    }
    else{
        element.classList.add("message", position);
        
    }
    element.innerHTML = `<strong>${message}</strong>`;
    messagebox.appendChild(element);

    if(position == "center" || position == "left"){
        sound.play();
    }
}

const naam = prompt("Enter your name");
socket.emit('new-user-joined', naam);

socket.on('user-joined', name=>{
    append(`${name} joined the chat`,"center");
})

socket.on('recieve', (name, msg)=>{
    append(`${name}: ${msg}`, "left");
})

socket.on('user-left',name=>{
    append(`${name} left the chat`, "center");
})

document.getElementById("sendmsgbox").addEventListener("submit",(e)=>{
    e.preventDefault();
    let msg = document.getElementById("messageinp").value;
    socket.emit("send", msg);
    append(`You: ${msg}`, "right");
    document.getElementById("messageinp").value = "";

})