const baseURL = window.location.href.split("?")[0].split("#")[0];

fetch(chrome.runtime.getURL("data/imdb-ratings.json"))
  .then(response => response.json())
  .then(ratingData => {
    const data = ratingData[baseURL];

    if (data) {
      const interval = setInterval(() => {
        const ratingBar = document.querySelector('.sc-3a4309f8-1.dOjKRs');
        if (ratingBar && !document.querySelector(".button-container")) {
          clearInterval(interval);

          const buttonContainer = document.createElement("div");
          buttonContainer.className = "button-container";
          buttonContainer.style.marginTop = "15px";
          buttonContainer.innerHTML = `
            <button class="golden-button imdb-button" onclick="window.open('${data.link}', '_blank')">
              <div class="content-wrapper">
                <img src="${chrome.runtime.getURL('icons/logo.png')}" alt="Logo" width="48" height="48">
                <div class="text-container">
                  <span class="rating">
                    <span class="score">${data.rating}</span><span class="divider">/</span><span class="out-of">10</span>
                  </span>
                  <span class="comment">${data.comment}</span>
                </div>
              </div>
            </button>
          `;
          ratingBar.appendChild(buttonContainer);
        }
      }, 500);
    }
  });
