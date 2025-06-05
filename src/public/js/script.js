function irAlCarrito() {
    window.location.href = '/carts/';
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
        console.log("test /api/carts/"+ cartId + "/product/" + productId);
        const resAdd = await fetch(`/api/carts/${cartId}/product/${productId}`, {
        method: 'DELETE',
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