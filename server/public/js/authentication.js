/* global $, axios */
'use strict'
$(document).ready(function () {
  console.info('loaded file')
  // event listeners for: login-btn && registration-btn
  // ========== I. helper functions ==================
  function getFormData () {
    const formData = {}
    $('form > div.form-group').each(function (i, element) {
      const key = $(element).find('label').attr('for').trim()
      const value = $(element).find('input').val().trim()
      formData[key] = value
    })
    return formData
  }
  // =========== II. event handler functions ===========
  function handleLoginEvent (e) {
    e.preventDefault()
    const formData = getFormData()
    axios.post('/auth/login', formData).then(function (response) {
      console.dir(response)
      debugger
      window.location.replace('/')
    })
  }

  function handleRegisterEvent (e) {
    e.preventDefault()
    const formData = getFormData()
    axios.post('/auth/register', formData).then(function (response) {
      console.dir(response)
      debugger
      window.location.replace('/')
    })
  }

  function handleLogoutEvent (e) {
    e.preventDefault()
    axios.post('/auth/logout').then(function (response) {
      if (!response.data.error) {
        console.log('successfully logged you out')
        debugger
        window.location.replace('/')
      } else {
        console.warn('Error loggin you out yooo')
        console.dir(response.data)
      }
    })
  }
  // =========== III Registering Event Listeners =============
  $('button#login-btn').on('click', handleLoginEvent)
  $('button#register-btn').on('click', handleRegisterEvent)
  $('a#logout-link').on('click', handleLogoutEvent)
})
