
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
})