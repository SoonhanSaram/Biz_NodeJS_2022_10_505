document.addEventListener("DOMContentLoaded", () => {
    const btnModify = document.querySelector("button.product.update")
    const btnDelete = document.querySelector("button.product.delete")
    const buttonBox = document.querySelector("article.detail.button")

    // btnModify?.addEventListener("click", (tag) => {
    //     const target = tag.target
    //     const parentTag = target.closest("ARTICLE")
    //     const pcode = parentTag.dataset?.p_code

    //     document.location.href = `/product/add/${pcode}`
    // })

    // btnDelete?.addEventListener("click", () => {
    //     const target = tag.target
    //     const parentTag = target.closest("ARTICLE")
    //     const pcode = parentTag.dataset?.p_code

    //     confirm(`삭제하시겠습니까?`) {
    //        return false
    //     }
    //     document.location.href = `/product/delete/${pcode}`

    // })

    buttonBox?.addEventListener("click", (tag)=> {
        const button = tag.target
        if (button.tagName ==="BUTTON") {
            const pcode = button.closest("ARTICLE").dataset.p_code
            let url = "/product"
            const classList = Array.from(button.classList)
            if(classList.indexOf("update") > 0) {
                url += `/add/${pcode}`
                document.location.href = url
            } else if (classList.indexOf("delete") > 0) {
                if(!confirm("삭제하시겠습니까?")) {
                    return false
                }
                url += `/delete/${pcode}`
                document.location.href=url
            }
        }
    })
})