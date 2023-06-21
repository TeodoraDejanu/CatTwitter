fetch("/data")
  .then(function (response) {
    return response.json();
  })
  .then(function (tweets) {
    let placeholder = document.querySelector("#data-output");
    let out = "";
    for (let tweet of tweets) {
      out += `
      <div class="card shadow-lg" style="width: 25rem">
        <img
          class="card-img-top"
          src="/images/${tweet.pagePhoto}"
          alt="Card image cap"
        />
        <div class="card-body">
          <h3 class="card-title">${tweet.title}</h3>
          <p class="card-text">${tweet.content}</p>
        </div>
      </div>
      <br />
      `;
    }
    placeholder.innerHTML = out;
  });
