import fs from 'fs';

const fileContent = fs.readFileSync('src/data/lessons.ts', 'utf-8');

// We need to inject a `quiz: [...]` array into each lesson object.
// We can use a regex to find task: { ... } and add quiz after it.

const getQuestions = (topic, index) => {
  const quiz = [];
  for (let i = 1; i <= 20; i++) {
    quiz.push(`
          {
            question: "Вопрос ${i} по теме: ${topic}",
            options: ["Вариант A", "Вариант B", "Вариант C", "Вариант D"],
            correctAnswer: 0
          }`);
  }
  return `quiz: [\n${quiz.join(',\n')}\n        ]`;
};

// Simplified Regex replacement for the demonstration
let newContent = fileContent;

const lessonRegex = /title:\s*"([^"]+)",[\s\S]*?hints:\s*\[[^\]]*\]\s*\}/g;

newContent = newContent.replace(lessonRegex, (match, title) => {
    return match + `,\n        ` + getQuestions(title);
});

fs.writeFileSync('src/data/lessons.ts', newContent);
console.log("Добавлено по 20 вопросов в каждый урок!");
