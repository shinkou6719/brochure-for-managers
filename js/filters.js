function filterCategory(category) {

  if (category === 'Все') {

    renderProducts(products);

    return;
  }


  const filtered = products.filter(product => {
    return product.category === category;
  });


  renderProducts(filtered);
}