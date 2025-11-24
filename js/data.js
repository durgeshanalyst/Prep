const TEST_DATA = {
    // TRACK 1: PRE-CAREER (45 Mins Total)
    aptitude: {
        totalTime: 45 * 60, // 45 mins in seconds
        sections: [
            {
                type: 'mcq',
                title: 'Logical Reasoning & Math',
                questions: [
                    { id: 1, q: "If a train travels 60km/h...", options: ["10km", "20km", "30km"], correct: 1 },
                    { id: 2, q: "Select the odd one out:", options: ["Java", "Python", "HTML", "C++"], correct: 2 },
                    { id: 3, q: "Binary for 5 is:", options: ["101", "110", "111"], correct: 0 }
                ]
            }
        ]
    },

    // TRACK 2: MOCK INTERVIEW (4 Rounds x 15 Mins)
    mock: {
        totalTime: 60 * 60, // 60 mins total
        rounds: [
            {
                id: 'sql',
                title: 'Round 1: SQL Proficiency',
                duration: 15 * 60,
                type: 'code',
                lang: 'sql',
                prompt: "Write a query to fetch the top 3 highest paid employees from the 'salary' table.",
                starterCode: "SELECT * FROM employees;"
            },
            {
                id: 'python',
                title: 'Round 2: Python Data Manipulation',
                duration: 15 * 60,
                type: 'code',
                lang: 'python',
                prompt: "Given a list of numbers, write a function to return only the even numbers.",
                starterCode: "def filter_even(numbers):\n    # Write code here\n    pass"
            },
            {
                id: 'powerbi',
                title: 'Round 3: PowerBI Concepts',
                duration: 15 * 60,
                type: 'mcq',
                questions: [
                    { id: 1, q: "Which DAX function calculates distinct count?", options: ["COUNT", "DISTINCTCOUNT", "SUM"], correct: 1 }
                ]
            },
            {
                id: 'oral',
                title: 'Round 4: Oral / Behavioral',
                duration: 15 * 60,
                type: 'oral',
                prompt: "Explain a time you had to clean a messy dataset. What steps did you take?"
            }
        ]
    }
};