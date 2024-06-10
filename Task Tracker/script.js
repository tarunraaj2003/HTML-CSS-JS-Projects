const main = document.querySelector(".tasks");
const addTaskButton = document.getElementById("add-task");
const sortPriorityButton = document.getElementById("sort-priority");
const sortTimeButton = document.getElementById("sort-time");
const calculateTotalTimeButton = document.getElementById("calculate-total-time");

let data = [];

function getRandomTask() {
    const taskNames = [
        "Design UI",
        "Write Code",
        "Test Application",
        "Deploy to Server",
        "Write Documentation"
    ];
    const randomTask = taskNames[Math.floor(Math.random() * taskNames.length)];
    const newTask = {
        id: Date.now(),
        name: randomTask,
        priority: Math.floor(Math.random() * 10) + 1,
        time: Math.floor(Math.random() * 100) + 1
    };
    addData(newTask);
}

function addData(task) {
    data.push(task);
    updateDOM();
}

function updateDOM(providedData = data) {
    main.innerHTML = "";
    providedData.forEach((task) => {
        const element = document.createElement("div");
        element.classList.add("task");
        element.innerHTML = `
          <div class="task-content">
            <strong>${task.name}</strong> 
            <span>Priority: ${task.priority}, Time: ${task.time} mins</span>
          </div>
          <div class="task-buttons">
            <button class="increase-priority" data-id="${task.id}">Increase Priority 📈</button>
            <button class="remove-task" data-id="${task.id}">Remove Task ❌</button>
          </div>
        `;
        main.appendChild(element);
    });

    // Add event listeners to new buttons
    document.querySelectorAll('.increase-priority').forEach(item => {
        item.addEventListener('click', () => {
            const taskId = parseInt(item.getAttribute('data-id'));
            increasePriority(taskId);
        });
    });

    document.querySelectorAll('.remove-task').forEach(item => {
        item.addEventListener('click', () => {
            const taskId = parseInt(item.getAttribute('data-id'));
            removeTask(taskId);
        });
    });
}

function increasePriority(taskId) {
    const taskIndex = data.findIndex(task => task.id === taskId);
    if (taskIndex !== -1) {
        data[taskIndex].priority += 1;
        updateDOM();
    }
}

function removeTask(taskId) {
    data = data.filter(task => task.id !== taskId);
    updateDOM();
}

function sortByPriority() {
    data.sort((a, b) => a.priority - b.priority);
    updateDOM();
}

function sortByTime() {
    data.sort((a, b) => a.time - b.time);
    updateDOM();
}

function calculateTotalTime() {
    const totalTime = data.reduce((acc, task) => acc + task.time, 0);
    alert(`Total Time: ${totalTime} mins`);
}

addTaskButton.addEventListener("click", getRandomTask);
sortPriorityButton.addEventListener("click", sortByPriority);
sortTimeButton.addEventListener("click", sortByTime);
calculateTotalTimeButton.addEventListener("click", calculateTotalTime);

getRandomTask();
getRandomTask();
getRandomTask();
