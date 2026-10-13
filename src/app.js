import { SessionPlan } from './models/SessionPlan.js';
import { SessionRepository } from './repository/SessionRepository.js';

const repo = new SessionRepository();
const form = document.getElementById('session-form');
const badge = document.getElementById('connection-badge');
const feedback = document.getElementById('feedback-panel');

// Monitor network state toggles dynamically (Requirement AR-02)
window.addEventListener('offline', () => {
    badge.textContent = "⚠️ System Status: Offline (Changes Saved Locally)";
    badge.style.backgroundColor = "#D32F2F";
    badge.style.color = "#FFFFFF";
});

window.addEventListener('online', () => {
    badge.textContent = "🌐 System Status: Online (Ready to Sync)";
    badge.style.backgroundColor = "#2E7D32";
    badge.style.color = "#FFFFFF";
});

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const newPlan = new SessionPlan(
        document.getElementById('title').value,
        document.getElementById('topic').value,
        "Primary (Grades 4-6)", 
        "30 minutes",
        document.getElementById('description').value,
        document.getElementById('notes').value
    );

    // Call your architectural component layer to handle persistence
    const result = await repo.synchronizeWithServer(newPlan);

    feedback.classList.remove('hidden');
    if (result.status === 'synchronized') {
        feedback.innerHTML = `<h3>✨ Success!</h3><p>Session plan "${result.data.title}" successfully uploaded to server cloud cache.</p>`;
        feedback.style.borderLeft = "5px solid #2E7D32";
    } else {
        feedback.innerHTML = `<h3>⚠️ Working Offline</h3><p>Plan "${result.data.title}" has been safely locked into local device storage until connection returns.</p>`;
        feedback.style.borderLeft = "5px solid #D32F2F";
    }
});