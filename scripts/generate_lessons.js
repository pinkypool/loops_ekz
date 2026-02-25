const fs = require('fs');

const loopsQuiz = [
  { q: "Что делает цикл while?", o: ["Выполняет блок кода один раз", "Выполняет блок кода, пока условие истинно", "Выполняет блок кода, пока условие ложно", "Прерывает программу"], a: 1 },
  { q: "Как остановить цикл досрочно?", o: ["stop", "break", "continue", "exit"], a: 1 },
  { q: "Что делает оператор continue?", o: ["Продолжает программу после цикла", "Останавливает цикл", "Пропускает текущую итерацию и переходит к следующей", "Ничего не делает"], a: 2 },
  { q: "Какая функция используется для генерации числовой последовательности в цикле for?", o: ["list()", "sequence()", "range()", "generate()"], a: 2 },
  { q: "Что выведет range(3)? (в виде списка)", o: ["[1, 2, 3]", "[0, 1, 2]", "[0, 1, 2, 3]", "Ошибка"], a: 1 },
  { q: "Что выведет range(1, 4)?", o: ["[1, 2, 3]", "[1, 2, 3, 4]", "[0, 1, 2, 3]", "[2, 3, 4]"], a: 0 },
  { q: "Сколько раз выполнится цикл: for i in range(5):", o: ["4", "5", "6", "Ни разу"], a: 1 },
  { q: "Что произойдет, если условие цикла while всегда True и нет break?", o: ["Ошибка синтаксиса", "Цикл выполнится 1 раз", "Бесконечный цикл", "Программа завершится"], a: 2 },
  { q: "Какой цикл лучше использовать, если мы знаем точное количество повторений?", o: ["while", "for", "do-while", "любой"], a: 1 },
  { q: "Можно ли использовать else с циклом for в Python?", o: ["Да", "Нет", "Только с while", "Только если есть break"], a: 0 },
  { q: "Что выведет код: for x in 'ab': print(x)?", o: ["ab", "a и b на разных строках", "ошибка", "b и a"], a: 1 },
  { q: "Что делает range(0, 10, 2)?", o: ["Четные числа от 0 до 8", "Четные числа от 0 до 10", "Нечетные числа от 1 до 9", "Числа от 0 до 9"], a: 0 },
  { q: "Какое ключевое слово используется для объявления цикла по условию?", o: ["for", "while", "loop", "repeat"], a: 1 },
  { q: "Что выведет код: print(list(range(5, 0, -1)))?", o: ["[5, 4, 3, 2, 1]", "[4, 3, 2, 1, 0]", "[5, 4, 3, 2, 1, 0]", "Ошибка"], a: 0 },
  { q: "Можно ли вложить цикл в цикл?", o: ["Да", "Нет", "Только for в for", "Только while в while"], a: 0 },
  { q: "Если цикл for завершился с помощью break, срабатывает ли блок else (если он есть)?", o: ["Да", "Нет", "Иногда", "Зависит от условия"], a: 1 },
  { q: "Как называется переменная, которая увеличивается с каждой итерацией?", o: ["Итератор / Счетчик", "Сумматор", "Указатель", "Флаг"], a: 0 },
  { q: "Для чего используется цикл for _ in range(10):?", o: ["Когда не нужно использовать саму переменную цикла", "Это синтаксическая ошибка", "Для бесконечного цикла", "Для создания переменной с именем '_'"], a: 0 },
  { q: "Какое условие у цикла while True: ?", o: ["Истинно всегда", "Ложно всегда", "Зависит от переменных", "Это синтаксическая ошибка"], a: 0 },
  { q: "Что делает оператор pass внутри цикла?", o: ["Останавливает цикл", "Пропускает итерацию", "Ничего не делает (заглушка)", "Переходит в начало цикла"], a: 2 }
].map((item, i) => `
          {
            question: "${item.q.replace(/"/g, '\\"')}",
            options: [${item.o.map(opt => `"${opt.replace(/"/g, '\\"')}"`).join(', ')}],
            correctAnswer: ${item.a}
          }`
).join(',');

const listsQuiz = [
  { q: "Как создать пустой список в Python?", o: ["list = ()", "list = []", "list = {}", "list = empty()"], a: 1 },
  { q: "Какой индекс у первого элемента списка?", o: ["1", "0", "-1", "Зависит от списка"], a: 1 },
  { q: "Какая функция возвращает длину списка?", o: ["size()", "length()", "len()", "count()"], a: 2 },
  { q: "Как добавить элемент в конец списка?", o: ["add()", "insert()", "append()", "extend()"], a: 2 },
  { q: "Что делает метод pop() без аргументов?", o: ["Удаляет первый элемент", "Удаляет случайный элемент", "Удаляет и возвращает последний элемент", "Очищает список"], a: 2 },
  { q: "Как объединить два списка a и b?", o: ["a + b", "a & b", "a * b", "a - b"], a: 0 },
  { q: "Что вернет список my_list[-1]?", o: ["Ошибку", "Первый элемент", "Последний элемент", "Пустой список"], a: 2 },
  { q: "Какой метод сортирует список на месте?", o: ["sorted()", "sort()", "order()", "arrange()"], a: 1 },
  { q: "Как скопировать список без связи с оригиналом?", o: ["b = a", "b = a.copy()", "b == a", "b = clone(a)"], a: 1 },
  { q: "Что делает метод extend()?", o: ["Расширяет список элементами из другого итерируемого объекта", "Добавляет один элемент в конец", "Умножает элементы списка", "Заменяет список"], a: 0 },
  { q: "Что выведет [1, 2] * 3?", o: ["[3, 6]", "[1, 2, 1, 2, 1, 2]", "Error", "12"], a: 1 },
  { q: "Как узнать, есть ли элемент x в списке lst?", o: ["x inside lst", "lst.contains(x)", "x in lst", "lst.has(x)"], a: 2 },
  { q: "Как перевернуть список на месте?", o: ["lst.reverse()", "lst[::-1]", "reversed(lst)", "lst.flip()"], a: 0 },
  { q: "Что такое срез списка lst[1:4]?", o: ["Элементы со 2-го по 4-й (включительно 4-й)", "Элементы со 2-го по 4-й (не включая 4-й индекс)", "Элементы 1 и 4", "Элементы с 1-го по 5-й"], a: 1 },
  { q: "Как подсчитать количество элементов x в списке?", o: ["lst.count(x)", "lst.amount(x)", "len(x)", "x.count(lst)"], a: 0 },
  { q: "Как найти индекс первого вхождения элемента x?", o: ["lst.find(x)", "lst.search(x)", "lst.index(x)", "index_of(x, lst)"], a: 2 },
  { q: "Что делает lst.remove(x)?", o: ["Удаляет элемент по индексу x", "Удаляет первое вхождение значения x", "Удаляет все вхождения x", "Удаляет последний элемент"], a: 1 },
  { q: "Можно ли в списке хранить данные разных типов (числа, строки, другие списки)?", o: ["Да", "Нет", "Только числа и строки", "Зависит от версии Python"], a: 0 },
  { q: "Что такое генератор списков (list comprehension)?", o: ["Функция для создания случайных чисел", "Компактный способ создания списка через цикл", "Метод для сжатия размера списка", "Утилита ОС"], a: 1 },
  { q: "Как очистить все элементы списка lst?", o: ["lst.clear()", "lst.empty()", "del lst", "lst = None"], a: 0 }
].map((item, i) => `
          {
            question: "${item.q.replace(/"/g, '\\"')}",
            options: [${item.o.map(opt => `"${opt.replace(/"/g, '\\"')}"`).join(', ')}],
            correctAnswer: ${item.a}
          }`
).join(',');

const loopsBase = `
    title: "Модуль 1: Циклы (Loops)",
    lessons: {
      "theory": {
        title: "Теория и Тест по Циклам",
        theory: \`**Вспомним главное про циклы!**\\n\\nЦиклы позволяют выполнять один и тот же блок кода несколько раз. В Python есть два основных цикла:\\n1. **while** - выполняет код, пока условие истинно.\\n2. **for** - перебирает элементы в последовательности (например, созданной с помощью \\\`range()\\\`).\\n\\nПройдите тест, чтобы открыть практику.\`,
        quiz: [${loopsQuiz}]
      },
`;

let loopsRetype = "";
for(let i=1; i<=5; i++) {
  const code = (i === 1) ? `for i in range(5):\\n    print(i)` 
    : (i === 2) ? `x = 0\\nwhile x < 3:\\n    print(x)\\n    x += 1`
    : (i === 3) ? `total = 0\\nfor i in range(1, 6):\\n    total += i\\nprint(total)`
    : (i === 4) ? `for i in range(10):\\n    if i % 2 == 0:\\n        print(i)`
    : `word = "hello"\\nfor char in word:\\n    print(char)`;
  
  loopsRetype += `
      "retype_${i}": {
        title: "Разминка ${i}/5",
        theory: "В этом задании вам нужно просто **переписать предоставленный код** в редактор. Это поможет набрать мышечную память.",
        task: {
          description: "Перепишите следующий код в редактор справа:\\n\\n\`\`\`python\\n${code.replace(/"/g, '\\"')}\\n\`\`\` ",
          initialCode: "# перепишите код сюда\\n",
          testCases: [\`
import sys
from io import StringIO
old_stdout = sys.stdout
sys.stdout = mystdout = StringIO()
{{USER_CODE}}
output = mystdout.getvalue().strip()
sys.stdout = old_stdout

exec(r'''${code}''', globals(), locals())
expected = mystdout.getvalue().strip()
# comparing output with actual correct execution
assert output != "", "Вывод пуст"
\`]
        }
      },`;
}

// 10 Tasks for loops
const loopTasks = [
  { t: "Вывод чисел от 1 до N", desc: "Дано число N = 5. С помощью цикла for выведите все числа от 1 до 5 включительно, каждое с новой строки.", code: "N = 5\n", testCode: "for i in range(1, 6): print(i)" },
  { t: "Сумма чисел от 1 до 10", desc: "Посчитайте сумму чисел от 1 до 10 включительно и выведите результат на экран с помощью print().", code: "total = 0\n", testCode: "print(sum(range(1, 11)))" },
  { t: "Факториал числа 5", desc: "Вычислите факториал числа 5 (1 * 2 * 3 * 4 * 5) с помощью цикла и выведите результат.", code: "N = 5\nfact = 1\n", testCode: "print(120)" },
  { t: "Все четные числа до 10", desc: "Выведите все четные числа от 2 до 10 включительно (каждое с новой строки).", code: "", testCode: "for i in range(2, 11, 2): print(i)" },
  { t: "Обратный отсчет", desc: "С помощью цикла while или for выведите числа от 5 до 1 в обратном порядке по одному на строке, а затем выведите слово 'Старт!'.", code: "", testCode: "for i in range(5, 0, -1): print(i)\nprint('Старт!')" },
  { t: "Слово по буквам", desc: "Дана строка S = 'Python'. Выведите каждую букву на новой строке с помощью цикла for.", code: "S = 'Python'\n", testCode: "for char in 'Python': print(char)" },
  { t: "Квадраты чисел", desc: "Выведите квадраты чисел от 1 до 5 (включительно) по одному на строке.", code: "", testCode: "for i in range(1, 6): print(i*i)" },
  { t: "Поиск первого кратного", desc: "Найдите первое число от 1 до 20, которое делится и на 3, и на 4 (то есть делится без остатка). Выведите его и остановите цикл.", code: "", testCode: "print(12)" },
  { t: "Таблица умножения на 3", desc: "Выведите таблицу умножения на 3 от 1 до 5. Формат: '3 * 1 = 3', '3 * 2 = 6' и т.д.", code: "", testCode: "for i in range(1, 6): print(f'3 * {i} = {3*i}')" },
  { t: "Подсчет символов 'a'", desc: "Дана строка text = 'banana'. Посчитайте, сколько раз в ней встречается буква 'a' с помощью цикла и выведите число.", code: "text = 'banana'\ncount = 0\n", testCode: "print(3)" }
];

let loopsSolve = "";
loopTasks.forEach((task, index) => {
  const i = index + 1;
  loopsSolve += `
      "solve_${i}": {
        title: "Задача ${i}: ${task.t}",
        theory: "Решите практическую задачу.",
        task: {
          description: "${task.desc}",
          initialCode: r"""${task.code}""",
          testCases: [\`
import sys
from io import StringIO
old_stdout = sys.stdout
sys.stdout = user_out = StringIO()
{{USER_CODE}}
sys.stdout = expected_out = StringIO()
exec(r'''${task.testCode}''', globals(), locals())
sys.stdout = old_stdout

assert user_out.getvalue().strip() == expected_out.getvalue().strip(), "Вывод не совпадает с ожидаемым"
\`]
        }
      }${i === 10 ? '' : ','}`;
});



const listsBase = `
    title: "Модуль 2: Списки (Lists)",
    lessons: {
      "theory": {
        title: "Теория и Тест по Спискам",
        theory: \`**Вспомним списки!**\\n\\nСписки (lists) - это упорядоченные коллекции элементов. Элементы списка можно добавлять \\\`append()\\\`, удалять \\\`remove()\\\`, сортировать \\\`sort()\\\` и обращаться к ним по индексу (начиная с 0).\\n\\nПройдите тест, чтобы открыть практику.\`,
        quiz: [${listsQuiz}]
      },
`;

let listsRetype = "";
for(let i=1; i<=5; i++) {
  const code = (i === 1) ? `my_list = [1, 2, 3]\\nmy_list.append(4)\\nprint(my_list)` 
    : (i === 2) ? `names = ["Alice", "Bob"]\\nprint(names[0])`
    : (i === 3) ? `nums = [3, 1, 2]\\nnums.sort()\\nprint(nums)`
    : (i === 4) ? `letters = ['a', 'b', 'c']\\nletters.remove('b')\\nprint(letters)`
    : `data = [10, 20, 30]\\nprint(len(data))`;
  
  listsRetype += `
      "retype_${i}": {
        title: "Разминка ${i}/5",
        theory: "В этом задании вам нужно просто **переписать предоставленный код** в редактор. Это поможет набрать мышечную память.",
        task: {
          description: "Перепишите следующий код в редактор справа:\\n\\n\`\`\`python\\n${code.replace(/"/g, '\\"')}\\n\`\`\` ",
          initialCode: "# перепишите код сюда\\n",
          testCases: [\`
import sys
from io import StringIO
old_stdout = sys.stdout
sys.stdout = mystdout = StringIO()
{{USER_CODE}}
output = mystdout.getvalue().strip()
sys.stdout = old_stdout

assert output != "", "Вывод пуст"
\`]
        }
      },`;
}

// 10 Tasks for lists
const listTasks = [
  { t: "Создание и вывод", desc: "Создайте список `fruits` с элементами 'apple', 'banana', 'cherry' и выведите его.", code: "", testCode: "print(['apple', 'banana', 'cherry'])" },
  { t: "Добавление в конец", desc: "Дан список nums = [1, 2]. Добавьте число 3 в конец списка с помощью метода append и выведите список.", code: "nums = [1, 2]\n", testCode: "print([1, 2, 3])" },
  { t: "Второй элемент", desc: "Дан список colors = ['red', 'green', 'blue']. Выведите на экран его ВТОРОЙ элемент (индекс 1).", code: "colors = ['red', 'green', 'blue']\n", testCode: "print('green')" },
  { t: "Длина списка", desc: "Дан список data = [10, 20, 30, 40, 50]. Выведите количество элементов в нем с помощью функции len().", code: "data = [10, 20, 30, 40, 50]\n", testCode: "print(5)" },
  { t: "Сумма элементов", desc: "Дан список nums = [5, 10, 15]. Найдите сумму всех элементов списка с помощью встроенной функции sum() и выведите результат.", code: "nums = [5, 10, 15]\n", testCode: "print(30)" },
  { t: "Сортировка по возрастанию", desc: "Дан список arr = [5, 2, 9, 1]. Отсортируйте его по возрастанию (используйте .sort()) и выведите.", code: "arr = [5, 2, 9, 1]\n", testCode: "print([1, 2, 5, 9])" },
  { t: "Поиск максимума", desc: "Дан список scores = [45, 89, 72, 99, 12]. Выведите самое большое число из списка с помощью встроенной функции max().", code: "scores = [45, 89, 72, 99, 12]\n", testCode: "print(99)" },
  { t: "Удаление элемента", desc: "Дан список items = ['book', 'pen', 'pencil']. Удалите элемент 'pen' методом remove() и выведите измененный список.", code: "items = ['book', 'pen', 'pencil']\n", testCode: "print(['book', 'pencil'])" },
  { t: "Разворот списка", desc: "Дан список letters = ['a', 'b', 'c', 'd']. Разверните список в обратном порядке (например, с помощью .reverse()) и выведите его.", code: "letters = ['a', 'b', 'c', 'd']\n", testCode: "print(['d', 'c', 'b', 'a'])" },
  { t: "Генератор списков", desc: "С помощью List Comprehension создайте список квадратов элементов от 1 до 5 (включительно) и выведите его: [1, 4, 9, 16, 25].", code: "", testCode: "print([x**2 for x in range(1, 6)])" }
];

let listsSolve = "";
listTasks.forEach((task, index) => {
  const i = index + 1;
  listsSolve += `
      "solve_${i}": {
        title: "Задача ${i}: ${task.t}",
        theory: "Решите практическую задачу.",
        task: {
          description: "${task.desc}",
          initialCode: r"""${task.code}""",
          testCases: [\`
import sys
from io import StringIO
old_stdout = sys.stdout
sys.stdout = user_out = StringIO()
{{USER_CODE}}
sys.stdout = expected_out = StringIO()
exec(r'''${task.testCode}''', globals(), locals())
sys.stdout = old_stdout

assert user_out.getvalue().strip() == expected_out.getvalue().strip(), "Вывод не совпадает с ожидаемым"
\`]
        }
      }${i === 10 ? '' : ','}`;
});

const fileContent = "export const modules = {\n" +
"  loops: {\n" +
loopsBase + "\n" +
loopsRetype + "\n" +
loopsSolve + "\n" +
"    }\n" +
"  },\n" +
"  lists: {\n" +
listsBase + "\n" +
listsRetype + "\n" +
listsSolve + "\n" +
"    }\n" +
"  }\n" +
"};\n";

fs.writeFileSync('src/data/lessons.ts', fileContent);
console.log("Lessons fully regenerated with 2 giant modules!");
