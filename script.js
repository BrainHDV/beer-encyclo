window.addEventListener("hashchange", switchToStateFromURLHash);

// Model
let SPAState = {};
const ajaxHandlerScript = "https://fe.it-academy.by/AjaxStringStorage2.php";
const appPage = document.getElementById("page");

function switchToStateFromURLHash() {
  let URLHash = window.location.hash;
  let stateStr = URLHash.slice(1);

  if (stateStr != "") {
    let parts = stateStr.split("_");
    SPAState = { pagename: parts[0] };

    if (SPAState.pagename === "article") {
      SPAState.articleid = parts[1];
    }
  } else {
    SPAState = { pagename: "main" };
  }

  console.log("Состояние приложения " + JSON.stringify(SPAState));

  // View
  let pageHTML = "";
  switch (SPAState.pagename) {
    case "main":
      pageHTML += `
      <div class="main">
        <h1 class="main__title">Энциклопедия пива</h1>
        <p class="main__text">Здесь содержится информация о различных сортах пива.</p>
        <a class="show" href="#content">Показать статьи</a>
      </div>
      `;
      break;
    case "content":
      SPAState.title = "Оглавление";
      pageHTML +=
        '<a class="backwards mb-10" href="#main">Главная страница</a>';
      appPage.style.display = "block";
      getInfoAjax();
      break;
    case "article":
      SPAState.title = "Статьи";
      pageHTML +=
        '<a class="backwards" href="#content">Вернуться к оглавлению</a>';
      appPage.style.display = "flex";
      getArticalInfo();
      getInfoAjax();
      break;
  }

  appPage.innerHTML = pageHTML;

  function getInfoAjax() {
    document.querySelector(".loading").style.display = "block";
    $.ajax(ajaxHandlerScript, {
      type: "POST",
      dataType: "json",
      data: {
        f: "READ",
        n: "RUD_ENCYCLO_INFO",
      },
      success: dataLoaded,
      error: errorHandler,
      complete: complete,
    });
  }

  function dataLoaded(data) {
    const beers = JSON.parse(data.result);
    // сортируем по алфавиту
    let sortedData = beers.sort((a, b) => a.name.localeCompare(b.name));

    const html = `
      <nav>
        <h2 class='content__title'>${SPAState.title}</h2>
        <ul>
          ${sortedData
            .map((el) => `<li><a href="#article_${el.id}">${el.name}</a></li>`)
            .join("")}
        </ul>
      </nav>
    `;

    pageHTML += html;
    appPage.innerHTML = pageHTML;
  }

  // Достаем данные из html
  function getArticalInfo() {
    $.ajax(`./articles/${SPAState.articleid}.html`, {
      type: "GET",
      dataType: "html",
      success: articalDataLoaded,
      error: errorHandler,
    });
  }

  function articalDataLoaded(data) {
    pageHTML += data;
    appPage.innerHTML = pageHTML;
  }
}

switchToStateFromURLHash();

function complete() {
  document.querySelector(".loading").style.display = "none";
}

function errorHandler(jqXHR, statusStr, errorStr) {
  alert(statusStr + " " + errorStr);
}
