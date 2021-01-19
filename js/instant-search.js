function searchFunction() {
    var data=document.getElementById("searchbar").value;
    var search_input = {"filterText": data};
    var jsonObject = JSON.stringify(search_input);
    const xhr = new XMLHttpRequest();

    xhr.addEventListener('readystatechange', function() {
        if (this.readyState === this.DONE) {
            console.log("Response text-> " + this.responseText);
            const responseText = JSON.parse(this.responseText);
            var results = responseText.results;

            const container = document.getElementById("search-results-container");
            while (container.firstChild) {
                container.removeChild(container.lastChild);
            }

            results.forEach(i => {
                const chapter_container = document.createElement("a");
                chapter_container.setAttribute("class", "search-result");
                chapter_container.setAttribute("href", "http://" + i.url);
                container.appendChild(chapter_container);

                let text = `${i.subject} > ${i.chapter_num}`;
                let breadcrumb = document.createElement("div");
                breadcrumb.setAttribute("class", "breadcrumb");
                breadcrumb.appendChild(document.createTextNode(text));
                chapter_container.appendChild(breadcrumb);

                let chapter_name = document.createElement("div");
                chapter_name.setAttribute("class", "chapter-name");

                chapter_name.appendChild(document.createTextNode(i.chapter_name));
                console.log(chapter_name.innerText);
                chapter_container.appendChild(chapter_name);
                
            });  
            
            container.style.display = "flex";
        }
    });
    
    xhr.open('POST', 'https://asia-south1-persistent-java-helloworld.cloudfunctions.net/search-bar')
    xhr.send(jsonObject)
}

window.addEventListener('click', function(e){
    if (!document.getElementById('search-container').contains(e.target)){
    document.getElementById('search-results-container').style.display="none";
  } 
})