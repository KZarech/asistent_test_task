class UsersListPage {
    editUser(id) {
        const name = document.querySelector(`#user-${id}-name`).value.trim();
        const phone = document.querySelector(`#user-${id}-phone`).value.trim();

        $.ajax({
            url: '../../../backend/Users/handlers/UpdateUserHandler.php',
            method: 'POST',
            data: {
                id: id,
                name: name,
                phone: phone,
            },
            success: (res) => {
                if (res === '"success"') {
                    alert('Данные пользователя успешно обновлены');
                } else {
                    res = JSON.parse(res);
                    if (Array.isArray(res)) {
                        validation.handleValidationResponse(res, 'Не удалось обновить данные пользователя.');
                    } else {
                        alert('Не удалось обновить данные пользователя');
                    }
                }
            },
            error: (xhr, status, error) => {
                console.error(xhr.responseText);
            }
        });
    }

    deleteUser(id) {
        const parentBlock = document.querySelector('#usersListContainer');
        const userBlock = document.querySelector(`#user-${id}`);
        const cookieId = common.getCookie('userId');

        if (id == cookieId) {
            alert('Нельзя удалить самого себя');
        } else {
            $.ajax({
                url: '../../../backend/Users/handlers/DeleteUserHandler.php',
                method: 'POST',
                data: {
                    id: id,
                },
                success: (res) => {
                    if (res === '"success"') {
                        parentBlock.removeChild(userBlock);
                    } else {
                        alert('Не удалось удалить пользователя');
                    }
                },
                error: (xhr, status, error) => {
                    console.error(xhr.responseText);
                }
            });
        }
    }

    renderUser(parentElId, id, name, email, phone) {
        const parent = document.querySelector(`#${parentElId}`)
        const userWrapper = document.createElement('div');
        userWrapper.classList.add('users');
        userWrapper.setAttribute('id', `user-${id}`);
        userWrapper.innerHTML = `
            <div class="form-group">
                <div>
                    <label for="name">Имя:</label>
                    <input id="user-${id}-name" value="${name}" type="text" id="name" name="name" required>
                </div>
                <div>
                    <label for="phone">Телефон:</label>
                    <input id="user-${id}-phone" value="${phone}" type="text" id="phone" name="phone" required>
                </div>
                <div>
                    <label for="name">Email: ${email}</label>
                </div>
        </div>

        <div class="buttons">
            <button onclick="usersListPage.editUser(${id})" class="button mainBtn" type="button">Редактировать</button>
            <button onclick="usersListPage.deleteUser(${id})" class="button secondaryBtn" type="button">Удалить</button>
        </div>
        `;

        parent.appendChild(userWrapper);
    }

    renderUserList() {
        $.ajax({
            url: '../../../backend/Users/handlers/LoadUserHandler.php',
            method: 'GET',
            success: (res) => {
                if (typeof res === 'string' && res.includes('authorized')) {
                    window.location.href = "/index.php";
                } else {
                    const users = JSON.parse(res).response.users;

                    users.forEach(user => {
                        this.renderUser('usersListContainer', user.id, user.name, user.email, user.phone);
                    })
                }
            },
            error: (xhr, status, error) => {
                console.error(xhr.responseText);
                return [];
            }
        });
    }
}

$(document).ready(function () {
    const usersListPage = new UsersListPage();

    usersListPage.renderUserList();
})

const usersListPage = new UsersListPage();
const validation = new UserFieldValidation();
const common = new Common();
