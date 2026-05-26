renderProducts(products);


const searchInput = document.getElementById(
  'searchInput'
);


searchInput.addEventListener('input', (event) => {

  const value = event.target.value.toLowerCase();


  const filteredProducts = products.filter(product => {

    return (
      product.name.toLowerCase().includes(value)
    );
  });


  renderProducts(filteredProducts);
});