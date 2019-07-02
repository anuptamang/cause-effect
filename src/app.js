//import dependency to work async/await/ promises/ fetch in IE
import "isomorphic-fetch";
//import UI class module
import { ui } from './ui/ui';

// get all the users list on DOM load
document.addEventListener('DOMContentLoaded', getUsers);
//listen for user details switch
ui.listUsers.addEventListener('click', switchUserDetail);

setTimeout(() => {
    ui.markActiveUserDetail();
}, 500)

async function getUsers() {
    let response = await fetch('./src/api/db.json');
    let data = await response.json()
    return data;
}

getUsers()
    .then(data => {
        ui.showUsersList(data);
        ui.postIsLoading();

        setTimeout(() => {
            let randomId = getRandomInt(1, 10);
            const filterId = data.filter(user => user.id == randomId);
            ui.showUserDetails(filterId);
        }, 200)
    })
    .catch(err => console.log(err));


function switchUserDetail(e) {
    e.preventDefault();

    if (e.target.classList.contains('btn')) {
        const eid = e.target.dataset.id;

        getUsers()
            .then(data => {
                const userInfo = data.filter(user => user.id == eid);
                ui.showUserDetails(userInfo);

                const btns = document.querySelectorAll('.btn');

                if (!e.target.classList.contains('active') && e.target.classList.contains('btn')) {
                    for (let btn of btns) {
                        btn.classList.remove('active')
                    }
                    e.target.classList.add('active')
                }
            }
            )
            .catch(err => console.log(err));
    }
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
