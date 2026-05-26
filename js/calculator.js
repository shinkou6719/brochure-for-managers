function calculatePrice(basePrice) {

  let total = basePrice;


  const checkboxes = document.querySelectorAll(
    '.option input[type="checkbox"]'
  );


  checkboxes.forEach(checkbox => {

    if (checkbox.checked) {

      total += Number(checkbox.value);

    }
  });


  document.getElementById('finalPrice').innerText =
    total.toLocaleString('ru-RU');
}