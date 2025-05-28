const baseURL = window.location.href.split("?")[0].split("#")[0];

fetch(chrome.runtime.getURL("data/steam-ratings.json"))
  .then(response => response.json())
  .then(ratingData => {
    const data = ratingData[baseURL];

    if (data) {
      const interval = setInterval(() => {
        const target = document.querySelector("#responsive_apppage_details_right_ctn");
        if (target && !document.querySelector(".button-container")) {
          clearInterval(interval);

          const buttonContainer = document.createElement("div");
          buttonContainer.className = "button-container";
          buttonContainer.innerHTML = `
            <button class="golden-button" onclick="window.open('${data.link}', '_blank')">
              <div class="content-wrapper">
                <img src="${chrome.runtime.getURL('icons/logo.png')}" alt="Logo" width="64" height="64">
                <div class="text-container">
                  <span class="rating">
                    <span class="score">${data.rating}</span><span class="divider">/</span><span class="out-of">10</span>
                  </span>
                  <span class="comment">${data.comment}</span>
                </div>
              </div>
            </button>
          `;
          target.prepend(buttonContainer);
        }
      }, 500);
    }
  });
