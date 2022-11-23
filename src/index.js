import { isIP } from 'is-ip'
import isValidDomain from 'is-valid-domain'
import L from 'leaflet'

const isMobile = window.innerWidth <= 640
console.log(window.innerWidth)

const form = document.querySelector('#form')
const ipAddressText = document.querySelector('#ipAddress')
const locationText = document.querySelector('#location')
const timezoneText = document.querySelector('#timezone')
const ispText = document.querySelector('#isp')
const loadingMsg = 'Loading...'

const button = document.querySelector('#button')
button.addEventListener('click', () => {
  form.requestSubmit()
})

const blackIcon = new L.Icon({
  iconUrl:
    'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-black.png',
  shadowUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
})

let map = L.map('map')
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map)

form.addEventListener('submit', (e) => {
  e.preventDefault()
  const inputValue = e.target.elements.ipInput.value

  if (isIP(inputValue)) {
    const payload = {
      ipAddress: inputValue,
    }
    getLocationBy(payload)
  } else if (isValidDomain(inputValue)) {
    const payload = {
      domain: inputValue,
    }
    getLocationBy(payload)
  }
})

function getLocationBy(payload) {
  ipAddressText.textContent = loadingMsg
  ispText.textContent = loadingMsg
  timezoneText.textContent = loadingMsg
  locationText.textContent = loadingMsg

  fetch('https://ipify-x63v.onrender.com', {
    method: 'POST',
    body: JSON.stringify(payload),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })
    .then(async (response) => {
      const data = await response.json()
      const { isp, ip } = data
      const { lat, lng, city, timezone } = data.location
      ipAddressText.textContent = ip
      ispText.textContent = isp
      timezoneText.textContent = `UTC ${timezone}`
      locationText.textContent = city
      console.log(isMobile)
      // compensate latitude to marker appear under menu info
      if (isMobile) {
        map.setView([lat + 0.02, lng], 13)
      } else {
        map.setView([lat, lng], 13)
      }
      L.marker([lat, lng], { icon: blackIcon }).addTo(map)
    })
    .catch((e) => console.error(e))
}
