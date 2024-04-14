// ------------------------ fetch images ------------
fetch('https://192.168.100.9:7096/api/Image/Index')
    .then(response => response.json())
    .then(data => {
        const imageContainer = document.querySelector('.img-container');
        data.forEach(image => {
        //     const imgElement = document.createElement('img');
        //     imgElement.src = image.url;
        //     imageContainer.appendChild(imgElement);
        const pageImageDiv = document.createElement('div');
        pageImageDiv.classList.add('page-image');
        
        const imgElement = document.createElement('img');
        imgElement.classList.add('img');
        imgElement.src = image.url;
        pageImageDiv.appendChild(imgElement);
        
        const button = document.createElement('button');
        button.classList.add('btn', 'btn-secondary', 'my-2', 'my-sm-0');
        button.style.backgroundColor = 'red';
        button.textContent = 'Like';
        pageImageDiv.appendChild(button);
        
        imageContainer.appendChild(pageImageDiv)
    });

    })
    .catch(error => console.error('Hata:', error));






// --------- other functionalis --------------
async function SearchButton(button) {
    var inputValue = button.previousElementSibling.value;

    var response = await fetch('/User/SeacrhImages', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ LikedImageUrl: inputValue })
    });
    if (response.ok) {
        var data = await response.json();
        updatePageContent(data);
    } else {
        console.error('Fetch request failed with status:', response.status);
    }
}

function updatePageContent(data) {
    var content = '<div class="divv" style="margin-top:15px">';

    for (var i = 0; i < data.length; i++) {
        var url = data[i];
        content += '<div class="page-image">';
        content += '<img class="img" src="' + url.Url + '">';
        content += '<button data-state="' + (url.State ? "true" : "false") + '" style="background-color:' + (url.State ? "green" : "red") + '" onclick="toggleLikeState(this,\'' + url.Url + '\')" class="btn btn-secondary my-2 my-sm-0">' + (url.State ? "Like" : "Dislike") + '</button>';
        content += '</div>';
    }

    content += '</div>';
    var resultContainer = document.getElementById('resultContainer');
    console.log(resultContainer);
    if (resultContainer) {
        resultContainer.innerHTML = content;
    }
}