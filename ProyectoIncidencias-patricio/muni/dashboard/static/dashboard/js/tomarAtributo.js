


function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue; 
}


function tomarAtributo() {
    const titulo = document.getElementById('titulo').value;
    const nombree = document.getElementById('nombree').value;
    const opcion = document.getElementById('opcion').value;
    
    console.log(titulo);
    console.log(nombree); 
    console.log(opcion); 
    
   
    
    
    
    //el fetch enviara los datos a la vista 'crear_atributo'
    fetch(urlCrearAtributo, {
        method: 'POST',
        body: JSON.stringify({titulo: titulo, nombree: nombree,opcion:opcion }),
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': getCookie('csrftoken')
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error en la respuesta del servidor: ' + response.statusText);
        }
            return response.json();
        })
    .then(data => {
        console.log('Atributo creado:', data);
    })
    .catch(error => console.error('Error:', error));
    

}

window.tomarAtributo=tomarAtributo;

