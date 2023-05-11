const mockTest =   {
  "_id": {"$oid": "5b5ae62ce1d3b90ab865069a"},
  "benefit": "Кроме знаний функций тест показывает и уровень внимательности. В нескольких вопросах есть ошибки в условиях напрямую влияющие на выбор правильного ответа.",
  "canonLink": "js-functions",
  "description": "Оценивает знание функций в JavaScript.     Создан на основе книги \"Секреты JavaScript Ninja\" от создателя JQuery Джона Резига. Состоит из 18 случайных вопросов из 30-ти возможных.",
  "enable": true,
  "id": "2",
  "images": {
    "main": "js-functions-main.jpg",
    "mainTw": "js-functions-main-tw.jpg"
  },
  "introText": "Автор — Александр Куртов, веб разработчик с 10 летним опытом, руководитель агенства TESTO. Прохождение теста является обязательным условием при приеме в отдел разработки компании.",
  "levels": [
    {
      "name": "profi",
      "marked": true,
      "conclusionPhrase": "Профессиональный уровень",
      "score": {
        "min": 90,
        "max": 95
      },
      "feedback": {
        "data": "<p>Отличный результат! Вы безусловно профессионал и до уровня EXPERT остается совсем немного!</p><p>Джон Резиг считает, что мастер JavaScript отличается от середнячка, главным образом, ясным представлением, что JS — это язык функционального программирования. Именно от понимания функций зависит сложность всего кода и поэтому экспертный уровень владения темой, по мнению автора, это минимум 95%.</p>"
      },
      "sharing": {
        "data": {
          "imageName": "js-functions-profi.jpg",
          "imageNameTw": "js-functions-profi-tw.jpg",
          "hashtag": "#js_functions_profi"
        }
      },
      "recommendation": {
        "data": "book"
      }
    },
    {
      "name": "average",
      "marked": false,
      "score": {
        "min": 0,
        "max": 90
      },
      "feedback": {
        "function": "(pass, test) => { \tconst average = test.stat.report.average; \tif (average) { \t\treturn (pass.result.percentScored < average) \t\t? `<p>Cредний результат по тесту ${average}%. Ваш похоже ниже... </p>` \t\t: `<p>Ваш результат выше чем средний по тесту (${average}%), и поэтому код который вы способны написать наверняка не сделает мир хуже.</p><p>Джон Резиг считает, что мастер JavaScript отличается от середнячка, главным образом, ясным представлением, что JS — это язык функционального программирования. Именно от понимания функций зависит сложность всего кода и поэтому профессиональный уровень владения темой, по мнению автора, это минимум 90%.</p>`; \t} else { return `<p>Пока еще это не профессиональный уровень...</p>`; \t} };"
      },
      "sharing": {
        "function": "(pass, test) => { \treturn (pass.result.percentScored > test.stat.report.average) \t? { \t\timageName: `js-functions-average.jpg`, \t\timageNameTw: `js-functions-average-tw.jpg`, \t\thashtag: `js_functions_ninja` \t} \t: {}; };"
      },
      "recommendation": {
        "function": "(pass, test) => { if (pass.result.percentScored < test.stat.report.average) { return `courses`; \t} else { return `book`; } };"
      }
    },
    {
      "name": "expert",
      "marked": true,
      "conclusionPhrase": "Уровень эксперта",
      "score": {
        "min": 95,
        "max": 100
      },
      "feedback": {
        "data": "<p>Блестяще! Вы безусловно мастер в этой теме.</p>"
      },
      "sharing": {
        "data": {
          "imageName": "js-functions-expert.jpg",
          "imageNameTw": "js-functions-expert-tw.jpg",
          "hashtag": "js_functions_expert"
        }
      },
      "recommendation": {
        "data": "email"
      }
    },
    {
      "name": "god",
      "marked": true,
      "conclusionPhrase": "Макcимальный результат",
      "score": {
        "min": 100,
        "max": 101
      },
      "feedback": {
        "data": "<p>Блестяще! Вы безусловно мастер в этой теме.</p>"
      },
      "sharing": {
        "data": {
          "imageName": "js-functions-expert.jpg",
          "imageNameTw": "js-functions-expert-tw.jpg",
          "hashtag": "js_functions_expert"
        }
      },
      "recommendation": {
        "data": "email"
      }
    }
  ],
  "links": [
    {
      "name": "Основная",
      "permalink": "js-functions",
      "interval": null,
      "time": null,
      "enable": true,
      "enabledInfo": true,
      "goInStat": true,
      "questionsQuantity": 18,
      "isDisqus": true
    },
    {
      "name": "Все вопросы",
      "permalink": "js-functions-full",
      "interval": null,
      "time": null,
      "enable": true,
      "enabledInfo": true,
      "goInStat": false
    },
    {
      "name": "Три вопроса",
      "permalink": "js-functions-short",
      "interval": null,
      "time": null,
      "enable": true,
      "enabledInfo": true,
      "goInStat": false,
      "questionsQuantity": 3,
      "isDisqus": true
    }
  ],
  "questions": {
    "themes": ["js-functions"],
    "quantity": 0
  },
  "recommendation": {
    "book": "<p>Лучшим средством для восполнения обнаруженных пробелов в знаниях будет книга \"Секреты Javascript Ninja\". Это так, поскольку все вопросы теста сформулированы из трех ее глав. Глава об определениях функций доступна бесплатно на <a href=\"https://livebook.manning.com/#!/book/secrets-of-the-javascript-ninja-second-edition/chapter-3/1\" target=\"_blank\">livebook.manning.com</a> с великолепным аудиовариантом на английском.</p>    <p>Книга в интернет-магазинах:</p>    <ul>    <li><a href=\"https://www.ozon.ru/context/detail/id/142089820/?partner=JS&from=bar \" target=\"_blank\">Ozon.ru</a></li>    <li><a href=\"http://apyecom.com/click/5b06db0a8b30a89b618b45d5/59990/subaccount/url=https%3A%2F%2Fwww.yakaboo.ua%2Fua%2Fsekrety-javascript-nindzja-1598876.html\" target=\"_blank\">Yakaboo.ua</a></li>    </ul>    <p>Имея бумажный вариант книги можно бесплатно получить электронную версию на <a href=\"https://www.manning.com/books/secrets-of-the-javascript-ninja-second-edition\" target=\"_blank\">manning.com</a> и пользоваться быстрым копипастом примеров кода.</p>    <p>P.S. Обратите внимание, что речь идет о втором издании, которое с синей обложкой. В отличии от первого в нем уже есть ES6.</p>",
    "courses": "<p>Вам стоит подтянуть базу JS не столько по функциям, как в целом по языку. Сделать это быстро и системно с помощью книг, статей или отдельных видео не получиться. Помогут только курсы с проверенной годами программой, личным наставником — действующим программистом и огромным списком заданий с четкими дедлайнами.</p><p>Автору теста известно только две компании с таким подходом — «HTMLAcademy» и «Нетология».</p><p>Оптимальные курсы для тех, кто знаком с базовыми понятиями:</p><ul><li><a href=\"https://htmlacademy.ru/intensive/ecmascript\" target=\"_blank\">Профессиональный JavaScript, уровень 2</a></li><li><a href=\"http://netology.ru/programs/javascript?pid=up6559_kurtal\" target=\"_blank\">Javascript с нуля до промисов</a></li></ul><p>P.S. По промокоду 2605513b75c — скидка 800 руб. на любой курс «HTMLAcademy»</p>",
    "email": "<p>Поделитесь этим результатом! Есть много людей, которым нужны профессионалы  такого уровня и только от новых и нестандартных задач зависит ваш дальнейший рост.</p><p>P.S. Если вы преподаватель и готовы организовать мастер-класс по этой теме — будем рады <a href=\"mailto:kurtal1976@gmail.com.com?subject=По проекту tests.kiev.ua\">сотрудничеству</a>.</p>"
  },
  "stat": {
    "levels": {
      "profi": 90,
      "expert": 95
    },
    "report": {
      "total": 997,
      "profies": 9,
      "experts": 10,
      "best": 100,
      "bestQuantity": 5,
      "average": 49.1
    }
  },
  "title": "Javascript Ninja: функции",
  "updateDate": {"$date": "2018-08-06T13:14:14.535Z"}
};

export default mockTest;