const greetinsPage = function () {
  const hourOfTheDay = new Date().getHours()
  const greetingText = document.getElementById('greeting')
  if (hourOfTheDay >= 6 && hourOfTheDay < 12) {
    greetingText.innerText = 'Buongiorno'
  } else if (hourOfTheDay >= 12 && hourOfTheDay < 18) {
    greetingText.innerText = 'Buon pomeriggio'
  } else {
    greetingText.innerText = 'Buonasera'
  }
}

greetinsPage()
