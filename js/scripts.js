
// Fetch and display data for 12 random users
fetch('https://randomuser.me/api/?results=12')
    .then(response => response.json())
    .then(data => {
        const gallery = document.querySelector('.gallery');
        if (gallery) {
            data.results.forEach(user => {
                const div = document.createElement('div');
                div.classList.add('card');
                div.insertAdjacentHTML('beforeend', `
                    <div class="card-img-container">
                        <img class="card-img" src="${user.picture.large}" alt="${user.name.first} ${user.name.last}">
                    </div>
                    <div class="card-info-container">
                        <h3 id="name" class="card-name cap">${user.name.first} ${user.name.last}</h3>
                        <p class="card-text">${user.email}</p>
                        <p class="card-text cap">${user.location.city}, ${user.location.state}</p>
                    </div>
                `);
                gallery.appendChild(div);

                // Add event listener
                div.addEventListener('click', () => {
                    const modal = document.createElement('div');
                    modal.classList.add('modal-container');
                    modal.insertAdjacentHTML('beforeend', `
                        <div class="modal">
                            <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                            <div class="modal-info-container">
                                <img class="modal-img" src="${user.picture.large}" alt="${user.name.first} ${user.name.last}">
                                <h3 id="name" class="modal-name cap">${user.name.first} ${user.name.last}</h3>
                                <p class="modal-text">${user.email}</p>
                                <p class="modal-text cap">${user.location.city}</p>
                                <hr>
                                <p class="modal-text">${user.cell}</p>
                                <p class="modal-text">${user.location.street.number} ${user.location.street.name}, ${user.location.city}, ${user.location.state}, ${user.location.postcode}</p>
                                <p class="modal-text">Birthday: ${new Date(user.dob.date).toLocaleDateString()}</p>
                            </div>
                        </div>
                    `);
                    document.body.appendChild(modal);
                    document.querySelector('#modal-close-btn').addEventListener('click', () => {
                        modal.remove();
                    });
                });
            });
        } else {
            console.error('Error getting data');
        }
    })
    .catch(error => console.error('Error fetching data:', error));
