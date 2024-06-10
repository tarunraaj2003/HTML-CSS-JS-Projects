const timeline = document.getElementById('timeline');
const workoutButtons = document.querySelectorAll('.workout-btn');
const remainingTimeDisplay = document.getElementById('remaining-time');
const progressBar = document.getElementById('progress-bar');

let completedMinutes = 0;
const goalMinutes = 60;

const updateProgress = () => {
    const remainingMinutes = goalMinutes - completedMinutes;
    remainingTimeDisplay.textContent = `Remaining: ${remainingMinutes} min`;

    const progressPercentage = (completedMinutes / goalMinutes) * 100;
    progressBar.style.width = `${progressPercentage}%`;

    if (remainingMinutes <= 0) {
        remainingTimeDisplay.textContent = "Goal Achieved!";
    }
};

const addWorkoutSession = (sessionType) => {
    if (completedMinutes >= goalMinutes) return;

    const sessionElement = document.createElement('div');
    sessionElement.classList.add('session');
    sessionElement.setAttribute('data-session', sessionType);
    sessionElement.innerHTML = sessionType.charAt(0).toUpperCase();

    timeline.appendChild(sessionElement);
    completedMinutes += 10;
    updateProgress();
};

workoutButtons.forEach(button => {
    button.addEventListener('click', () => {
        const sessionType = button.getAttribute('data-session');
        addWorkoutSession(sessionType);
    });
});

updateProgress();
