class UsersListPage {
    editUser(id) {
        console.log(`edit user with id ${id}`);
        const name = document.querySelector(`#user-${id}-name`).value;
        const email = document.querySelector(`#user-${id}-email`).value;
        const phone = document.querySelector(`#user-${id}-phone`).value;

        $.ajax({
            url: '../../../backend/Users/handlers/UpdateUserHandler.php',
            method: 'POST',
            data: {
                id: id,
                name: name,
                email: email,
                phone: phone,
            },
            success: (res) => {
                if (res === '"success"') {
                    alert('Данные пользователя успешно обновлены');
                } else {
                    alert('Не удалось обновить данные пользователя');
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

    renderUser(parentElId, id, name, email, phone) {
        const parent = document.querySelector(`#${parentElId}`)
        const userWrapper = document.createElement('div');
        userWrapper.classList.add('user');
        userWrapper.setAttribute('id', `user-${id}`);
        userWrapper.innerHTML = `
            <div class="userForm-fields">
                <div>
                    <label for="name">Имя:</label>
                    <input id="user-${id}-name" value="${name}" type="text" id="name" name="name" required>
                </div>
                <div>
                    <label for="phone">Телефон:</label>
                    <input id="user-${id}-phone" value="${phone}" type="text" id="phone" name="phone" required>
                </div>
                <div>
                    <label for="name">Email:</label>
                    <input id="user-${id}-email" value="${email}" type="email" id="email" name="email" required>
                </div>
        </div>

        <div class="buttons">
            <button onclick="usersListPage.editUser(${id})" style="background-color: green; color: white" type="button">Редактировать</button>
            <button onclick="usersListPage.deleteUser(${id})" style="background-color: red; color: white" type="button">Удалить</button>
        </div>
        `;

        parent.appendChild(userWrapper);
    }

    renderUserList() {
        $.ajax({
            url: '../../../backend/Users/handlers/LoadUserHandler.php',
            method: 'GET',
            success: (res) => {
                const users = JSON.parse(res).response.users;

                users.forEach(user => {
                    this.renderUser('usersListContainer', user.id, user.name, user.email, user.phone);
                })
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
