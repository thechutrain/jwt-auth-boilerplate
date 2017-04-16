$(document).ready(function(){
  $('a#logout-link').on('click', function(event) {
    event.preventDefault()
    console.log(localStorage.getItem('token'))
    var proceed = confirm('signing you out ...')
    if (proceed) {
      localStorage.removeItem('token')
      console.log(localStorage.getItem('token'))
      debugger
      window.location.replace(window.location.href)
    }
  })
})