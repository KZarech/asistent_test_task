class AuthPage {
    auth() {
        const email = document.querySelector('#email').value;
        const pass = document.querySelector('#password').value;

        $.ajax({
            url: '../../../backend/Users/handlers/AuthHandler.php',
            method: 'POST',
            data: {
                email: email,
                password: pass,
            },
            success: (res) => {
                if (res === 'user not found') {
                    alert('Пользователь с введенными данными не найден');
                } else {
                    document.querySelector('#email').setAttribute('value', '');
                    document.querySelector('#password').setAttribute('value', '');
                    window.location.href = "/frontend/pages/usersList.html";
                }
            },
            error: (xhr, status, error) => {
                console.error(xhr.responseText);
            }
        });
    }
}

const authPage = new AuthPage();
document.querySelector('#authUserBtn').addEventListener('click', authPage.auth.bind(authPage));