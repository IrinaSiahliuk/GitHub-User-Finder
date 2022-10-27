let inputName = document.querySelector('#inputName');
let userInfoWrapper = document.querySelector('.userInfoWrapper');

inputName.addEventListener('keyup', function(event){
    if(event.target.value.trim()){
        let userInfo = getUser(event.target.value.trim());
        userInfo.then((data) => {
            let userPhoto = document.querySelector('.userPhoto');
            let userData = document.querySelector('.userData');

            userPhoto.innerHTML = `<img src="${data.avatar_url}">`;
            userData.innerHTML = `
            <li>Name: ${data.name}</li>
            <li>Bio: ${data.bio}</li>
            <li>Location: ${data.location}</li>
            <li>Company: ${data.company}</li>
            <li>Followers: ${data.followers}</li>
            `;
        });
    }
});

async function getUser(user){
    let response = await fetch(`https://api.github.com/users/${user}`);
    console.log(response.ok);
    if(!response.ok) {
        console.log('Такой пользователь не найден');
        userInfoWrapper.style.display = "none";
        return;
    }
    
    let data = await response.json();
    userInfoWrapper.style.display = "flex";
    return data;
};