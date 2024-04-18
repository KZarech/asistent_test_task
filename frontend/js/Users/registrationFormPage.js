class RegistrationFormPage {

    resetFieldsValues() {
        document.querySelector('#name').value = '';
        document.querySelector('#phone').value = '';
        document.querySelector('#email').value = '';
        document.querySelector('#password').value = '';
    }

    getFieldValues() {
        const data = {name: '', phone: '', email: '', password: ''};

        data.name = document.querySelector('#name').value.trim();
        data.phone = document.querySelector('#phone').value.trim();
        data.email = document.querySelector('#email').value.trim();
        data.password = document.querySelector('#password').value.trim();

        return data;
    }

    registerUser() {
        const formFields = Array.from(document.querySelector('#userForm').children[0].children);

        console.log(formFields);

        //TODO: маска для инпута номера телефона

        const data = this.getFieldValues();

        const empty = [];
        for (let key in data) {
            if (!data[`${key}`] || !data[`${key}`].trim()) {
                empty.push(key);
                break;
            }
        }

        if (empty.length > 0) {
            alert('Заполните все поля');
        } else {
            $.ajax({
                url: '../../../backend/Users/handlers/RegistrationHandler.php',
                method: 'POST',
                data: data,
                success: (res) => {
                    if (res === '"success"') {
                        console.log('registered');
                        alert('Пользователь успешно загеристрирован');
                        this.resetFieldsValues();
                        window.location.href = "/frontend/pages/authUser.html";
                    } else {
                        res = JSON.parse(res);
                        console.log(res);
                        console.log(Array.isArray(res))
                        if (Array.isArray(res)) {
                            validation.handleValidationResponse(res, 'Не удалось зарегистрировать пользователя.');
                        } else {
                            alert('Не удалось зарегистрировать пользователя');
                        }
                    }
                },
                error: (xhr, status, error) => {
                    console.error(xhr.responseText);
                }
            });
        }
    }
}


const registrationFormPage = new RegistrationFormPage();
const validation = new UserFieldValidation();
document.querySelector('#userSaveBtn').addEventListener('click', registrationFormPage.registerUser.bind(registrationFormPage));
document.querySelector('#userClearBtn').addEventListener('click', registrationFormPage.resetFieldsValues.bind(registrationFormPage));