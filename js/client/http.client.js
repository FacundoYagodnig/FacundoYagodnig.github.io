class HttpClient {

    async get(url, id){
        try {
            return await fetch(url+(id||'')).then(r => r.json())
            }
        catch(error){
            console.error('ERROR GET', error)
        }
    }

    async post(url, dato){
        try {
            return await fetch(url, {
                method: 'post',
                body: JSON.stringify(dato),
                headers:{'content-type' : 'application/json'}
            }).then(r => r.json())
            }
        catch(error){
            console.error('ERROR POST', error)
        }
    }

    async put(url, id, dato){
        try {
            return await fetch(url+id, {
                method: 'put',
                body: JSON.stringify(dato),
                headers:{'content-type' : 'application/json'}
            })
            .then(r => r.json()) 
        }
        catch(error){
            console.error('ERROR PUT', error)
        }
    }

    async del(url, id){
        try {
            return await fetch(url+id, {method: 'delete',}).then(r => r.json())
        }
        catch(error){
            console.error('ERROR DELETE', error)
        }
    }
}


const http = new HttpClient()
