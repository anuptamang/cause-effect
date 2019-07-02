class UI {
    constructor() {
        this.listUsers = document.querySelector('.list-users');
        this.detailsHolder = document.querySelector('.details-holder');
        this.userDetails = document.querySelector('.user-details');
    }

    showUsersList(users) {
        let output = '';

        for (let user of users) {
            output += `
                <li class="mb-2">
                    <a class="btn btn-info btn-block" href="#" data-id="${user.id}">${user.name}</a>
                </li>
            `;
        }

        this.listUsers.innerHTML = output;
    }

    showUserDetails(details) {
        let output = '';

        for (let user of details) {

            output += `
               <div class="card p-3 w-75" data-id="${user.id}">
                <div class="row">
                    <div class="col-md-4">
                    <img
                        class="mb-2 w-100"
                        src="${user.photoUrl}"
                        alt="${user.name}"
                    />
                    </div>
                    <div class="col-md-8">
                    <h4>${user.name}</h4>
                    <h6>Email: ${user.email}</h6>
                    <h6>Address: ${user.address.street}, ${user.address.suite}, ${user.address.city}</h6>
                    <h6>
                        Company: ${user.company.name} <br />
                        <em>${user.company.catchPhrase}</em>
                    </h6>
                    </div>
                </div>
                </div>
            `;
        }

        this.userDetails.innerHTML = output;
    }

    markActiveUserDetail() {
        let userBtns = document.querySelectorAll('.btn');
        let userCard = document.querySelector('.card');

        for (let btn of userBtns) {
            if (btn.dataset.id === userCard.dataset.id) {
                btn.classList.add('active')
            }
        }
    }

    postIsLoading() {
        //this.clearLoading();

        const div = document.createElement('div');
        div.className = 'loading';

        let img = document.createElement("IMG");
        img.setAttribute("src", "./src/images/loading.gif");

        div.appendChild(img);

        this.userDetails.appendChild(div);
    }

    // clearLoading() {
    //     const currentLoad = document.querySelector('.loading');

    //     if (currentLoad) {
    //         currentLoad.remove();
    //     }
    // }

}

export const ui = new UI();