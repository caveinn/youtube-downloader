const baseURL = 'http://localhost:5000';
const currentURL = window.location.url;

setTimeout(
  function () {
    $('#top-level-buttons').append(
      `
        <div class="__ytd-btn">
          <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="20px" viewBox="0 0 36 36" version="1.1"> 
            <g id="surface1">
              <path style=" stroke:none;fill-rule:nonzero;fill:rgb(56.470588%,56.470588%,56.470588%);fill-opacity:1;" d="M 28.8125 19.582031 L 18 30.394531 L 7.1875 19.582031 L 9.175781 17.59375 L 16.59375 25.011719 L 16.59375 0 L 19.40625 0 L 19.40625 25.011719 L 26.824219 17.59375 Z M 36 33.1875 L 0 33.1875 L 0 36 L 36 36 Z M 36 33.1875 "/> 
            </g> 
          </svg>
          <i class="__ytd-text">DOWNLOAD</i>
        </div>
      `
    );

    $('body').append(
      `
        <div id="__ytd-modal" class="__ytd-modal">
          <div class="__ytd-modal-content">
            <span class="__ytd-modal-close">&times;</span>
            <h3 class="__ytd-modal-header">Download Options</h3>
            <ol class="__ytd-download-list">
              <li>
                Audio - How to be a good person.mp3
              </li>
              <li>
                Video - How to be a good person 360p.mp4
              </li>
              <li>
                Video - How to be a good person 720p.mp4
              </li>
              <li>
                Video - How to be a good person 1080p.mp4
              </li>
            </ol>
          </div>
        </div>
      `
    );

    $('.__ytd-btn').on('click', function () {
      $('#__ytd-modal').fadeIn();
    });

    $('.__ytd-modal-close').on('click', function () {
      $('#__ytd-modal').hide();
    });
  },
  2000
);

/*
window.fetch(`${baseURL}/options?url=${currentURL}`)
  .then(res => res.json())
  .catch(console.log)
  .then(console.log)


window.fetch('', {
  method: 'POST',
  body: JSON.stringify({
    link: window.location.href
  }),
  cors: 'cors',
  headers: new Headers({
    'Content-Type': 'application/json',
  })
})
  .then(res => res.json())
  .catch(console.log)
  .then(console.log);
*/
