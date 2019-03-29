$(document).ready(() => {

    if(document.getElementById("make-comment")){
    document.getElementById("make-comment").addEventListener("click",  function() {
        let comment = document.getElementById("comments-input").value
        let id = this.getAttribute("data-id")
        
        $.ajax({
            method: "POST",
            url: `/articles/${id}`,
            data: {
                body: comment
            }
        }).then(() => {

            location.reload()

        })

    })
}
else{

    const article = document.getElementsByClassName("view-comments")
    for (let i = 0; i < article.length; i++) {
        article[i].addEventListener("click", function() {

            id = this.getAttribute("data-id")

            $.ajax({
                method: "GET",
                url: `/articles/${id}`
            })
        })

    }
}
})