const infobar = document.querySelector('.userDataBar')
const userdata = document.querySelector('#userData')
const renderuser = document.querySelector('.showUser')


function getCurrentUser(){
        return  fetch('http://localhost:8080/api/user');
}


function bar(){
    getCurrentUser()
        .then(res => res.json())
        .then(data =>
            infobar.innerHTML = `<span> ${data.username}, with roles: ${data.roles.map(o => o.name.split("_")[1])}</span>`)

}
function showuser(){
     getCurrentUser()
    .then(res => res.json())
    .then(user => userdata.innerHTML= `<tr>
                           <td >${user.id}</td>
                           <td >${user.username}</td>
                           <td >${user.firstName}</td>
                           <td >${user.secondName}</td>
                           <td >${user.age}</td>
                           <td >${user.email}</td>
                           <td >${user.roles.map(o => o.name.split("_")[1])} </td>
                       </tr>` )}
bar();
showuser();
renderuser.addEventListener('click', (e)=>{e.preventDefault();showuser();})
