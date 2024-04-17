class UsersListPage {
    editUser(id) {
        console.log(`edit user with id ${id}`);
    }

    deleteUser(id) {
        console.log(`delete user with id ${id}`);
    }

    renderUser(parentElId, id, name, email, phone) {
        const parent = document.querySelector(`#${parentElId}`)
        const userWrapper = document.createElement('div');
        userWrapper.classList.add('user');
        userWrapper.setAttribute('id', `user-${id}`);
        userWrapper.innerHTML = `
            <div class="userForm-fields">
                <div>
                    <div>
                        <label for="name">Имя:</label>
                        <input value="${name}" type="text" id="name" name="name" required>
                    </div>
                </div>
                <div>
                    <div>
                        <label for="phone">Телефон:</label>
                        <input value="${phone}" type="text" id="phone" name="phone" required>
                    </div>
                </div>
                <div>
                    <div>
                        <label for="name">Email:</label>
                        <input value="${email}" type="email" id="email" name="email" required>
                    </div>
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
                console.log(users);

                const usersBlock = document.querySelector('#usersListContainer');
                console.log(usersBlock);

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
