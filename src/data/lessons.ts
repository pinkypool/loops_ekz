export const modules = {
  loops: {
    title: "Модуль 1: Циклы (Loops)",
    lessons: {
      "1.1": {
        title: "Основы while: Счетчик",
        theory: `
**Краткая справка:**
Цикл \`while\` выполняет код, пока условие истинно (\`True\`).
Обязательно изменяйте переменную условия (например, счетчик), иначе возникнет **бесконечный цикл**.
\`\`\`python
i = 0
while i < 3:
    print(i)
    i += 1 # счетчик
\`\`\`
`,
        task: {
          description: "Напишите программу, которая с помощью цикла `while` выводит числа от 1 до 5 включительно (каждое с новой строки).",
          initialCode: "number = 1\n# ваш код здесь\n\n",
          solutionCode: "number = 1\nwhile number <= 5:\n    print(number)\n    number += 1",
          testCases: [
            `
import sys
from io import StringIO
old_stdout = sys.stdout
sys.stdout = mystdout = StringIO()
{{USER_CODE}}
output = mystdout.getvalue().strip()
sys.stdout = old_stdout

assert output == "1\\n2\\n3\\n4\\n5", "Вывод должен быть: числа от 1 до 5"
`
          ],
          hints: ["Условие должно быть `number <= 5`.", "Не забудьте `number += 1`"]
        }
      },
      "1.2": {
        title: "while: Четные числа",
        theory: `
**Краткая справка:**
Шаг счетчика в цикле может быть любым: \`i += 2\` или \`i -= 1\`.
`,
        task: {
          description: "Используя `while`, выведите все **четные** числа от 10 до 20 включительно.",
          initialCode: "num = 10\n# ваш код здесь\n\n",
          solutionCode: "num = 10\nwhile num <= 20:\n    print(num)\n    num += 2",
          testCases: [
            `
import sys
from io import StringIO
old_stdout = sys.stdout
sys.stdout = mystdout = StringIO()
{{USER_CODE}}
output = mystdout.getvalue().strip()
sys.stdout = old_stdout

assert "10\\n12\\n14\\n16\\n18\\n20" in output, "Вывод должен содержать четные числа 10, 12... 20"
`
          ],
          hints: ["Увеличивайте `num` на 2."]
        }
      },
      "1.3": {
        title: "Основы for и range",
        theory: `
**Краткая справка:**
\`for i in range(N):\` — выполнит код N раз (от 0 до N-1).
\`range(start, stop)\` — от start до stop-1.
`,
        task: {
          description: "Выведите слово 'Python' 3 раза с помощью цикла `for` и функции `range()`.",
          initialCode: "# ваш код здесь\n\n",
          solutionCode: "for i in range(3):\n    print('Python')",
          testCases: [
            `
import sys
from io import StringIO
old_stdout = sys.stdout
sys.stdout = mystdout = StringIO()
{{USER_CODE}}
output = mystdout.getvalue().strip()
sys.stdout = old_stdout

assert output == "Python\\nPython\\nPython", "Должно быть ровно 3 строки 'Python'"
`
          ],
          hints: ["Используйте `for i in range(3):`"]
        }
      },
      "1.4": {
        title: "for: Сумма диапазона",
        theory: `
**Краткая справка:**
Циклы отлично подходят для накопления суммы или произведения. Создайте переменную до цикла (например, \`total = 0\`) и прибавляйте к ней значение внутри цикла.
`,
        task: {
          description: "Дано число N = 10. С помощью `for` найдите сумму всех чисел от 1 до N включительно. Выведите результат.",
          initialCode: "N = 10\ntotal = 0\n# ваш код здесь\n\nprint(total)",
          solutionCode: "N = 10\ntotal = 0\nfor i in range(1, N + 1):\n    total += i\nprint(total)",
          testCases: [
            `
import sys
from io import StringIO
old_stdout = sys.stdout
sys.stdout = mystdout = StringIO()
{{USER_CODE}}
output = mystdout.getvalue().strip()
sys.stdout = old_stdout

assert "55" in output, "Сумма от 1 до 10 должна быть 55"
`
          ],
          hints: ["Используйте `range(1, N + 1)`", "Прибавляйте `total += i`"]
        }
      },
      "1.5": {
        title: "Вложенные циклы",
        theory: `
**Краткая справка:**
Вложенные циклы — цикл внутри цикла. Внутренний цикл полностью выполняется для каждого шага внешнего.
`,
        task: {
          description: "С помощью вложенных циклов `for` выведите квадрат из звездочек (3 строки по 3 звездочки).\n***\n***\n***",
          initialCode: "# ваш код здесь\n\n",
          solutionCode: "for i in range(3):\n    for j in range(3):\n        print('*', end='')\n    print()",
          testCases: [
            `
import sys
from io import StringIO
old_stdout = sys.stdout
sys.stdout = mystdout = StringIO()
{{USER_CODE}}
output = mystdout.getvalue().strip()
sys.stdout = old_stdout

assert output == "*\\*\\*\\n*\\*\\*\\n*\\*\\*", "Квадрат 3x3 из звездочек" # \\ to bypass parser
`
          ],
          hints: ["Используйте `print('*', end='')` во внутреннем цикле и пустой `print()` во внешнем."]
        }
      }
    }
  },
  lists: {
    title: "Модуль 2: Списки (Lists)",
    lessons: {
      "2.1": {
        title: "Создание и индексы",
        theory: `
**Краткая справка:**
Списки создаются так: \`my_list = [1, 2, 3]\`.
Индексы начинаются **с нуля**. Последний элемент можно получить по индексу \`-1\`.
`,
        task: {
          description: "Дан список `nums`. Выведите на экран первый и последний элементы списка (каждый с новой строки).",
          initialCode: "nums = [10, 20, 30, 40, 50]\n# ваш код здесь\n\n",
          solutionCode: "nums = [10, 20, 30, 40, 50]\nprint(nums[0])\nprint(nums[-1])",
          testCases: [
            `
import sys
from io import StringIO
old_stdout = sys.stdout
sys.stdout = mystdout = StringIO()
{{USER_CODE}}
output = mystdout.getvalue().strip()
sys.stdout = old_stdout

assert output == "10\\n50", "Должно быть выведено 10 и 50"
`
          ],
          hints: ["Первый элемент: `nums[0]`. Последний: `nums[-1]`."]
        }
      },
      "2.2": {
        title: "Изменение списка",
        theory: `
**Краткая справка:**
Элементы списка можно изменять напрямую по их индексу: \`list[0] = "new"\`.
`,
        task: {
          description: "Замените значение второго элемента списка (index 1) на строку 'Kiwi'. Выведите весь список.",
          initialCode: "fruits = ['Apple', 'Banana', 'Cherry']\n# ваш код здесь\n\nprint(fruits)",
          solutionCode: "fruits = ['Apple', 'Banana', 'Cherry']\nfruits[1] = 'Kiwi'\nprint(fruits)",
          testCases: [
            `
import sys
from io import StringIO
old_stdout = sys.stdout
sys.stdout = mystdout = StringIO()
{{USER_CODE}}
output = mystdout.getvalue().strip()
sys.stdout = old_stdout

assert "['Apple', 'Kiwi', 'Cherry']" in output, "Ожидается ['Apple', 'Kiwi', 'Cherry']"
`
          ],
          hints: ["Второй элемент имеет индекс 1."]
        }
      },
      "2.3": {
        title: "Метод append",
        theory: `
**Краткая справка:**
Вызов \`list.append(value)\` добавляет элемент в самый **конец** списка.
`,
        task: {
          description: "Начните с пустого списка `items = []`. Добавьте в него числа 3, затем 6, затем 9 с помощью `append`. Выведите список.",
          initialCode: "items = []\n# ваш код здесь\n\nprint(items)",
          solutionCode: "items = []\nitems.append(3)\nitems.append(6)\nitems.append(9)\nprint(items)",
          testCases: [
            `
import sys
from io import StringIO
old_stdout = sys.stdout
sys.stdout = mystdout = StringIO()
{{USER_CODE}}
output = mystdout.getvalue().strip()
sys.stdout = old_stdout

assert "[3, 6, 9]" in output, "Ожидается [3, 6, 9]"
`
          ],
          hints: ["Вызовите `items.append()` 3 раза."]
        }
      },
      "2.4": {
        title: "Удаление (remove, pop)",
        theory: `
**Краткая справка:**
- \`list.remove(value)\` — удаляет первое найденное значение.
- \`list.pop(index)\` — удаляет элемент по индексу (по умолчанию последний).
`,
        task: {
          description: "Из списка удалите слово 'Error' с помощью `remove()`. Затем удалите последний элемент с помощью `pop()`. Выведите результат.",
          initialCode: "data = ['Start', 'Error', 'Mid', 'End']\n# ваш код здесь\n\nprint(data)",
          solutionCode: "data = ['Start', 'Error', 'Mid', 'End']\ndata.remove('Error')\ndata.pop()\nprint(data)",
          testCases: [
            `
import sys
from io import StringIO
old_stdout = sys.stdout
sys.stdout = mystdout = StringIO()
{{USER_CODE}}
output = mystdout.getvalue().strip()
sys.stdout = old_stdout

assert "['Start', 'Mid']" in output, "Ожидается ['Start', 'Mid']"
`
          ],
          hints: ["Сначала вызовите `data.remove('Error')`, затем `data.pop()` без аргументов."]
        }
      },
      "2.5": {
        title: "Итерация по списку",
        theory: `
**Краткая справка:**
Проще всего перебирать список напрямую:
\`\`\`python
for x in my_list:
    print(x)
\`\`\`
`,
        task: {
          description: "Дан список чисел. С помощью цикла `for n in numbers:` удвойте каждое число и выведите его на экран.",
          initialCode: "numbers = [5, 10, 15]\n# ваш код здесь\n",
          solutionCode: "numbers = [5, 10, 15]\nfor n in numbers:\n    print(n * 2)",
          testCases: [
            `
import sys
from io import StringIO
old_stdout = sys.stdout
sys.stdout = mystdout = StringIO()
{{USER_CODE}}
output = mystdout.getvalue().strip()
sys.stdout = old_stdout

assert output == "10\\n20\\n30", "Должно быть выведено 10, 20, 30"
`
          ],
          hints: ["Внутри цикла `for n in numbers:` напишите `print(n * 2)`"]
        }
      },
      "2.6": {
        title: "Фильтрация списка",
        theory: `
**Краткая справка:**
Частая задача: создать новый список из старого только с элементами, подходящими по условию.
`,
        task: {
          description: "Напишите код, который отбирает только **положительные** числа из `source_list` и добавляет их в `positive_list`. Выведите `positive_list`.",
          initialCode: "source_list = [-2, 5, 0, -9, 12, 1]\npositive_list = []\n# ваш код здесь\n\nprint(positive_list)",
          solutionCode: "source_list = [-2, 5, 0, -9, 12, 1]\npositive_list = []\nfor n in source_list:\n    if n > 0:\n        positive_list.append(n)\nprint(positive_list)",
          testCases: [
            `
import sys
from io import StringIO
old_stdout = sys.stdout
sys.stdout = mystdout = StringIO()
{{USER_CODE}}
output = mystdout.getvalue().strip()
sys.stdout = old_stdout

assert "[5, 12, 1]" in output, "Ожидается список [5, 12, 1]"
`
          ],
          hints: ["Внутри цикла `for n in source_list:` нужна проверка `if n > 0:`."]
        }
      }
    }
  }
};

