class UsersListPage {
    loadUserList() {
        console.log('loadUserList works')

        $.ajax({
            url: '../../../backend/Users/handlers/LoadUserHandler.php',
            method: 'GET',
            data: {},
            success: (res) => {
                console.log('response from load user php file:');
                console.log(res);
                const users = JSON.parse(res).response;
                console.log(users.users)
            },
            error: (xhr, status, error) => {
                console.error(xhr.responseText);
            }
        })
    }
}

const usersListPage = new UsersListPage();

document.querySelector('#loadUsersBtn').addEventListener('click', usersListPage.loadUserList.bind(usersListPage));