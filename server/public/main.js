// $(document).ready(function() {
//   console.info('page was loaded')
//   // =========  TESTING Event Listeners ==============
//   $('a#private-link').on('click', function(event) {
//     event.preventDefault()
//     // console.log('a#private-link was pressed yooo')
//     var token = localStorage.getItem('token') || null
//     axios.get('/private', {
//       headers: { token: token }
//     }).then(function(response) {
//       // console.log(response)
//       if (response.data.error) {
//         console.log('error')
//         var msg = $('<p>').text(JSON.stringify(response.data.msg))
//         $('div#data-container').append(msg)
//       } else {
//         var clean_data = JSON.stringify(response.data, null, 4)
//         $('div#data-container').append(clean_data)
//       }
//     })
//   })

//   $('a#logout-link').on('click', function(event) {
//     event.preventDefault()
//     console.log(localStorage.getItem('token'))
//     localStorage.removeItem('token')
//     console.log('cleared token ...')
//     console.log(localStorage.getItem('token'))
//   })
//   // ========= I. Event Listeners ==============
//   $('button#login-btn').on('click', function(event) {
//     event.preventDefault()
//     var formData = {}
//     $('form > div.form-group').each(function(i, element){
//       var key = $(element).find('label').attr('for').trim()
//       var value = $(element).find('input').val().trim()
//       formData[key] = value
//     })
//     // console.dir(formData)

//     // 2. make ajax request
//     $.ajax({
//       url: '/auth/login',
//       data: formData,
//       method: 'POST'
//     })
//     .then(function(response) {
//       console.log(response)
//       if (!response.error) {
//         console.log('setting the local storage w token')
//         localStorage.setItem('token', response.token)
//       }
//     })
//   }) // ends login-btn event listener

//   // ========= II. Event Listeners ==============
//   $('button#register-btn').on('click', function(event) {
//     event.preventDefault()
//     // 1. Get the form data
//     var formData = {}
//     $('form > div.form-group').each(function(i, element){
//       var key = $(element).find('label').attr('for').trim()
//       var value = $(element).find('input').val().trim()
//       formData[key] = value
//     })
//     console.dir(formData)

//     // 2. make ajax request
//     $.ajax({
//       url: '/auth/register',
//       data: formData,
//       method: 'POST'
//     })
//     .then(function(response) {
//       console.log(response)
//     })
//   }) // ends register-btn event listener

// })