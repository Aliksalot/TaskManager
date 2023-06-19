
			function send_login_info(){
				const username_win = document.getElementById('enterLoginUsername')
				const password_win = document.getElementById('enterPassword')
				const username = username_win.value
				const password = password_win.value
				console.log("PASSWORD ENTERED", password)
				if(password === '' || username === '' || password === undefined || username === undefined){
				 loginIssue("Username and password are required!!")
				 clearTextField()
				 return
				 }
				var xhr = new XMLHttpRequest();
				xhr.open('POST', '/oJs5Mr1uPxFXVbP2TzWS5SahD');
				xhr.setRequestHeader('Content-Type', 'application/json');
				xhr.onload = function() {
			       		 if (xhr.status === 200) {
						loginIssue(xhr.response)
						window.location.href = '/home';
			       		 }
			       	};
			       	clearTextField()
			       	const user = {username: username, password: password}
				xhr.send(JSON.stringify(user));
			}
			
			function clearTextField(){
				const username_win = document.getElementById('enterLoginUsername')
				const password_win = document.getElementById('enterPassword')
				username_win.value = ''
				password_win.value = ''
			}
			
			function loginIssue(issue){
				const loginWin = document.getElementById('loginFailOutput')
				loginWin.textContent = issue
						
			}
			
			function checkSpace(event){
				if(event.key === "Enter"){
					console.log("I fuck our mom")
					send_login_info()
				}
			
			}
	
