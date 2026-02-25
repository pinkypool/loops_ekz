export const modules = {
  loops: {

    title: "Модуль 1: Циклы (Loops)",
    lessons: {
      "theory": {
        title: "Теория и Тест по Циклам",
        theory: `**Вспомним главное про циклы!**\n\nЦиклы позволяют выполнять один и тот же блок кода несколько раз. В Python есть два основных цикла:\n1. **while** - выполняет код, пока условие истинно.\n2. **for** - перебирает элементы в последовательности (например, созданной с помощью \`range()\`).\n\nПройдите тест, чтобы открыть практику.`,
        quiz: [
          {
            question: "Что делает цикл while?",
            options: ["Выполняет блок кода один раз", "Выполняет блок кода, пока условие истинно", "Выполняет блок кода, пока условие ложно", "Прерывает программу"],
            correctAnswer: 1
          },
          {
            question: "Как остановить цикл досрочно?",
            options: ["stop", "break", "continue", "exit"],
            correctAnswer: 1
          },
          {
            question: "Что делает оператор continue?",
            options: ["Продолжает программу после цикла", "Останавливает цикл", "Пропускает текущую итерацию и переходит к следующей", "Ничего не делает"],
            correctAnswer: 2
          },
          {
            question: "Какая функция используется для генерации числовой последовательности в цикле for?",
            options: ["list()", "sequence()", "range()", "generate()"],
            correctAnswer: 2
          },
          {
            question: "Что выведет range(3)? (в виде списка)",
            options: ["[1, 2, 3]", "[0, 1, 2]", "[0, 1, 2, 3]", "Ошибка"],
            correctAnswer: 1
          },
          {
            question: "Что выведет range(1, 4)?",
            options: ["[1, 2, 3]", "[1, 2, 3, 4]", "[0, 1, 2, 3]", "[2, 3, 4]"],
            correctAnswer: 0
          },
          {
            question: "Сколько раз выполнится цикл: for i in range(5):",
            options: ["4", "5", "6", "Ни разу"],
            correctAnswer: 1
          },
          {
            question: "Что произойдет, если условие цикла while всегда True и нет break?",
            options: ["Ошибка синтаксиса", "Цикл выполнится 1 раз", "Бесконечный цикл", "Программа завершится"],
            correctAnswer: 2
          },
          {
            question: "Какой цикл лучше использовать, если мы знаем точное количество повторений?",
            options: ["while", "for", "do-while", "любой"],
            correctAnswer: 1
          },
          {
            question: "Можно ли использовать else с циклом for в Python?",
            options: ["Да", "Нет", "Только с while", "Только если есть break"],
            correctAnswer: 0
          },
          {
            question: "Что выведет код: for x in 'ab': print(x)?",
            options: ["ab", "a и b на разных строках", "ошибка", "b и a"],
            correctAnswer: 1
          },
          {
            question: "Что делает range(0, 10, 2)?",
            options: ["Четные числа от 0 до 8", "Четные числа от 0 до 10", "Нечетные числа от 1 до 9", "Числа от 0 до 9"],
            correctAnswer: 0
          },
          {
            question: "Какое ключевое слово используется для объявления цикла по условию?",
            options: ["for", "while", "loop", "repeat"],
            correctAnswer: 1
          },
          {
            question: "Что выведет код: print(list(range(5, 0, -1)))?",
            options: ["[5, 4, 3, 2, 1]", "[4, 3, 2, 1, 0]", "[5, 4, 3, 2, 1, 0]", "Ошибка"],
            correctAnswer: 0
          },
          {
            question: "Можно ли вложить цикл в цикл?",
            options: ["Да", "Нет", "Только for в for", "Только while в while"],
            correctAnswer: 0
          },
          {
            question: "Если цикл for завершился с помощью break, срабатывает ли блок else (если он есть)?",
            options: ["Да", "Нет", "Иногда", "Зависит от условия"],
            correctAnswer: 1
          },
          {
            question: "Как называется переменная, которая увеличивается с каждой итерацией?",
            options: ["Итератор / Счетчик", "Сумматор", "Указатель", "Флаг"],
            correctAnswer: 0
          },
          {
            question: "Для чего используется цикл for _ in range(10):?",
            options: ["Когда не нужно использовать саму переменную цикла", "Это синтаксическая ошибка", "Для бесконечного цикла", "Для создания переменной с именем '_'"],
            correctAnswer: 0
          },
          {
            question: "Какое условие у цикла while True: ?",
            options: ["Истинно всегда", "Ложно всегда", "Зависит от переменных", "Это синтаксическая ошибка"],
            correctAnswer: 0
          },
          {
            question: "Что делает оператор pass внутри цикла?",
            options: ["Останавливает цикл", "Пропускает итерацию", "Ничего не делает (заглушка)", "Переходит в начало цикла"],
            correctAnswer: 2
          }]
      },


      "retype_1": {
        title: "Разминка 1/5",
        theory: "В этом задании вам нужно просто **переписать предоставленный код** в редактор. Это поможет набрать мышечную память.",
        task: {
          description: "Перепишите следующий код в редактор справа:\n\n```python\nfor i in range(5):\n    print(i)\n``` ",
          initialCode: "# перепишите код сюда\n",
          testCases: [`
import sys
from io import StringIO
old_stdout = sys.stdout
sys.stdout = mystdout = StringIO()
{{USER_CODE}}
output = mystdout.getvalue().strip()
sys.stdout = old_stdout

exec(r'''for i in range(5):\n    print(i)''', globals(), locals())
expected = mystdout.getvalue().strip()
# comparing output with actual correct execution
assert output != "", "Вывод пуст"
`]
        }
      },
      "retype_2": {
        title: "Разминка 2/5",
        theory: "В этом задании вам нужно просто **переписать предоставленный код** в редактор. Это поможет набрать мышечную память.",
        task: {
          description: "Перепишите следующий код в редактор справа:\n\n```python\nx = 0\nwhile x < 3:\n    print(x)\n    x += 1\n``` ",
          initialCode: "# перепишите код сюда\n",
          testCases: [`
import sys
from io import StringIO
old_stdout = sys.stdout
sys.stdout = mystdout = StringIO()
{{USER_CODE}}
output = mystdout.getvalue().strip()
sys.stdout = old_stdout

exec(r'''x = 0\nwhile x < 3:\n    print(x)\n    x += 1''', globals(), locals())
expected = mystdout.getvalue().strip()
# comparing output with actual correct execution
assert output != "", "Вывод пуст"
`]
        }
      },
      "retype_3": {
        title: "Разминка 3/5",
        theory: "В этом задании вам нужно просто **переписать предоставленный код** в редактор. Это поможет набрать мышечную память.",
        task: {
          description: "Перепишите следующий код в редактор справа:\n\n```python\ntotal = 0\nfor i in range(1, 6):\n    total += i\nprint(total)\n``` ",
          initialCode: "# перепишите код сюда\n",
          testCases: [`
import sys
from io import StringIO
old_stdout = sys.stdout
sys.stdout = mystdout = StringIO()
{{USER_CODE}}
output = mystdout.getvalue().strip()
sys.stdout = old_stdout

exec(r'''total = 0\nfor i in range(1, 6):\n    total += i\nprint(total)''', globals(), locals())
expected = mystdout.getvalue().strip()
# comparing output with actual correct execution
assert output != "", "Вывод пуст"
`]
        }
      },
      "retype_4": {
        title: "Разминка 4/5",
        theory: "В этом задании вам нужно просто **переписать предоставленный код** в редактор. Это поможет набрать мышечную память.",
        task: {
          description: "Перепишите следующий код в редактор справа:\n\n```python\nfor i in range(10):\n    if i % 2 == 0:\n        print(i)\n``` ",
          initialCode: "# перепишите код сюда\n",
          testCases: [`
import sys
from io import StringIO
old_stdout = sys.stdout
sys.stdout = mystdout = StringIO()
{{USER_CODE}}
output = mystdout.getvalue().strip()
sys.stdout = old_stdout

exec(r'''for i in range(10):\n    if i % 2 == 0:\n        print(i)''', globals(), locals())
expected = mystdout.getvalue().strip()
# comparing output with actual correct execution
assert output != "", "Вывод пуст"
`]
        }
      },
      "retype_5": {
        title: "Разминка 5/5",
        theory: "В этом задании вам нужно просто **переписать предоставленный код** в редактор. Это поможет набрать мышечную память.",
        task: {
          description: "Перепишите следующий код в редактор справа:\n\n```python\nword = \"hello\"\nfor char in word:\n    print(char)\n``` ",
          initialCode: "# перепишите код сюда\n",
          testCases: [`
import sys
from io import StringIO
old_stdout = sys.stdout
sys.stdout = mystdout = StringIO()
{{USER_CODE}}
output = mystdout.getvalue().strip()
sys.stdout = old_stdout

exec(r'''word = "hello"\nfor char in word:\n    print(char)''', globals(), locals())
expected = mystdout.getvalue().strip()
# comparing output with actual correct execution
assert output != "", "Вывод пуст"
`]
        }
      },

      "solve_1": {
        title: "Задача 1: Вывод чисел от 1 до N",
        theory: "Решите практическую задачу.",
        task: {
          description: "Дано число N = 5. С помощью цикла for выведите все числа от 1 до 5 включительно, каждое с новой строки.",
          initialCode: `N = 5
`,
          testCases: [`
import sys
from io import StringIO
old_stdout = sys.stdout
sys.stdout = user_out = StringIO()
{{USER_CODE}}
sys.stdout = expected_out = StringIO()
exec(r'''for i in range(1, 6): print(i)''', globals(), locals())
sys.stdout = old_stdout

assert user_out.getvalue().strip() == expected_out.getvalue().strip(), "Вывод не совпадает с ожидаемым"
`]
        }
      },
      "solve_2": {
        title: "Задача 2: Сумма чисел от 1 до 10",
        theory: "Решите практическую задачу.",
        task: {
          description: "Посчитайте сумму чисел от 1 до 10 включительно и выведите результат на экран с помощью print().",
          initialCode: `total = 0
`,
          testCases: [`
import sys
from io import StringIO
old_stdout = sys.stdout
sys.stdout = user_out = StringIO()
{{USER_CODE}}
sys.stdout = expected_out = StringIO()
exec(r'''print(sum(range(1, 11)))''', globals(), locals())
sys.stdout = old_stdout

assert user_out.getvalue().strip() == expected_out.getvalue().strip(), "Вывод не совпадает с ожидаемым"
`]
        }
      },
      "solve_3": {
        title: "Задача 3: Факториал числа 5",
        theory: "Решите практическую задачу.",
        task: {
          description: "Вычислите факториал числа 5 (1 * 2 * 3 * 4 * 5) с помощью цикла и выведите результат.",
          initialCode: `N = 5
fact = 1
`,
          testCases: [`
import sys
from io import StringIO
old_stdout = sys.stdout
sys.stdout = user_out = StringIO()
{{USER_CODE}}
sys.stdout = expected_out = StringIO()
exec(r'''print(120)''', globals(), locals())
sys.stdout = old_stdout

assert user_out.getvalue().strip() == expected_out.getvalue().strip(), "Вывод не совпадает с ожидаемым"
`]
        }
      },
      "solve_4": {
        title: "Задача 4: Все четные числа до 10",
        theory: "Решите практическую задачу.",
        task: {
          description: "Выведите все четные числа от 2 до 10 включительно (каждое с новой строки).",
          initialCode: ``,
          testCases: [`
import sys
from io import StringIO
old_stdout = sys.stdout
sys.stdout = user_out = StringIO()
{{USER_CODE}}
sys.stdout = expected_out = StringIO()
exec(r'''for i in range(2, 11, 2): print(i)''', globals(), locals())
sys.stdout = old_stdout

assert user_out.getvalue().strip() == expected_out.getvalue().strip(), "Вывод не совпадает с ожидаемым"
`]
        }
      },
      "solve_5": {
        title: "Задача 5: Обратный отсчет",
        theory: "Решите практическую задачу.",
        task: {
          description: "С помощью цикла while или for выведите числа от 5 до 1 в обратном порядке по одному на строке, а затем выведите слово 'Старт!'.",
          initialCode: ``,
          testCases: [`
import sys
from io import StringIO
old_stdout = sys.stdout
sys.stdout = user_out = StringIO()
{{USER_CODE}}
sys.stdout = expected_out = StringIO()
exec(r'''for i in range(5, 0, -1): print(i)
print('Старт!')''', globals(), locals())
sys.stdout = old_stdout

assert user_out.getvalue().strip() == expected_out.getvalue().strip(), "Вывод не совпадает с ожидаемым"
`]
        }
      },
      "solve_6": {
        title: "Задача 6: Слово по буквам",
        theory: "Решите практическую задачу.",
        task: {
          description: "Дана строка S = 'Python'. Выведите каждую букву на новой строке с помощью цикла for.",
          initialCode: `S = 'Python'
`,
          testCases: [`
import sys
from io import StringIO
old_stdout = sys.stdout
sys.stdout = user_out = StringIO()
{{USER_CODE}}
sys.stdout = expected_out = StringIO()
exec(r'''for char in 'Python': print(char)''', globals(), locals())
sys.stdout = old_stdout

assert user_out.getvalue().strip() == expected_out.getvalue().strip(), "Вывод не совпадает с ожидаемым"
`]
        }
      },
      "solve_7": {
        title: "Задача 7: Квадраты чисел",
        theory: "Решите практическую задачу.",
        task: {
          description: "Выведите квадраты чисел от 1 до 5 (включительно) по одному на строке.",
          initialCode: ``,
          testCases: [`
import sys
from io import StringIO
old_stdout = sys.stdout
sys.stdout = user_out = StringIO()
{{USER_CODE}}
sys.stdout = expected_out = StringIO()
exec(r'''for i in range(1, 6): print(i*i)''', globals(), locals())
sys.stdout = old_stdout

assert user_out.getvalue().strip() == expected_out.getvalue().strip(), "Вывод не совпадает с ожидаемым"
`]
        }
      },
      "solve_8": {
        title: "Задача 8: Поиск первого кратного",
        theory: "Решите практическую задачу.",
        task: {
          description: "Найдите первое число от 1 до 20, которое делится и на 3, и на 4 (то есть делится без остатка). Выведите его и остановите цикл.",
          initialCode: ``,
          testCases: [`
import sys
from io import StringIO
old_stdout = sys.stdout
sys.stdout = user_out = StringIO()
{{USER_CODE}}
sys.stdout = expected_out = StringIO()
exec(r'''print(12)''', globals(), locals())
sys.stdout = old_stdout

assert user_out.getvalue().strip() == expected_out.getvalue().strip(), "Вывод не совпадает с ожидаемым"
`]
        }
      },
      "solve_9": {
        title: "Задача 9: Таблица умножения на 3",
        theory: "Решите практическую задачу.",
        task: {
          description: "Выведите таблицу умножения на 3 от 1 до 5. Формат: '3 * 1 = 3', '3 * 2 = 6' и т.д.",
          initialCode: ``,
          testCases: [`
import sys
from io import StringIO
old_stdout = sys.stdout
sys.stdout = user_out = StringIO()
{{USER_CODE}}
sys.stdout = expected_out = StringIO()
exec(r'''for i in range(1, 6): print(f'3 * {i} = {3*i}')''', globals(), locals())
sys.stdout = old_stdout

assert user_out.getvalue().strip() == expected_out.getvalue().strip(), "Вывод не совпадает с ожидаемым"
`]
        }
      },
      "solve_10": {
        title: "Задача 10: Подсчет символов 'a'",
        theory: "Решите практическую задачу.",
        task: {
          description: "Дана строка text = 'banana'. Посчитайте, сколько раз в ней встречается буква 'a' с помощью цикла и выведите число.",
          initialCode: `text = 'banana'
count = 0
`,
          testCases: [`
import sys
from io import StringIO
old_stdout = sys.stdout
sys.stdout = user_out = StringIO()
{{USER_CODE}}
sys.stdout = expected_out = StringIO()
exec(r'''print(3)''', globals(), locals())
sys.stdout = old_stdout

assert user_out.getvalue().strip() == expected_out.getvalue().strip(), "Вывод не совпадает с ожидаемым"
`]
        }
      }
    }
  },
  lists: {

    title: "Модуль 2: Списки (Lists)",
    lessons: {
      "theory": {
        title: "Теория и Тест по Спискам",
        theory: `**Вспомним списки!**\n\nСписки (lists) - это упорядоченные коллекции элементов. Элементы списка можно добавлять \`append()\`, удалять \`remove()\`, сортировать \`sort()\` и обращаться к ним по индексу (начиная с 0).\n\nПройдите тест, чтобы открыть практику.`,
        quiz: [
          {
            question: "Как создать пустой список в Python?",
            options: ["list = ()", "list = []", "list = {}", "list = empty()"],
            correctAnswer: 1
          },
          {
            question: "Какой индекс у первого элемента списка?",
            options: ["1", "0", "-1", "Зависит от списка"],
            correctAnswer: 1
          },
          {
            question: "Какая функция возвращает длину списка?",
            options: ["size()", "length()", "len()", "count()"],
            correctAnswer: 2
          },
          {
            question: "Как добавить элемент в конец списка?",
            options: ["add()", "insert()", "append()", "extend()"],
            correctAnswer: 2
          },
          {
            question: "Что делает метод pop() без аргументов?",
            options: ["Удаляет первый элемент", "Удаляет случайный элемент", "Удаляет и возвращает последний элемент", "Очищает список"],
            correctAnswer: 2
          },
          {
            question: "Как объединить два списка a и b?",
            options: ["a + b", "a & b", "a * b", "a - b"],
            correctAnswer: 0
          },
          {
            question: "Что вернет список my_list[-1]?",
            options: ["Ошибку", "Первый элемент", "Последний элемент", "Пустой список"],
            correctAnswer: 2
          },
          {
            question: "Какой метод сортирует список на месте?",
            options: ["sorted()", "sort()", "order()", "arrange()"],
            correctAnswer: 1
          },
          {
            question: "Как скопировать список без связи с оригиналом?",
            options: ["b = a", "b = a.copy()", "b == a", "b = clone(a)"],
            correctAnswer: 1
          },
          {
            question: "Что делает метод extend()?",
            options: ["Расширяет список элементами из другого итерируемого объекта", "Добавляет один элемент в конец", "Умножает элементы списка", "Заменяет список"],
            correctAnswer: 0
          },
          {
            question: "Что выведет [1, 2] * 3?",
            options: ["[3, 6]", "[1, 2, 1, 2, 1, 2]", "Error", "12"],
            correctAnswer: 1
          },
          {
            question: "Как узнать, есть ли элемент x в списке lst?",
            options: ["x inside lst", "lst.contains(x)", "x in lst", "lst.has(x)"],
            correctAnswer: 2
          },
          {
            question: "Как перевернуть список на месте?",
            options: ["lst.reverse()", "lst[::-1]", "reversed(lst)", "lst.flip()"],
            correctAnswer: 0
          },
          {
            question: "Что такое срез списка lst[1:4]?",
            options: ["Элементы со 2-го по 4-й (включительно 4-й)", "Элементы со 2-го по 4-й (не включая 4-й индекс)", "Элементы 1 и 4", "Элементы с 1-го по 5-й"],
            correctAnswer: 1
          },
          {
            question: "Как подсчитать количество элементов x в списке?",
            options: ["lst.count(x)", "lst.amount(x)", "len(x)", "x.count(lst)"],
            correctAnswer: 0
          },
          {
            question: "Как найти индекс первого вхождения элемента x?",
            options: ["lst.find(x)", "lst.search(x)", "lst.index(x)", "index_of(x, lst)"],
            correctAnswer: 2
          },
          {
            question: "Что делает lst.remove(x)?",
            options: ["Удаляет элемент по индексу x", "Удаляет первое вхождение значения x", "Удаляет все вхождения x", "Удаляет последний элемент"],
            correctAnswer: 1
          },
          {
            question: "Можно ли в списке хранить данные разных типов (числа, строки, другие списки)?",
            options: ["Да", "Нет", "Только числа и строки", "Зависит от версии Python"],
            correctAnswer: 0
          },
          {
            question: "Что такое генератор списков (list comprehension)?",
            options: ["Функция для создания случайных чисел", "Компактный способ создания списка через цикл", "Метод для сжатия размера списка", "Утилита ОС"],
            correctAnswer: 1
          },
          {
            question: "Как очистить все элементы списка lst?",
            options: ["lst.clear()", "lst.empty()", "del lst", "lst = None"],
            correctAnswer: 0
          }]
      },


      "retype_1": {
        title: "Разминка 1/5",
        theory: "В этом задании вам нужно просто **переписать предоставленный код** в редактор. Это поможет набрать мышечную память.",
        task: {
          description: "Перепишите следующий код в редактор справа:\n\n```python\nmy_list = [1, 2, 3]\nmy_list.append(4)\nprint(my_list)\n``` ",
          initialCode: "# перепишите код сюда\n",
          testCases: [`
import sys
from io import StringIO
old_stdout = sys.stdout
sys.stdout = mystdout = StringIO()
{{USER_CODE}}
output = mystdout.getvalue().strip()
sys.stdout = old_stdout

assert output != "", "Вывод пуст"
`]
        }
      },
      "retype_2": {
        title: "Разминка 2/5",
        theory: "В этом задании вам нужно просто **переписать предоставленный код** в редактор. Это поможет набрать мышечную память.",
        task: {
          description: "Перепишите следующий код в редактор справа:\n\n```python\nnames = [\"Alice\", \"Bob\"]\nprint(names[0])\n``` ",
          initialCode: "# перепишите код сюда\n",
          testCases: [`
import sys
from io import StringIO
old_stdout = sys.stdout
sys.stdout = mystdout = StringIO()
{{USER_CODE}}
output = mystdout.getvalue().strip()
sys.stdout = old_stdout

assert output != "", "Вывод пуст"
`]
        }
      },
      "retype_3": {
        title: "Разминка 3/5",
        theory: "В этом задании вам нужно просто **переписать предоставленный код** в редактор. Это поможет набрать мышечную память.",
        task: {
          description: "Перепишите следующий код в редактор справа:\n\n```python\nnums = [3, 1, 2]\nnums.sort()\nprint(nums)\n``` ",
          initialCode: "# перепишите код сюда\n",
          testCases: [`
import sys
from io import StringIO
old_stdout = sys.stdout
sys.stdout = mystdout = StringIO()
{{USER_CODE}}
output = mystdout.getvalue().strip()
sys.stdout = old_stdout

assert output != "", "Вывод пуст"
`]
        }
      },
      "retype_4": {
        title: "Разминка 4/5",
        theory: "В этом задании вам нужно просто **переписать предоставленный код** в редактор. Это поможет набрать мышечную память.",
        task: {
          description: "Перепишите следующий код в редактор справа:\n\n```python\nletters = ['a', 'b', 'c']\nletters.remove('b')\nprint(letters)\n``` ",
          initialCode: "# перепишите код сюда\n",
          testCases: [`
import sys
from io import StringIO
old_stdout = sys.stdout
sys.stdout = mystdout = StringIO()
{{USER_CODE}}
output = mystdout.getvalue().strip()
sys.stdout = old_stdout

assert output != "", "Вывод пуст"
`]
        }
      },
      "retype_5": {
        title: "Разминка 5/5",
        theory: "В этом задании вам нужно просто **переписать предоставленный код** в редактор. Это поможет набрать мышечную память.",
        task: {
          description: "Перепишите следующий код в редактор справа:\n\n```python\ndata = [10, 20, 30]\nprint(len(data))\n``` ",
          initialCode: "# перепишите код сюда\n",
          testCases: [`
import sys
from io import StringIO
old_stdout = sys.stdout
sys.stdout = mystdout = StringIO()
{{USER_CODE}}
output = mystdout.getvalue().strip()
sys.stdout = old_stdout

assert output != "", "Вывод пуст"
`]
        }
      },

      "solve_1": {
        title: "Задача 1: Создание и вывод",
        theory: "Решите практическую задачу.",
        task: {
          description: "Создайте список `fruits` с элементами 'apple', 'banana', 'cherry' и выведите его.",
          initialCode: ``,
          testCases: [`
import sys
from io import StringIO
old_stdout = sys.stdout
sys.stdout = user_out = StringIO()
{{USER_CODE}}
sys.stdout = expected_out = StringIO()
exec(r'''print(['apple', 'banana', 'cherry'])''', globals(), locals())
sys.stdout = old_stdout

assert user_out.getvalue().strip() == expected_out.getvalue().strip(), "Вывод не совпадает с ожидаемым"
`]
        }
      },
      "solve_2": {
        title: "Задача 2: Добавление в конец",
        theory: "Решите практическую задачу.",
        task: {
          description: "Дан список nums = [1, 2]. Добавьте число 3 в конец списка с помощью метода append и выведите список.",
          initialCode: `nums = [1, 2]
`,
          testCases: [`
import sys
from io import StringIO
old_stdout = sys.stdout
sys.stdout = user_out = StringIO()
{{USER_CODE}}
sys.stdout = expected_out = StringIO()
exec(r'''print([1, 2, 3])''', globals(), locals())
sys.stdout = old_stdout

assert user_out.getvalue().strip() == expected_out.getvalue().strip(), "Вывод не совпадает с ожидаемым"
`]
        }
      },
      "solve_3": {
        title: "Задача 3: Второй элемент",
        theory: "Решите практическую задачу.",
        task: {
          description: "Дан список colors = ['red', 'green', 'blue']. Выведите на экран его ВТОРОЙ элемент (индекс 1).",
          initialCode: `colors = ['red', 'green', 'blue']
`,
          testCases: [`
import sys
from io import StringIO
old_stdout = sys.stdout
sys.stdout = user_out = StringIO()
{{USER_CODE}}
sys.stdout = expected_out = StringIO()
exec(r'''print('green')''', globals(), locals())
sys.stdout = old_stdout

assert user_out.getvalue().strip() == expected_out.getvalue().strip(), "Вывод не совпадает с ожидаемым"
`]
        }
      },
      "solve_4": {
        title: "Задача 4: Длина списка",
        theory: "Решите практическую задачу.",
        task: {
          description: "Дан список data = [10, 20, 30, 40, 50]. Выведите количество элементов в нем с помощью функции len().",
          initialCode: `data = [10, 20, 30, 40, 50]
`,
          testCases: [`
import sys
from io import StringIO
old_stdout = sys.stdout
sys.stdout = user_out = StringIO()
{{USER_CODE}}
sys.stdout = expected_out = StringIO()
exec(r'''print(5)''', globals(), locals())
sys.stdout = old_stdout

assert user_out.getvalue().strip() == expected_out.getvalue().strip(), "Вывод не совпадает с ожидаемым"
`]
        }
      },
      "solve_5": {
        title: "Задача 5: Сумма элементов",
        theory: "Решите практическую задачу.",
        task: {
          description: "Дан список nums = [5, 10, 15]. Найдите сумму всех элементов списка с помощью встроенной функции sum() и выведите результат.",
          initialCode: `nums = [5, 10, 15]
`,
          testCases: [`
import sys
from io import StringIO
old_stdout = sys.stdout
sys.stdout = user_out = StringIO()
{{USER_CODE}}
sys.stdout = expected_out = StringIO()
exec(r'''print(30)''', globals(), locals())
sys.stdout = old_stdout

assert user_out.getvalue().strip() == expected_out.getvalue().strip(), "Вывод не совпадает с ожидаемым"
`]
        }
      },
      "solve_6": {
        title: "Задача 6: Сортировка по возрастанию",
        theory: "Решите практическую задачу.",
        task: {
          description: "Дан список arr = [5, 2, 9, 1]. Отсортируйте его по возрастанию (используйте .sort()) и выведите.",
          initialCode: `arr = [5, 2, 9, 1]
`,
          testCases: [`
import sys
from io import StringIO
old_stdout = sys.stdout
sys.stdout = user_out = StringIO()
{{USER_CODE}}
sys.stdout = expected_out = StringIO()
exec(r'''print([1, 2, 5, 9])''', globals(), locals())
sys.stdout = old_stdout

assert user_out.getvalue().strip() == expected_out.getvalue().strip(), "Вывод не совпадает с ожидаемым"
`]
        }
      },
      "solve_7": {
        title: "Задача 7: Поиск максимума",
        theory: "Решите практическую задачу.",
        task: {
          description: "Дан список scores = [45, 89, 72, 99, 12]. Выведите самое большое число из списка с помощью встроенной функции max().",
          initialCode: `scores = [45, 89, 72, 99, 12]
`,
          testCases: [`
import sys
from io import StringIO
old_stdout = sys.stdout
sys.stdout = user_out = StringIO()
{{USER_CODE}}
sys.stdout = expected_out = StringIO()
exec(r'''print(99)''', globals(), locals())
sys.stdout = old_stdout

assert user_out.getvalue().strip() == expected_out.getvalue().strip(), "Вывод не совпадает с ожидаемым"
`]
        }
      },
      "solve_8": {
        title: "Задача 8: Удаление элемента",
        theory: "Решите практическую задачу.",
        task: {
          description: "Дан список items = ['book', 'pen', 'pencil']. Удалите элемент 'pen' методом remove() и выведите измененный список.",
          initialCode: `items = ['book', 'pen', 'pencil']
`,
          testCases: [`
import sys
from io import StringIO
old_stdout = sys.stdout
sys.stdout = user_out = StringIO()
{{USER_CODE}}
sys.stdout = expected_out = StringIO()
exec(r'''print(['book', 'pencil'])''', globals(), locals())
sys.stdout = old_stdout

assert user_out.getvalue().strip() == expected_out.getvalue().strip(), "Вывод не совпадает с ожидаемым"
`]
        }
      },
      "solve_9": {
        title: "Задача 9: Разворот списка",
        theory: "Решите практическую задачу.",
        task: {
          description: "Дан список letters = ['a', 'b', 'c', 'd']. Разверните список в обратном порядке (например, с помощью .reverse()) и выведите его.",
          initialCode: `letters = ['a', 'b', 'c', 'd']
`,
          testCases: [`
import sys
from io import StringIO
old_stdout = sys.stdout
sys.stdout = user_out = StringIO()
{{USER_CODE}}
sys.stdout = expected_out = StringIO()
exec(r'''print(['d', 'c', 'b', 'a'])''', globals(), locals())
sys.stdout = old_stdout

assert user_out.getvalue().strip() == expected_out.getvalue().strip(), "Вывод не совпадает с ожидаемым"
`]
        }
      },
      "solve_10": {
        title: "Задача 10: Генератор списков",
        theory: "Решите практическую задачу.",
        task: {
          description: "С помощью List Comprehension создайте список квадратов элементов от 1 до 5 (включительно) и выведите его: [1, 4, 9, 16, 25].",
          initialCode: ``,
          testCases: [`
import sys
from io import StringIO
old_stdout = sys.stdout
sys.stdout = user_out = StringIO()
{{USER_CODE}}
sys.stdout = expected_out = StringIO()
exec(r'''print([x**2 for x in range(1, 6)])''', globals(), locals())
sys.stdout = old_stdout

assert user_out.getvalue().strip() == expected_out.getvalue().strip(), "Вывод не совпадает с ожидаемым"
`]
        }
      }
    }
  }
};
