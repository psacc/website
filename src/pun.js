/* global Prism */

function loadPuns () {
  return fetch('./code_pun/pun.txt')
    .then((response) => response.text())
    .then((text) => text.split('\n'))
}

function parsePun (line) {
  const match = line.match(/^(.*?):(.*)$/)
  return match ? { language: match[1].trim(), joke: match[2].trim() } : null
}

function renderPun (pun) {
  const containerElement = document.querySelector('#container')
  const codeElement = containerElement.querySelector('code')
  containerElement.className = 'flip-first-half'
  containerElement.addEventListener('animationend', function handler () {
    containerElement.removeEventListener('animationend', handler)
    codeElement.className = `language-${pun.language}`
    codeElement.textContent = pun.joke
    Prism.highlightAll()
    containerElement.className = 'flip-second-half'
  })
}

function changePun (lines) {
  let pun = null
  while (!pun) {
    const randomIndex = Math.floor(Math.random() * lines.length)
    pun = parsePun(lines[randomIndex])
  }
  renderPun(pun)
}

loadPuns()
  .then((lines) => {
    changePun(lines)
    document
      .querySelector('pre')
      .addEventListener('click', () => changePun(lines))
  })
  .catch((error) => console.error('Error:', error))
