let taskLog = [];
let sleepDuration = 0;

// Add task entry
document.getElementById('taskForm').addEventListener('submit', function(e) {
  e.preventDefault();
  
  const startTime = document.getElementById('startTime').value;
  const endTime = document.getElementById('endTime').value;
  const taskText = document.getElementById('taskText').value;

  if (!startTime || !endTime || !taskText) {
    alert("Please fill all fields.");
    return;
  }

  const duration = getTimeDiffInHours(startTime, endTime);
  if (duration <= 0) {
    alert("End time must be after start time.");
    return;
  }

  taskLog.push({ taskText, startTime, endTime, duration });
  displayTask({ taskText, startTime, endTime, duration });

  document.getElementById('taskForm').reset();
});

// Display task log as animated card
function displayTask({ taskText, startTime, endTime, duration }) {
  const logList = document.getElementById('taskLog');
  const li = document.createElement('li');
  li.classList.add('animated-entry');
  li.innerHTML = `
    <strong>${taskText}</strong><br>
    🕒 ${startTime} → ${endTime} &nbsp; | ⏱️ ${duration.toFixed(2)} hrs
  `;
  logList.appendChild(li);
}

// Sleep time calculation
document.getElementById('calcSleep').addEventListener('click', () => {
  const sleep = document.getElementById('sleepTime').value;
  const wake = document.getElementById('wakeTime').value;
  
  if (!sleep || !wake) {
    alert("Please enter both sleep and wake time.");
    return;
  }

  sleepDuration = getTimeDiffInHours(sleep, wake);
  document.getElementById('sleepHours').innerText = sleepDuration.toFixed(2);
});

// Generate summary
document.getElementById('generateSummary').addEventListener('click', () => {
  let workHours = taskLog.reduce((acc, task) => acc + task.duration, 0);
  let totalLogged = workHours + sleepDuration;
  let wasteHours = Math.max(24 - totalLogged, 0);

  document.getElementById('workHours').innerText = workHours.toFixed(2);
  document.getElementById('sleepSummary').innerText = sleepDuration.toFixed(2);
  document.getElementById('wasteHours').innerText = wasteHours.toFixed(2);

  showGrade(wasteHours);
});

// Time difference in hours (supports sleep at night, wake in morning)
function getTimeDiffInHours(start, end) {
  const [sh, sm] = start.split(':').map(Number);
  const [eh, em] = end.split(':').map(Number);
  const startMin = sh * 60 + sm;
  let endMin = eh * 60 + em;
  if (endMin < startMin) endMin += 24 * 60; // Handle overnight

  return (endMin - startMin) / 60;
}

// Show green grade badge if < 0.5hr procrastination
function showGrade(wasteHours) {
  const summarySection = document.querySelector('.summary-section');
  const existingBadge = document.querySelector('.grade-badge');
  if (existingBadge) existingBadge.remove();

  if (wasteHours <= 0.5) {
    const badge = document.createElement('div');
    badge.classList.add('grade-badge');
    badge.innerText = "✅ Excellent! You conquered the day.";
    summarySection.appendChild(badge);
  }
}
// Quotes to conquer procrastination
const quotes = [
    "🚀 Start now. Sometimes 'later' becomes 'never'.",
    "🔥 Discipline is choosing what you want most over what you want now.",
    "💡 Small steps every day lead to big results.",
    "🏁 Done is better than perfect. Keep moving!",
    "🧠 Action is the antidote to procrastination.",
    "🎯 Focus on progress, not perfection.",
    "⏳ If not now, when? Your time is now.",
    "💪 Push through. You’re stronger than your excuses.",
    "🕒 You don’t need more time. You need to decide.",
    "📈 Your future is created by what you do today."
  ];
  
  // Show random quote in summary
  function showQuote() {
    const quoteArea = document.getElementById('quoteArea');
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    quoteArea.innerText = randomQuote;
  }
  
  // Call quote generator when summary button is clicked
  document.getElementById('generateSummary').addEventListener('click', () => {
    showQuote();
  });
  
