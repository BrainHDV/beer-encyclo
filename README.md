# Beer-encyclo

Небольшой **SPA** проект, который представляет собой **Энциклопедию** про различные сорта пива.

## Принцип работы приложения:

1. Создаем объект **SPAState** (отображается в консоли браузера), который будет использоваться как состояние приложения.

```javascript
let SPAState = {};
```

2. Вешаем слушатель события **hashchange** на страницу

```javascript
window.addEventListener("hashchange", switchToStateFromURLHash);
```

3. С помощью функции _switchToStateFromURLHash()_ получаем значение хэша\закладки (всё после знака - #, в адресной строке). Обрабатываем как нам нужно.

```javascript
let URLHash = window.location.hash;
```

4. Далее по коду наш объект **SPAState** может содержать в себе как название страницы, так и **id** нужной нам статьи. Например:

```javascript
SPAState = { pagename: "article", articleid: "brown-ale" };
```

5. Используя конструкцию **switch-case** наблюдаем за состоянием **SPAState** и в зависимости от нужной страницы подтягиваем данные из сервера.

```javascript
switch (SPAState.pagename) {
  case "main":
    // code
    break;
  case "content":
    // code
    break;
  case "article":
    // code
    break;
}
```

![beer-encyclo](beer-encyclo.gif)

[Click to show](https://brainhdv.github.io/beer-encyclo)
