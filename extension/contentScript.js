(function(){

let media = [];
const baseURL = 'http://localhost:5000';
const currentURL = window.location.href;

const client = ({ url, method, data = {} }) => {
  const endpoint = `${baseURL}/${url.replace(/^\/+/, '')}`
  let options = { method };
  if (method.toLowerCase() !== 'get') {
    options['body'] = JSON.stringify(data);
  }
  return fetch(endpoint, options).then(res => res.json());
}

const setup = () => {
  /**
   * Add download button.
   */
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

  /**
   * Add download modal.
   */
  $('body').append(
    `
      <div id="__ytd-modal" class="__ytd-modal">
        <div class="__ytd-modal-content">
          <span class="__ytd-modal-close">&times;</span>
          <h3 class="__ytd-modal-header">Download Options</h3>
          <ol class="__ytd-download-list">
            Loading...
          </ol>
        </div>
      </div>
    `
  );

  /**
   * On modal open...
   */
  $('.__ytd-btn').on('click', () => {
    $('#__ytd-modal').fadeIn();
    client({ url: `/options?url=${currentURL}`, method: 'GET' })
      .then(res => {
        const audio = res.find(x => x.format === 'audio');
        const low = res.find(x => x.format === 'video' && x.quality === '360p');
        const medium = res.find(x => x.format === 'video' && x.quality === '720p');
        const high = res.find(x => x.format === 'video' && x.quality === '1080p');
        media = [audio, low, medium, high].map((x, i) => { x.id = i; return x; })
        let html = '';
        media.forEach((source) => {
          if (source) {
            html += `
              <li data-id="${source.id}"> 
                ${source.format === 'audio' ? 'Audio - ' : 'Video -' }
                ${source.title} ${source.quality}.${source.extension}
              </li>
            `
          }
        });
        $('.__ytd-download-list').html(html);
        $('.__ytd-download-list li').on('click', (e) => {
          let id = $(e.target).data('id');
          download = media.find(x => x.id === id);
          client({ url: '/download', method: 'POST', data: download })
            .then(res => {
              console.log('Downloading media....');
            })
            .catch(err => {
              console.log('Error....');
            })
        });

      })
      .catch(err => {
          console.log(err);
      });
  });

  /**
   * On modal close...
   */
  $('.__ytd-modal-close').on('click', function () {
    $('#__ytd-modal').hide();
  });
}

setTimeout(setup, 2000);
})();
