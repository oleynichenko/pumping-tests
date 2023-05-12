const mockQuestions = [
  {
    "_id": {"$oid": "5b029d222c37336c294f5da5"},
    "correctOptions": ["a", "b", "c", "d", "e", "f", "g"],
    "id": 8,
    "optionCost": {
      "wrong": 0,
      "right": 0.1715
    },
    "options": {
      "a": "Создавать с помощью литерала функции",
      "b": "Присваивать переменным",
      "c": "Присваивать элементам массивов",
      "d": "Присваивать свойствам других объектов",
      "e": "Передавать в качестве аргументов другим функциям",
      "f": "Возвращать в качестве значений из других функций",
      "g": "Наделять свойствами"
    },
    "pointsAvailable": 1.2,
    "themes": ["js", "js-functions"],
    "wording": "Функции в JS можно:"
  },
  {
    "_id": {"$oid": "5b029d222c37336c294f5daa"},
    "correctOptions": ["a"],
    "id": 13,
    "optionCost": {
      "wrong": 0.4,
      "right": 0.8
    },
    "options": {
      "a": "объявления функции (Function Declaration)",
      "b": "функционального выражения (Function Expression)",
      "c": "стрелочной функции"
    },
    "pointsAvailable": 0.8,
    "themes": ["js", "js-functions"],
    "wording": "Имя функции должно быть обязательно указано при ее определении с помощью"
  },
  {
    "_id": {"$oid": "5b029d222c37336c294f5db4"},
    "correctOptions": ["a", "b", "c"],
    "id": 23,
    "optionCost": {
      "wrong": 1,
      "right": 0.3334
    },
    "options": {
      "a": "Представляет контекст функции",
      "b": "Представляет объект для которого вызывается функция",
      "c": "<code>This</code> — это неявный (не указанный в сигнатуре функции) параметр",
      "d": "Все утверждения неверные"
    },
    "pointsAvailable": 1,
    "themes": ["js", "js-functions"],
    "wording": "Выберите верные утверждения о параметре <code>this</code> для функции в JS."
  },
  {
    "_id": {"$oid": "5b44c99f76f3dca3e86664f6"},
    "correctOptions": ["a"],
    "id": 9,
    "optionCost": {
      "wrong": 0.8,
      "right": 0.8
    },
    "options": {
      "a": "Да",
      "b": "Нет"
    },
    "pointsAvailable": 0.8,
    "themes": ["js", "js-functions"],
    "wording": "Возможно ли в JS определять одну функцию в теле другой?"
  },
  {
    "_id": {"$oid": "5b029d222c37336c294f5da4"},
    "correctOptions": ["a"],
    "id": 7,
    "optionCost": {
      "wrong": 0.4,
      "right": 0.8
    },
    "options": {
      "a": "Да",
      "b": "Нет",
      "c": "Да, но кроме функций-генераторов"
    },
    "pointsAvailable": 0.8,
    "themes": ["js", "js-functions"],
    "wording": "Верно ли, что функции в JS обладают всеми свойствами объектов?"
  },
  {
    "_id": {"$oid": "5b029d222c37336c294f5dab"},
    "correctOptions": ["a", "c"],
    "id": 14,
    "optionCost": {
      "wrong": 0.3,
      "right": 0.6
    },
    "options": {
      "a": "<code>function myFunc() {}();</code>",
      "b": "<code>(function myFunc() {})();</code>",
      "c": "<code>function() {}();</code>",
      "d": "<code>(function() {}());</code>",
      "f": "<code>(function() {})();</code>",
      "g": "<code>+function() {}();</code>"
    },
    "pointsAvailable": 1.2,
    "themes": ["js", "js-functions"],
    "wording": "В каких случаях будет сгенерировано исключение?"
  },
];

export default mockQuestions;