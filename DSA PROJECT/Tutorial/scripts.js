let stack = [];

function push() {
    const input = document.getElementById('stackInput').value;
    if (input) {
        stack.push(input);
        updateStack();
        speak(`Pushed ${input}`);
        document.getElementById('stackInput').value = '';
    } else {
        alert("Please enter a value to push.");
        speak("Please enter a value to push.");
        
    }
}


function pop() {
    if (stack.length === 0) {
        alert("Stack is empty.");
        speak("Stack is empty.")
        return;
    }
   const popitem= stack.pop();
    updateStack();
    speak(`Poped ${popitem}`);
    
}

function peek() {
    if (stack.length === 0) {
        alert("Stack is empty.");
        speak("Stack is empty.")
    } else {
        const item= stack[stack.length - 1]
        alert("Top element is: " + item);
        speak(`Top element is ${item}`);
    }
}

function isEmpty() {
    if (stack.length === 0) {
        alert("Stack is empty.");
        speak("Stack is empty.");
    } else {
        alert("Stack is not empty.");
        speak("Stack is not empty.");
    }
}

function updateStack() {
    const stackContainer = document.getElementById('stackContainer');
    stackContainer.innerHTML = '';
    stack.forEach(item => {
        const div = document.createElement('div');
        div.className = 'stack-item';
        div.innerText = item;
        stackContainer.appendChild(div);
    });
}
function speak(text) {
    const msg = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(msg);
}