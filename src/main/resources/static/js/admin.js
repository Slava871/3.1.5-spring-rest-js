const infobar = document.querySelector('.userDataBar')
const adminpanel = document.querySelector('#adminPanel')
const renderuser = document.querySelector('.showUser')
const manage = document.querySelector('.manage')
const newUser = document.querySelector('.newUser')


function getCurrentUser() {
    return fetch('http://localhost:8080/api/user');
}

function getUsers() {
    return fetch('http://localhost:8080/api/users');
}


function bar() {
    getCurrentUser()
        .then(res => res.json())
        .then(data =>
            infobar.innerHTML = `<span> ${data.username}, with roles: ${data.roles.map(o => o.name.split("_")[1])}</span>`)

}

function showuser() {
    getCurrentUser()
        .then(res => res.json())
        .then(data => adminpanel.innerHTML = `
            <div class="table-responsive" style="background: #ffffff;">
              <table class="table">
                <thead>
                  <tr>
                    <th>About user</th>
                  </tr>
                    <tr>
                           <th>ID</th>
                           <th>Username</th>
                           <th>First Name</th>
                           <th>Second Name</th>
                           <th>Age</th>
                           <th>Email</th>
                           <th>Roles</th>
                    </tr>
                </thead>
                       <tbody >
                         <tr>
                           <td>${data.id}</td>
                           <td>${data.username}</td>
                           <td>${data.firstName}</td>
                           <td>${data.secondName}</td>
                           <td>${data.age}</td>
                           <td>${data.email}</td>
                           <td>${data.roles.map(o => o.name.split("_")[1])} </td>
                         </tr>
                       </tbody>
              </table>
            </div>`)
}
function adminManage() {
    let output = ""
    getUsers().then(res => res.json()).then(data => {
        data.forEach(
            user => {
                output += `<tr>
                           <td >${user.id}</td>
                           <td >${user.username}</td>
                           <td >${user.firstName}</td>
                           <td >${user.secondName}</td>
                           <td >${user.age}</td>
                           <td >${user.email}</td>
                           <td >${user.roles.map(o => o.name.split("_")[1])} </td>
                           <td>
                                    <button type="button" class="btn btn-primary" data-bs-toggle="modal"  data-bs-target='#edit_user${user.id}'>Edit</button>
                                    <div id='edit_user${user.id}' class=" userEdit modal fade" role="dialog" tabindex="-1">
                                        <div class="modal-dialog" role="document">
                                            <div class="modal-content">
                                                <div class="modal-header">
                                                    <h4 class="modal-title">Edit user</h4>
                                                    <button class="btn-close" type="button" data-bs-dismiss="modal" aria-label="Close"></button>
                                                </div>
                                                <form class="text-center" id ="editForm${user.id}"   style="background: #ffffff;">
                                                    <div class="modal-body">
                                                        <div class="row justify-content-center">
                                                            <div class="col" style="max-width: 40%;">
                                                                <label class="form-label">
                                                                    <strong>ID</strong>
                                                                </label>
                                                                <input  class="form-control" type="number" name = "edit${user.id}"  value = '${user.id}' disabled="disabled" />
                                                            </div>
                                                        </div>
                                                        <div class="row justify-content-center">
                                                            <div class="col" style="max-width: 40%;">
                                                                <label class="form-label">
                                                                    <strong>Username</strong>
                                                                </label>
                                                                <input required class="form-control" type="text" name = "edituserName${user.id}" value='${user.username}' />
                                                            </div>
                                                        </div>
                                                        <div class="row justify-content-center">
                                                            <div class="col" style="max-width: 40%;">
                                                                <label class="form-label">
                                                                    <strong>First Name</strong>
                                                                </label>
                                                                <input class="form-control" type="text" name = "editfirstName${user.id}" value='${user.firstName}'/>
                                                            </div>
                                                        </div>
                                                        <div class="row justify-content-center">
                                                            <div class="col" style="max-width: 40%;">
                                                                <label class="form-label">
                                                                    <strong>Last Name</strong>
                                                                </label>
                                                                <input class="form-control" type="text"  name = "editsecondName${user.id}" value='${user.secondName}' />
                                                            </div>
                                                        </div>
                                                        <div class="row justify-content-center">
                                                            <div class="col" style="max-width: 40%;">
                                                                <label class="form-label">
                                                                    <strong>Age</strong>
                                                                </label>
                                                                <input class="form-control" type="number" name = "editAge${user.id}" value='${user.age}'/>
                                                            </div>
                                                        </div>
                                                        <div class="row justify-content-center">
                                                            <div class="col" style="max-width: 40%;">
                                                                <label class="form-label">
                                                                    <strong>Email</strong>
                                                                </label>
                                                                <input class="form-control" type="email"  name = "editEmail${user.id}" value='${user.email}' />
                                                            </div>
                                                        </div>
                                                        <div class="row justify-content-center">
                                                            <div class="col" style="max-width: 40%;">
                                                                <label class="form-label">
                                                                    <strong>Password</strong>
                                                                </label>
                                                                <input class="form-control" type="password"  type = "password" name = "editPassword${user.id}" />
                                                            </div>
                                                        </div>
                                                        <div class="row justify-content-center">
                                                            <div class="col" style="max-width: 40%;">
                                                                <label class="form-label">
                                                                    <strong>Role</strong>
                                                                </label>
                                                                <select required class="form-select" data-bs-toggle="tooltip" title="hold Lctrl for multiselect"  name = "editRoles${user.id}"  multiple style="max-height: 70px;min-height: 40px;">
                                                                    <option  value="1">ADMIN</option>
                                                                    <option  value="2">USER</option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="modal-footer">
                                                        <button class="btn btn-light" type="button" style="background: rgb(116,109,109);" data-bs-dismiss="modal">Close</button>
                                                        <button class="btn btn-primary" type="button" name = "editUser" id = "${user.id}" data-bs-dismiss="modal" >Edit</button>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td>
	<button type="button" class="btn btn-primary" style="background: rgb(255,0,0);" data-bs-toggle="modal" data-bs-target="#delete_user${user.id}">Delete</button>
	<div id="delete_user${user.id}" class="modal fade" role="dialog" tabindex="-1">
		<div class="modal-dialog" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<h4 class="modal-title">Delete user</h4>
					<button class="btn-close" type="button" data-bs-dismiss="modal" aria-label="Close"></button>
				</div>
				<form class="text-center"  style="background: #ffffff;">
					<div class="modal-body">
						<div class="row justify-content-center">
							<div class="col" style="max-width: 40%;">
								<label class="form-label">
									<strong>ID</strong>
								</label>
								<input class="form-control" type="number" name="id" value="${user.id}" disabled="disabled" />
							</div>
						</div>
						<div class="row justify-content-center">
							<div class="col" style="max-width: 40%;">
								<label class="form-label">
									<strong>Username</strong>
								</label>
								<input class="form-control" type="text" name="username" value="${user.username}" disabled="disabled" />
							</div>
						</div>
						<div class="row justify-content-center">
							<div class="col" style="max-width: 40%;">
								<label class="form-label">
									<strong>First Name</strong>
								</label>
								<input class="form-control" type="text" name="firstname" value="${user.firstName}" disabled="disabled" />
							</div>
						</div>
						<div class="row justify-content-center">
							<div class="col" style="max-width: 40%;">
								<label class="form-label">
									<strong>Last Name</strong>
								</label>
								<input class="form-control" type="text" name="secondName" value="${user.secondName}" disabled="disabled" />
							</div>
						</div>
						<div class="row justify-content-center">
							<div class="col" style="max-width: 40%;">
								<label class="form-label">
									<strong>Age</strong>
								</label>
								<input class="form-control" type="number" name="age" value="${user.age}" disabled="disabled" />
							</div>
						</div>
						<div class="row justify-content-center">
							<div class="col" style="max-width: 40%;">
								<label class="form-label">
									<strong>Email</strong>
								</label>
								<input class="form-control" type="email" name="email" value="${user.email}" disabled="disabled" />
							</div>
						</div>
						<div class="row justify-content-center">
							<div class="col" style="max-width: 40%;">
								<label class="form-label">
									<strong>Role</strong>
								</label>
								<select class="form-select" data-bs-toggle="tooltip" title="hold Lctrl for multiselect" name="roles"  multiple style="max-height: 70px;min-height: 40px;" disabled="disabled">
									<option value="ROLE_ADMIN">ADMIN</option>
									<option value="ROLE_USER">USER</option>
								</select>
							</div>
						</div>
					</div>
					<div class="modal-footer">
						<button class="btn btn-light" type="button" style="background: rgb(116,109,109);" data-bs-dismiss="modal">Close</button>
						<button class="btn btn-primary" style="background: rgb(255,0,0);" type="button" id = "del_${user.id}" name="deleteUser${user.id}" data-bs-dismiss="modal">Delete</button>
					</div>
				</form>
			</div>
		</div>
	</div>
</td>
                       </tr>`

            }
        )
        adminpanel.innerHTML = output
    })

}

function getRoles(element) {
    let selected = [];
    for (let option of element) {
        if (option.selected) {
            selected.push(option.value);
        }
    }
    return selected
}


renderuser.addEventListener('click', (e) => {
    e.preventDefault();
    showuser();
})
manage.addEventListener('click', (e) => {
    e.preventDefault();
    adminManage();
})
adminpanel.addEventListener('click', (e) => {
    e.preventDefault();


    if (e.target.name !== undefined && e.target.name.includes("edit")) {
        fetch('http://localhost:8080/api/users/' + e.target.id,
            {
                method: 'PATCH',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(
                    {
                        username: document.getElementsByName('edituserName' + e.target.id)[0].value,
                        firstName: document.getElementsByName('editfirstName' + e.target.id)[0].value,
                        secondName: document.getElementsByName('editsecondName' + e.target.id)[0].value,
                        age: document.getElementsByName('editAge' + e.target.id)[0].value,
                        email: document.getElementsByName('editEmail' + e.target.id)[0].value,
                        password: document.getElementsByName('editPassword' + e.target.id)[0].value,
                        roles: getRoles(document.getElementsByName('editRoles' + e.target.id)[0].options)
                    }
                )
            }
        ).then(() => adminManage())


    }
    if (e.target.name !== undefined && e.target.name.includes('delete')) {
        fetch('http://localhost:8080/api/users/' + e.target.id.split("_")[1], {method: 'DELETE'}).then(() => adminManage())

    }


})
newUser.addEventListener('click', (e) => {
    e.preventDefault();
    if (e.target.name === "newUserbutton") {
        fetch('http://localhost:8080/api/users',
            {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(
                    {
                        username: document.getElementsByName('newusername')[0].value,
                        firstName: document.getElementsByName('newfirstname')[0].value,
                        secondName: document.getElementsByName('newsecondname')[0].value,
                        age: document.getElementsByName('newage')[0].value,
                        email: document.getElementsByName('newemail')[0].value,
                        password: document.getElementsByName('newpassword')[0].value,
                        roles: getRoles(document.getElementsByName('newroles')[0].options)
                    }
                )
            }
        ).then(() => {
            adminManage();
            document.getElementById("utable").click()
        })
    }

})
bar();
adminManage()