/* global $, axios, localStorage */
'use strict'
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
    let msg
    axios.get('/api/admin-only/data', {
      headers: { 'cache-control': 'no-cache' }
    }).then(function (response) {
      msg = $('<p>').text(response.data.msg)
      adminData.append(msg)
    }).catch(function (err) {
      msg = $('<p>').text('You must be an admin to view this data')
      adminData.append(msg)
    })
  }
  // console.log('calling getAdmin data ...')
  getAdminData()

  function getUserData () {
    let msg
    axios.get('/api/logged-in-only/data', {
      headers: { 'cache-control': 'no-cache' }
    }).then(function (response) {
      msg = $('<p>').text(response.data.msg)
      userData.append(msg)
    }).catch(function(err) {
      msg = $('<p>').text('You must be signed in to view this data')
      userData.append(msg)
    })
  }
  // console.log('calling getUser data ...')
  getUserData()
})
