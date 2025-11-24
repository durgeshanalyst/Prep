const app = {
    currentUser: null,
    currentTrack: null,
    timerInterval: null,
    timeRemaining: 0,
    currentRoundIndex: 0,

    init: function() {
        lucide.createIcons();
        // Event Listeners for Login/Logout are handled in auth.js
    },

    showView: function(viewName) {
        document.querySelectorAll('.view-section').forEach(el => el.classList.add('hidden'));
        document.getElementById(`view-${viewName}`).classList.remove('hidden');
    },

    selectTrack: function(trackType) {
        this.currentTrack = TEST_DATA[trackType];
        this.currentTrackType = trackType; // 'aptitude' or 'mock'
        this.currentRoundIndex = 0;
        this.showView('instructions');
    },

    startTest: function() {
        this.showView('test');
        
        // Setup Logic based on Track Type
        if (this.currentTrackType === 'mock') {
            this.loadRound(0);
        } else {
            // Aptitude is one big block
            this.timeRemaining = this.currentTrack.totalTime;
            this.renderMCQSection(this.currentTrack.sections[0]);
            this.startTimer();
        }
    },

    loadRound: function(index) {
        const round = this.currentTrack.rounds[index];
        this.timeRemaining = round.duration;
        
        document.getElementById('section-title').innerText = round.title;
        document.getElementById('round-badge').innerText = `ROUND ${index + 1}`;

        if (round.type === 'code') {
            this.renderCodeEnvironment(round);
        } else if (round.type === 'mcq') {
            this.renderMCQSection(round);
        } else if (round.type === 'oral') {
            this.renderOralEnvironment(round);
        }

        this.startTimer(() => {
            // Callback when timer ends for this round
            this.nextRound();
        });
    },

    nextRound: function() {
        clearInterval(this.timerInterval);
        this.currentRoundIndex++;
        if (this.currentRoundIndex < this.currentTrack.rounds.length) {
            alert("Time's up! Moving to next round.");
            this.loadRound(this.currentRoundIndex);
        } else {
            this.submitTest();
        }
    },

    renderCodeEnvironment: function(round) {
        const container = document.getElementById('test-container');
        container.innerHTML = `
            <div class="grid md:grid-cols-3 gap-6 h-[70vh]">
                <div class="col-span-1 bg-white p-4 rounded-xl border border-slate-200 overflow-y-auto">
                    <h3 class="font-bold mb-4">Problem Statement</h3>
                    <p class="text-sm text-slate-600">${round.prompt}</p>
                </div>
                <div class="col-span-2 bg-[#0f172a] rounded-xl overflow-hidden flex flex-col border border-slate-700">
                    <div class="bg-slate-800 text-slate-400 px-4 py-2 text-xs font-mono border-b border-slate-700 flex justify-between">
                        <span>main.${round.lang === 'python' ? 'py' : 'sql'}</span>
                        <button class="text-green-400 hover:text-green-300" onclick="app.runCodeMock()">▶ Run Code</button>
                    </div>
                    <textarea class="code-input p-4 flex-grow text-sm text-green-400" spellcheck="false">${round.starterCode}</textarea>
                    <div id="console-output" class="h-32 bg-[#1e293b] border-t border-slate-700 p-4 font-mono text-xs text-slate-400 overflow-y-auto">
                        > Console ready...
                    </div>
                </div>
            </div>
        `;
    },

    renderOralEnvironment: function(round) {
        const container = document.getElementById('test-container');
        container.innerHTML = `
            <div class="max-w-2xl mx-auto text-center mt-10">
                <div class="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
                    <i data-lucide="mic" class="w-10 h-10 text-blue-600"></i>
                </div>
                <h3 class="text-xl font-bold mb-4">${round.prompt}</h3>
                <p class="text-sm text-slate-500 mb-8">Speak clearly. Your answer is being transcribed...</p>
                <textarea placeholder="Type your oral answer transcript here for now..." class="w-full h-40 border p-4 rounded-xl"></textarea>
            </div>
        `;
        lucide.createIcons();
    },

    renderMCQSection: function(section) {
        const container = document.getElementById('test-container');
        let html = `<div class="space-y-6">`;
        section.questions.forEach((q, idx) => {
            html += `
                <div class="bg-white p-6 rounded-xl border border-slate-200">
                    <p class="font-bold text-lg mb-4">${idx + 1}. ${q.q}</p>
                    <div class="space-y-2">
                        ${q.options.map(opt => `
                            <label class="flex items-center gap-3 p-3 border rounded-lg hover:bg-slate-50 cursor-pointer">
                                <input type="radio" name="q${q.id}" class="w-4 h-4 text-blue-600">
                                <span>${opt}</span>
                            </label>
                        `).join('')}
                    </div>
                </div>
            `;
        });
        html += `</div>`;
        container.innerHTML = html;
    },

    startTimer: function(onComplete) {
        clearInterval(this.timerInterval);
        const display = document.getElementById('timer-display');
        
        this.timerInterval = setInterval(() => {
            this.timeRemaining--;
            
            const min = Math.floor(this.timeRemaining / 60);
            const sec = this.timeRemaining % 60;
            display.innerText = `${min}:${sec < 10 ? '0' + sec : sec}`;

            if (this.timeRemaining < 60) {
                display.classList.add('timer-warning');
            }

            if (this.timeRemaining <= 0) {
                clearInterval(this.timerInterval);
                if (onComplete) onComplete();
                else this.submitTest();
            }
        }, 1000);
    },

    runCodeMock: function() {
        const consoleOut = document.getElementById('console-output');
        consoleOut.innerHTML += `<br>> Compiling...<br>> <span class="text-green-400">Success! Output: [Row 1, Row 2, Row 3]</span>`;
        consoleOut.scrollTop = consoleOut.scrollHeight;
    },

    submitTest: function() {
        clearInterval(this.timerInterval);
        alert("Test Submitted! Saving to database...");
        this.showView('dashboard');
    }
};

// Initialize
app.init();