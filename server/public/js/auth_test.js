/* global $, axios, localStorage */
$(document).ready(function () {
  if (window.location.pathname !== '/') {
    return
  }
  // data selectors
  var adminData = $('#admin-data-target')
  var userData = $('#logged-in-data-target')

  // console.log("Youre on the home page budddy")
  var token = localStorage.getItem('token')
  console.log(token)

  function getAdminData () {
    axios.get('/api/admin-only/data', {
      headers: { token: token }
    }).then(function (response) {
      // console.log(response)
      var msg
      if (response.data.error) {
        console.dir(response.data)
        msg = $('<p>').text('You must be an admin to view this data')
      } else {
        msg = $('<p>').text(response.data.msg)
      }
      adminData.append(msg)
    })
  }
  // console.log('calling getAdmin data ...')
  getAdminData()

  function getUserData () {
    axios.get('/api/logged-in-only/data', {
      headers: { token: token }
    }).then(function (response) {
      var msg
      if (response.data.error) {
        console.dir(response.data)
        msg = $('<p>').text('You must be signed in to view this data')
      } else {
        console.log(response.data)
        msg = $('<p>').text(response.data.msg)
      }
      userData.append(msg)
    })
  }
  // console.log('calling getUser data ...')
  getUserData()
})
