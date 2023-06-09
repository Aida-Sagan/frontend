<h1>Запуск локального сервера</h1>
<h5>При написании данного проекта в одном терминале для запуска TypeScript компилятора в режиме наблюдения (watch mode) прописывалась 
команда <p>tsc -w</p> (он упрощает процесс автоматической компиляции TypeScript кода при каждом изменении, что позволяет вам мгновенно видеть результаты своих изменений
  без необходимости ручного запуска компиляции после каждого изменения.), а в другом терминале команду, выполняемая в терминале для запуска
  скрипта start из файла package.json вашего проекта: <p>npm run start</p></h5>
  
  <h1>Про проект</h1>
 <li> Стек технологий: код написан с использованием JavaScript и использует платформу Express.js для создания веб-приложений. Он также интегрируется
  с MongoDB с помощью библиотеки Mongoose. Вёрстка написана с помощью HTML, CSS, JS.</li>

<li>Настройка сервера: код настраивает приложение Express, импортируя и инициализируя его как app. Он также настраивает промежуточное 
  ПО, такое как cors и body-parser, для обработки запросов между источниками и анализа тел запросов в формате JSON.</li>

<li>Подключение к базе данных: он подключается к базе данных MongoDB с помощью функции подключения от Mongoose. 
URL-адрес подключения указан в константе MONGO, импортированной из файла config.js.</li>

<li>Маршруты: код определяет несколько конечных точек API с использованием различных методов HTTP (GET, POST). 
  Эти конечные точки обрабатывают различные операции, связанные с товарами и комментариями магазина.</li>

<li>Модели данных: код импортирует модели данных (Элементы, Заказ, Комментарии) из отдельных файлов. 
  Эти модели определяют структуру и поведение соответствующих коллекций MongoDB.</li>

<li>Обработка ошибок: код включает логику обработки ошибок в блоках try-catch. Если во время выполнения
  обработчика маршрута возникает ошибка, он регистрирует ошибку и отправляет соответствующий HTTP-ответ с кодом состояния ошибки.</li>

<li>Обработчики маршрутов: каждый обработчик маршрутов представляет собой асинхронную функцию, которая взаимодействует
  с базой данных с помощью методов Mongoose, таких как find, findOne и insertMany. Он извлекает данные из базы данных 
  и отправляет ответ обратно клиенту.</li>

<li>Запуск сервера: код запускает сервер Express, прослушивая указанный порт (константа PORT, импортированная 
  из config.js). Он регистрирует сообщение о том, что сервер работает.</li>
