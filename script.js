

document.addEventListener('DOMContentLoaded', () => {
    var containers = document.getElementById("posts");
    if (!containers) {
      console.error('Element with id "posts" not found in the HTML document.');
      return;
    }
  
    fetch('db.json')
      .then(response => response.json())
      .then(data => {
        var container = document.createElement('div');
        container.className = 'contain'
        var jsondb = data["posts"].reverse();
  
        jsondb.forEach(item => {
          const like = document.createElement("span")
          const likes = document.createElement("span")
          const share = document.createElement("span")
          like.className = "material-symbols-outlined";
          share.className = "material-symbols-outlined";
          likes.className = "count";
          like.textContent = "favorite";
          share.textContent = "share";
          var pages = document.createElement('div');
          pages.className = "pages"
          const h3 = document.createElement('h3');
          const img = document.createElement('img');
          const desc = document.createElement('p');
          h3.textContent = item.title;
          img.src = item.img;
          desc.textContent = item.desc;
          likes.textContent = item.likes
          container.appendChild(h3);
          container.appendChild(img);
          container.appendChild(desc);
          pages.appendChild(like)
          pages.appendChild(likes)
          pages.appendChild(share)
          container.appendChild(pages)
          container.id = item.title
          share.addEventListener('click',()=>{
            window.location.href = "whatsapp://send?text="+ item.title + " Poster Has been Uploaded On Nss Blog  . check it out https://nss-hmyhss.web.app "
          })
          like.addEventListener('click',()=>{
            var liked = localStorage.getItem(item.title)
            if(liked){
              like.style.color = "red"
            }else{
              like.style.color = "red"
              localStorage.setItem(item.title,true)
            }
          })
        });
  
        containers.appendChild(container);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  });
  