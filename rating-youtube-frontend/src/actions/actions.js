const API_URL = "http://localhost:3000/api/v1"
const headers = {
	"Content-Type": "application/json"
}

function authedHeaders(){
	return {
		...headers,
		"Authorization": localStorage.getItem("token")
	}
}
export function login(username, password){
	return (dispatch) => {
		return fetch(API_URL + "/login", {
			method: "POST",
			headers: headers,
			body: JSON.stringify({username, password})
		})
		.then(res => res.json())
		.then(userData => {
			console.log("LOGGING IN", userData)
			localStorage.setItem("token", userData.jwt)
			dispatch({
				type: "LOGIN_USER",
				payload: userData
			})
		})
	}
}

export function signup(email, name, username, password){
	return (dispatch) => {
		return fetch(API_URL + "/signup", {
			method: "POST",
			headers: authedHeaders(),
			body: JSON.stringify({email, name, username, password})
		})
		.then(res => res.json())
		.then(userData => {
			console.log("LOGGING IN", userData)
			localStorage.setItem("token", userData.jwt)
			dispatch({
				type: "LOGIN_USER",
				payload: userData
			})
		})
	}
}

export function getUser(){

	const token = localStorage.getItem("token")
	return (dispatch) => {
		return fetch(API_URL + "/get_user", {
			headers: {
				"Authorization": token
			}
		})
		.then(res => res.json())
		.then(userData => {
			dispatch({
				type: "LOGIN_USER",
				payload: userData
			})
		})
	}
}

export function logout(){
	localStorage.removeItem("token")
	return {
		type: "LOGOUT"
	}
}

export function getEmotions(){
	const token = localStorage.getItem("token")
	return (dispatch) => {
		return fetch(API_URL + "/emotions", {
			headers: {
				"Authorization": token
			}
		})
		.then(res => res.json())
		.then(emotions => {
			dispatch({
				type: "GET_EMOTIONS",
				payload: emotions
			})
		})
	}
}

export function getVideos() {
	const token = localStorage.getItem("token")
	return (dispatch) => {
		return fetch(API_URL + "/videos", {
			headers: {
				"Authorization": token
			}
		})
		.then(res => res.json())
		.then(videos => {
			dispatch({
				type: "GET_VIDEOS",
				payload: videos
			})
		})
	}
}

export function handleVideo(video){
	const etag = video.etag
	return (dispatch) => {
		return fetch(API_URL + "/videos#create", {
			method: "POST",
			headers: authedHeaders(),
			body: JSON.stringify({etag: etag})
		})
		.then(res => res.json())
		.then(video => {
			dispatch({
				type: "CREATE_VIDEO",
				payload: video
			})
		})
	}
}

export function handleFunny(video, time, user){
	const etag = video.etag
	return (dispatch) => {
		return fetch(API_URL + "/emotions#create", {
			method: "POST",
			headers: authedHeaders(),
			body: JSON.stringify({etag: etag, user_id: user.id, time: time})
		})
		.then(res => res.json())
		.then(emotion => {
			dispatch({
				type: "ADD_EMOTION",
				payload: emotion
			})
		})
	}
}

export function singleVideo(video) {
	return {
		type: "SINGLE_VIDEO",
		payload: video
	}
}

export function filterEmotions(emotions, currentVideo) {
	return {
		type: "FILTERED_EMOTION",
		payload: emotions.filter(emotion => emotion.video_id === currentVideo.id).sort((a, b) => a.time - b.time)
	}
}

export function timeEmotion(emotion) {
	return {
		type: 'TIME_EMOTION',
		payload: emotion
	}
}

export function cleanTimeEmotion() {
	return {
		type: 'CLEAN_TIME_EMOTION'
	}
}
