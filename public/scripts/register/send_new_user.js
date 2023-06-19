
const fail_password_confirm = "Passwords don't match!"
const username_not_avaliable = "Username not avaliable!"
const invalid_username = "Entered username isn't valid!"
const account_create_fail = "Couldn't create account! "



const send_new_user = () => {

    const password_field = document.getElementById("enterPassword")
    const confirm_field = document.getElementById("confirmPassword")
    const outputField = document.getElementById("registerFailOutput")

    if((password_field.value === undefined || confirm_field.value === undefined || password_field.value === '' || confirm_field.value == '' ) || password_field.value != confirm_field.value){
        password_field.value = ""
        confirm_field.value = ""
        outputField.textContent = fail_password_confirm
        return
    }
    
    const username_field = document.getElementById('enterUsername')

    const username = username_field.value
    const password = password_field.value

    console.log("GONNA SEND BRO I PROMISE UWU")
    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/new_user');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = function() {
                if (xhr.status === 200) {
                    console.log("before converted: ", xhr.responseText)
                    const createAccountSuccess = xhr.responseText === 'true'
                    console.log("converted: ", createAccountSuccess)
                    if(createAccountSuccess){
                        window.location.href = '/login';
                    }else{
                        username_field.value = ""
                        password_field.value = ""
                        confirm_field.value = ""
                        outputField.textContent = username_not_avaliable
                    }
                }
    };

    const user_object = {username : username, password: password}
            
    xhr.send(JSON.stringify(user_object));
        
}
const checkSpace = (event) =>{
    if(event.key === "Enter"){
        console.log("I fuck our mom")
        send_new_user()
    }
}
