// feedback-widget.js
(function () {
  // create button
  const btn = document.createElement("button");
  btn.className = "feedback-button";
  btn.innerText = "Feedback";
  document.body.appendChild(btn);

  // create popup (hidden initially)
  const popup = document.createElement("div");
  popup.className = "feedback-popup";
  popup.style.display = "none";
  popup.innerHTML = `
    <h3>Send Feedback</h3>
    <input id="fb-name" placeholder="Name (optional)">
    <input id="fb-email" placeholder="Email (optional)">
    <select id="fb-type"><option value="general">General</option><option value="bug">Bug</option><option value="idea">Idea</option></select>
    <div style="margin:6px 0">
      <label class="stars">Rating:</label>
      <select id="fb-rating" style="width:80px; display:inline-block; margin-left:8px;">
        <option value="">—</option><option value="5">5</option><option value="4">4</option><option value="3">3</option><option value="2">2</option><option value="1">1</option>
      </select>
    </div>
    <textarea id="fb-message" placeholder="Tell us what you think..."></textarea>
    <div class="actions">
      <button id="fb-submit" style="background:var(--accent,#e50914);color:#fff;">Submit</button>
      <button id="fb-view" style="background:transparent;color:var(--text,#fff);border:1px solid rgba(255,255,255,0.08)">View All</button>
    </div>
  `;
  document.body.appendChild(popup);

  btn.addEventListener("click", () => {
    popup.style.display = popup.style.display === "none" ? "block" : "none";
  });

  // submit handler
  document.addEventListener("click", function (e) {
    if (e.target && e.target.id === "fb-submit") {
      const name = document.getElementById("fb-name").value.trim();
      const email = document.getElementById("fb-email").value.trim();
      const type = document.getElementById("fb-type").value;
      const rating = document.getElementById("fb-rating").value;
      const message = document.getElementById("fb-message").value.trim();

      if (!message) {
        alert("Please write a short message.");
        return;
      }

      const feedback = {
        id: 'fb_' + Date.now(),
        name: name || null,
        email: email || null,
        type,
        rating: rating || null,
        message,
        url: location.href,
        phone: (JSON.parse(localStorage.getItem("metaflixUser") || "{}")).phone || null,
        createdAt: new Date().toISOString()
      };

      const existing = JSON.parse(localStorage.getItem("feedbacks") || "[]");
      existing.unshift(feedback); // newest first
      localStorage.setItem("feedbacks", JSON.stringify(existing));

      // clear & hide
      document.getElementById("fb-message").value = "";
      document.getElementById("fb-rating").value = "";
      document.getElementById("fb-name").value = "";
      document.getElementById("fb-email").value = "";

      popup.style.display = "none";
      alert("Thanks for your feedback! ❤️");
    }

    if (e.target && e.target.id === "fb-view") {
      window.location.href = "feedback.html";
    }
  });

  // click outside popup closes it
  document.addEventListener("click", (e) => {
    if (!popup.contains(e.target) && e.target !== btn) {
      popup.style.display = "none";
    }
  });
})();

// UNIVERSAL IMAGE CLICK INTERACTION (Works on ALL movie images)
document.addEventListener("click", function (e) {
    const movie = e.target.closest(".img-toggle-wrapper");

    if (movie) {
        const title = movie.getAttribute("data-title") || "Movie Details";
        alert("Opening details for: " + title);
    }
});
