/* global $, axios, localStorage, alert */
$(document).ready(function () {
  // console.info('page was loaded')
  $('button#login-btn').on('click', function (event) {
    event.preventDefault()
    // 1. get form data
    var formData = {}
    $('form > div.form-group').each(function (i, element) {
      var key = $(element).find('label').attr('for').trim()
      var value = $(element).find('input').val().trim()
      formData[key] = value
    })
    // console.dir(formData)
    // debugger

    // 2. make post request
    axios.post('/auth/login', {
      data: formData
    }).then(function (response) {
      // console.log(response)
      if (response.data.error) {
        alert('Could not sign you in')
        console.dir(response.data)
      } else {
        // set token in localStorage
        localStorage.setItem('token', response.data.token)
        alert('Successful sign!')
        window.location.replace('/')
      }
    })
  })
})
