function renderProducts(productsArray) {

  const container = document.getElementById(
    'productsContainer'
  );

  container.innerHTML = '';


  productsArray.forEach(product => {

    const card = document.createElement('div');

    card.className = 'product-card';

    card.innerHTML = `

      <h3>${product.name}</h3>

      <p><strong>Категория:</strong> ${product.category}</p>

      <p><strong>Размер:</strong> ${product.size}</p>

      <div class="price">
        ${product.price.toLocaleString('ru-RU')} ₽
      </div>
    `;


    card.addEventListener('click', () => {
      renderDetails(product);
    });


    container.appendChild(card);
  });
}


function renderDetails(product) {

  const details = document.getElementById(
    'productDetails'
  );


  details.innerHTML = `

    <div>

      <h1 class="details-title">
        ${product.name}
      </h1>


      <p>
        <strong>Категория:</strong>
        ${product.category}
      </p>


      <p>
        <strong>Размер:</strong>
        ${product.size}
      </p>


      <p>
        <strong>Срок строительства:</strong>
        ${product.duration}
      </p>


      <div class="details-block">

        <h3>Описание</h3>

        <p>
          ${product.description}
        </p>

      </div>


      <div class="details-block">

        <h3>Комплектация</h3>

}
        <p>
          ${product.description}
        </p>

      </div>


      <div class="details-block">

        <h3>Комплектация</h3>

        <div class="details-list">

          ${product.equipment.map(item => `
            <div>• ${item}</div>
          `).join('')}

        </div>

      </div>


      <div class="details-block">

        <h3>Дополнительные опции</h3>

        <div class="options">

          ${options.map(option => `

            <label class="option">

              <span>
                ${option.name}
                (+${option.price.toLocaleString('ru-RU')} ₽)
              </span>

              <input
                type="checkbox"
                value="${option.price}"
                onchange="calculatePrice(${product.price})"
              >

            </label>

          `).join('')}

        </div>

      </div>


      <div class="total-price">

        Итоговая стоимость:

        <span id="finalPrice">
          ${product.price.toLocaleString('ru-RU')}
        </span>

        ₽

      </div>

    </div>
  `;
}