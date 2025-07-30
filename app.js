class HabitTracker {
    constructor() {
        this.habits = [];
        this.init();
    }

    init() {
        this.loadHabits();
        this.setupEventListeners();
        this.renderHabits();
    }

    setupEventListeners() {
        // Add habit button
        document.getElementById('addHabitBtn').addEventListener('click', () => {
            this.showModal();
        });

        // Modal events
        document.getElementById('addHabitForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.addHabit();
        });

        document.getElementById('cancelBtn').addEventListener('click', () => {
            this.hideModal();
        });

        // Close modal when clicking outside
        document.getElementById('addHabitModal').addEventListener('click', (e) => {
            if (e.target.id === 'addHabitModal') {
                this.hideModal();
            }
        });

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.hideModal();
            }
        });
    }

    showModal() {
        document.getElementById('addHabitModal').classList.add('show');
        document.getElementById('habitName').focus();
    }

    hideModal() {
        document.getElementById('addHabitModal').classList.remove('show');
        document.getElementById('addHabitForm').reset();
    }

    addHabit() {
        const name = document.getElementById('habitName').value.trim();
        const description = document.getElementById('habitDescription').value.trim();
        const frequency = document.getElementById('habitFrequency').value;

        if (!name) return;

        const habit = {
            id: Date.now().toString(),
            name,
            description,
            frequency,
            createdAt: new Date().toISOString(),
            completedDates: [],
            streak: 0,
            longestStreak: 0
        };

        this.habits.push(habit);
        this.saveHabits();
        this.renderHabits();
        this.hideModal();

        // Show success message
        this.showNotification('Habit added successfully!');
    }

    deleteHabit(habitId) {
        if (confirm('Are you sure you want to delete this habit?')) {
            this.habits = this.habits.filter(habit => habit.id !== habitId);
            this.saveHabits();
            this.renderHabits();
            this.showNotification('Habit deleted successfully!');
        }
    }

    toggleHabitCompletion(habitId) {
        const habit = this.habits.find(h => h.id === habitId);
        if (!habit) return;

        const today = new Date().toDateString();
        const isCompletedToday = habit.completedDates.includes(today);

        if (isCompletedToday) {
            // Remove today's completion
            habit.completedDates = habit.completedDates.filter(date => date !== today);
        } else {
            // Add today's completion
            habit.completedDates.push(today);
        }

        this.updateStreak(habit);
        this.saveHabits();
        this.renderHabits();

        const message = isCompletedToday ? 'Habit unchecked!' : 'Great job! Keep it up!';
        this.showNotification(message);
    }

    updateStreak(habit) {
        const today = new Date();
        const sortedDates = habit.completedDates
            .map(date => new Date(date))
            .sort((a, b) => b - a);

        let currentStreak = 0;
        let longestStreak = habit.longestStreak;

        // Calculate current streak
        for (let i = 0; i < sortedDates.length; i++) {
            const currentDate = new Date(sortedDates[i]);
            const nextDate = i < sortedDates.length - 1 ? new Date(sortedDates[i + 1]) : null;

            if (i === 0) {
                // Check if the most recent date is today or yesterday
                const daysDiff = Math.floor((today - currentDate) / (1000 * 60 * 60 * 24));
                if (daysDiff <= 1) {
                    currentStreak = 1;
                }
            } else if (nextDate) {
                const daysDiff = Math.floor((currentDate - nextDate) / (1000 * 60 * 60 * 24));
                if (daysDiff === 1) {
                    currentStreak++;
                } else {
                    break;
                }
            }
        }

        // Calculate longest streak
        let tempStreak = 0;
        for (let i = 0; i < sortedDates.length - 1; i++) {
            const currentDate = new Date(sortedDates[i]);
            const nextDate = new Date(sortedDates[i + 1]);
            const daysDiff = Math.floor((currentDate - nextDate) / (1000 * 60 * 60 * 24));

            if (daysDiff === 1) {
                tempStreak++;
            } else {
                longestStreak = Math.max(longestStreak, tempStreak + 1);
                tempStreak = 0;
            }
        }
        longestStreak = Math.max(longestStreak, tempStreak + 1);

        habit.streak = currentStreak;
        habit.longestStreak = longestStreak;
    }

    getProgressForPeriod(habit, period = 'week') {
        const today = new Date();
        const startDate = new Date();

        switch (period) {
            case 'week':
                startDate.setDate(today.getDate() - 7);
                break;
            case 'month':
                startDate.setMonth(today.getMonth() - 1);
                break;
            default:
                startDate.setDate(today.getDate() - 7);
        }

        const completedInPeriod = habit.completedDates.filter(date => {
            const habitDate = new Date(date);
            return habitDate >= startDate && habitDate <= today;
        });

        const daysInPeriod = Math.ceil((today - startDate) / (1000 * 60 * 60 * 24));
        return {
            completed: completedInPeriod.length,
            total: daysInPeriod,
            percentage: Math.round((completedInPeriod.length / daysInPeriod) * 100)
        };
    }

    renderHabits() {
        const container = document.getElementById('habitsContainer');

        if (this.habits.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <h3>No habits yet</h3>
                    <p>Start building better habits by adding your first one!</p>
                </div>
            `;
            return;
        }

        container.innerHTML = this.habits.map(habit => {
            const progress = this.getProgressForPeriod(habit);
            const isCompletedToday = habit.completedDates.includes(new Date().toDateString());
            
            return `
                <div class="habit-card" data-habit-id="${habit.id}">
                    <div class="habit-header">
                        <div class="habit-info">
                            <h3>${this.escapeHtml(habit.name)}</h3>
                            ${habit.description ? `<div class="habit-description">${this.escapeHtml(habit.description)}</div>` : ''}
                        </div>
                        <span class="habit-frequency">${habit.frequency}</span>
                    </div>
                    
                    <div class="habit-progress">
                        <div class="progress-bar">
                            <div class="progress-fill" style="width: ${progress.percentage}%"></div>
                        </div>
                        <div class="progress-text">
                            <span>${progress.completed}/${progress.total} days</span>
                            <span>${progress.percentage}%</span>
                        </div>
                    </div>
                    
                    <div class="habit-stats">
                        <small>Current streak: ${habit.streak} days | Longest: ${habit.longestStreak} days</small>
                    </div>
                    
                    <div class="habit-actions">
                        <button class="btn ${isCompletedToday ? 'btn-secondary' : 'btn-success'}" 
                                onclick="habitTracker.toggleHabitCompletion('${habit.id}')">
                            ${isCompletedToday ? '✓ Completed' : 'Mark Complete'}
                        </button>
                        <button class="btn btn-danger" onclick="habitTracker.deleteHabit('${habit.id}')">
                            Delete
                        </button>
                    </div>
                </div>
            `;
        }).join('');
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    saveHabits() {
        localStorage.setItem('habits', JSON.stringify(this.habits));
    }

    loadHabits() {
        const saved = localStorage.getItem('habits');
        if (saved) {
            this.habits = JSON.parse(saved);
            // Update streaks for all habits
            this.habits.forEach(habit => this.updateStreak(habit));
        }
    }

    showNotification(message) {
        // Create notification element
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #10b981;
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            z-index: 10000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            max-width: 300px;
        `;
        notification.textContent = message;

        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }
}

// Initialize the app
let habitTracker;

document.addEventListener('DOMContentLoaded', () => {
    habitTracker = new HabitTracker();
});

// PWA installation prompt
let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    
    // Show install button if not already installed
    if (!window.matchMedia('(display-mode: standalone)').matches) {
        // You can add an install button here if needed
        console.log('PWA install prompt available');
    }
});

// Handle PWA installation
window.addEventListener('appinstalled', () => {
    console.log('PWA was installed');
    deferredPrompt = null;
}); 