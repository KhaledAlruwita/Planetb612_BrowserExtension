const baseURL = location.href.split("?")[0].split("#")[0];

fetch(chrome.runtime.getURL("data/mal-ratings.json"))
  .then(response => response.json())
  .then(ratingData => {
    const data = ratingData[baseURL];

    if (data) {
      const interval = setInterval(() => {
        const ref = document.querySelector("#profileRows");
        if (ref && !document.querySelector(".button-container")) {
          clearInterval(interval);

          const container = document.createElement("div");
          container.className = "button-container";
          container.style.marginTop = "15px";

          container.innerHTML = `
            <button class="golden-button mal-button" onclick="window.open('${data.link}', '_blank')">
              <div class="content-wrapper">
                <img src="${chrome.runtime.getURL('icons/logo.png')}" width="48" height="48">
                <div class="text-container">
                  <span class="rating">
                    <span class="score">${data.rating}</span><span class="divider">/</span><span class="out-of">10</span>
                  </span>
                  <span class="comment">${data.comment}</span>
                </div>
              </div>
            </button>
          `;
          ref.parentNode.insertBefore(container, ref);
        }
      }, 500);
    }
  });
