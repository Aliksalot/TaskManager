function logout() {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/logout');
    xhr.onload = function() {
                if (xhr.status === 200) {
                    window.location.href = '/login';
                }
           };
    sessionStorage.clear()
    xhr.send();
}
