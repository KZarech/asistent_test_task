class UserFieldValidation {
    handleValidationResponse(res, message) {
        res.forEach(val => {
            if (typeof val === 'string') {
                if (val.includes('email') && !val.includes('registered'))
                    message += ' Введите правильный email;';
                if (val.includes('phone'))
                    message += ' Введите правильный номер телефона (10 символов, только цифры);';
                if (val.includes('name'))
                    message += ' Введите правильное имя (не больше 100 символов);';
                if (val.includes('password'))
                    message += ' Введите правильный пароль (не меньше 8 символов);';
                if (val.includes('registered'))
                    message += ' Введенный email уже зарегистрирован;'
            }
        })
        alert(message);
    }
}
