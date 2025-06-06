function redireccionar(ruta) {
    window.location.href = ruta;
}
async function agregar(productId) {
    try {
        const resCart = await fetch('http://localhost:8080/api/carts/');
        if (!resCart.ok) throw new Error('No se pudo obtener el carrito');
        const data = await resCart.json();
        const cartId = data.cartId;

        const resAdd = await fetch(`/api/carts/${cartId}/product/${productId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        });

        if (resAdd.ok) {
        alert('Producto agregado al carrito');
        } else {
        alert('Error al agregar el producto al carrito');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error al agregar el producto al carrito');
    }
}

async function eliminar(productId) {
    try {
        const resCart = await fetch('http://localhost:8080/api/carts/');
        if (!resCart.ok) throw new Error('No se pudo obtener el carrito');
        const data = await resCart.json();
        const cartId = data.cartId;
        
        const resAdd = await fetch(`/api/carts/${cartId}/products/${productId}`, {
        method: 'DELETE',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        });

        if (resAdd.ok) {
            alert('Producto eliminado del carrito');
        } else {
            alert('Error al eliminar el producto del carrito');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error al eliminarr el producto del carrito');
    }
}

async function finalizar(){
    fetch('http://localhost:8080/api/tickets/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include'
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error al generar el ticket');
        }
        return response.json();
    })
    .then(data => {
        alert(data.message);
        redireccionar('/products');
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Error al generar el ticket');
    });
}