$(document).ready(function() {
  console.info('page was loaded')
  // ========= Event Listeners ==============
  $('button#login-btn').on('click', function(event) {
    event.preventDefault()
    // 1. Get the form data
    var formData = {}
    $('form > div.form-group').each(function(i, element){
      var key = $(element).find('label').attr('for').trim()
      var value = $(element).find('input').val().trim()
      formData[key] = value
    })
    // console.dir(formData)

    // 2. make ajax request
    $.ajax({
      url: '/auth/login',
      data: formData,
      method: 'POST'
    })
    .then(function(response) {
      console.log(response)
    })
  }) // ends login-btn event listener

  $('button#register-btn').on('click', function(event) {
    event.preventDefault()
    // 1. Get the form data
    var formData = {}
    $('form > div.form-group').each(function(i, element){
      var key = $(element).find('label').attr('for').trim()
      var value = $(element).find('input').val().trim()
      formData[key] = value
    })
    console.dir(formData)

    // 2. make ajax request
    $.ajax({
      url: '/auth/register',
      data: formData,
      method: 'POST'
    })
    .then(function(response) {
      console.log(response)
    })
  }) // ends register-btn event listener

})