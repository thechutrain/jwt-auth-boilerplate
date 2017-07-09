// $(document).ready(function() {
//   // console.info('page was loaded')
//   $('button#register-btn').on('click', function(event) {
//     event.preventDefault()
//     // 1. Get the form data
//     var formData = {}
//     $('form > div.form-group').each(function(i, element){
//       var key = $(element).find('label').attr('for').trim()
//       var value = $(element).find('input').val().trim()
//       formData[key] = value
//     })
//     // 2. make post request
//     axios.post('/auth/register', {
//       data: formData
//     }).then(function(response) {
//       if (response.data.error) {
//         console.warn('There was an error in your sign in')
//         console.dir(response.data)
//         // console.warn(response.data.errorsArray.join(' // '))
//       } else {
//         // redirect user to login page
//         alert("Successful registration! Press okay to continue!")
//         window.location.replace('/login')
//       }
//     })
//   }) // ends register-btn event listener
//
// })
