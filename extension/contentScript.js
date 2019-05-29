window.fetch('http://localhost:5000/', {
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
