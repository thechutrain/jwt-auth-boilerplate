/* global $, axios, localStorage */
/* this file is mearly to check that the authentication is working
* on the home page, by making a request from the home page.
*
*/
'use strict'
$(document).ready(function() {
	if (window.location.pathname !== '/') {
		return
	}
	// ========== I. variables ==================
	var adminData = $('#admin-data-target')
	var userData = $('#logged-in-data-target')

	// ========== II. Request Functions ==================
	function getAdminData() {
		var msg
		axios
			.get('/api/admin-only/data', {
				headers: { 'cache-control': 'no-cache' }
			})
			.then(function(response) {
				msg = $('<p>').text(response.data.msg)
				adminData.append(msg)
			})
			.catch(function(err) {
				msg = $('<p>').text('You must be an admin to view this data')
				adminData.append(msg)
			})
	}

	function getUserData() {
		var msg
		axios
			.get('/api/logged-in-only/data', {
				headers: { 'cache-control': 'no-cache' }
			})
			.then(function(response) {
				msg = $('<p>').text(response.data.msg)
				userData.append(msg)
			})
			.catch(function(err) {
				msg = $('<p>').text('You must be signed in to view this data')
				userData.append(msg)
			})
	}

	// ========== III. Invoking Functions ==================
	getAdminData()
	getUserData()
})
