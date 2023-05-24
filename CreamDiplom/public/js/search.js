//получать инфу из поля
//ссылка на это поле поиска
const search = document.querySelector('header input')

window.addEventListener('keydown',async (event)=>{
    if(event.key == 'Enter' && search.value != "" && search == document.activeElement){
        let searchText = search.value
        const result = await fetch('http://localhost:7000/api/cream-items/search', {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({search: searchText})
        }).then(res => {return res.json() })
            .then(data => {
                console.log(data)
            })
    }
})