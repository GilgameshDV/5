let deferredPrompt;

document.addEventListener('DOMContentLoaded', function() {
  const postForm = document.getElementById('post-form');
  const createPostArea = document.getElementById('create-post');
  const sharedMomentsArea = document.getElementById('shared-moments');

  // Функція для відкриття модального вікна створення посту
  function openCreatePostModal() {
    createPostArea.style.display = "block";
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then(function(choiceResult) {
        console.log(choiceResult.outcome);
        if (choiceResult.outcome === "dismissed") {
          console.log("Користувач скасував установку");
        } else {
          console.log("Користувач встановив PWA");
        }
      });
      deferredPrompt = null;
    }
  }

  // Функція для створення нового посту
  function createPost(title, location) {
    const card = document.createElement('div');
    card.className = 'shared-moment-card mdl-card mdl-shadow--2dp';
    card.innerHTML = `
      <div class="mdl-card__title" style="background-image: url('/src/images/main-image.jpg');">
        <h2 class="mdl-card__title-text">${title}</h2>
      </div>
      <div class="mdl-card__supporting-text">
        ${location}
      </div>
    `;
    sharedMomentsArea.appendChild(card);
  }

  // Обробник події для кнопки "Post"
  postForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const titleInput = document.getElementById('title').value;
    const locationInput = document.getElementById('location').value;
    if (titleInput.trim() && locationInput.trim()) {
      createPost(titleInput, locationInput);
      console.log('Пост створено!');
      createPostArea.style.display = 'none';
      postForm.reset();
    } else {
      console.log('Title and Location are required!');
    }
  });

  // Обробник події для кнопки закриття модального вікна
  document.getElementById('close-create-post-modal-btn').addEventListener('click', function() {
    createPostArea.style.display = 'none';
  });

  // Обробник події для кнопки "share-image-button"
  document.getElementById('share-image-button').addEventListener('click', openCreatePostModal);
});

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("/sw.js").then(function() {
    console.log("Service worker зареєстровано!");
  });
}

window.addEventListener("beforeinstallprompt", function(event) {
  console.log("beforeinstallprompt скасовано");
  event.preventDefault();
  deferredPrompt = event;
  return false;
});


