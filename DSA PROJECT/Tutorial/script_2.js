const queue = [];

function enqueue() {
    const input = document.getElementById('queueInput');
    const value = input.value.trim();

    if (value !== '') {
        queue.push(value);
        updateQueueDisplay();
        speak(`Enqueued ${value}`);
        input.value = '';
    }
}

function dequeue() {
    if (queue.length > 0) {
        const dequeueditem=queue.shift();
        updateQueueDisplay();
        speak(`dequeued ${dequeueditem}`);
    }
}
function isempty(){
    if(queue.length==0){
        alert("queue is empty!");
        speak("queue is empty!");

    }else{
        alert("queue is not empty!");
        speak("queue is not empty!");
    }
}
function updateQueueDisplay() {
    const queueContainer = document.getElementById('queue');
    queueContainer.innerHTML = ''; // Clear current display

    queue.forEach(item => {
        const queueItem = document.createElement('div');
        queueItem.classList.add('queue-item');
        queueItem.innerText = item;
        queueContainer.appendChild(queueItem);
    });
}
function speak(text) {
    const msg = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(msg);
}

