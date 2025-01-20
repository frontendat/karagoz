function doSomething() {
  fetch('/api/message')
    .then((response) => response.text())
    .then((data) => (document.querySelector('.response').innerHTML = data))
}
