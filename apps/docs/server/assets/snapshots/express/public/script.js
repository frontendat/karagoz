function doSomething() {
  console.log('Fetching message...')
  fetch('/api/message')
    .then((response) => response.text())
    .then((data) => {
      console.log('Received message:', data)
      document.querySelector('.response').innerHTML = data
    })
}
