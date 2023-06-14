let carts = document.querySelectorAll('.botaocomprar');

let products = [
  {
    nome: 'Voo Rio',
    tag: 'brasil',
    preco: 750,
    inCart: 0
  },
  {
    nome: 'Hotel Copacabana',
    tag: 'hotelrio',
    preco: 100,
    inCart: 0
  },
  {
    nome: 'Voo Luanda',
    tag: 'luanda',
    preco: 800,
    inCart: 0
  },
  {
    nome: 'Hotel Lobito',
    tag: 'hoteluanda',
    preco: 80,
    inCart: 0
  }
];

for (let i = 0; i < carts.length; i++) {
  carts[i].addEventListener('click', () => {
    cartNumbers(products[i]);
    totalCost(products[i]);
  });
}

function onLoadCartNumbers() {
  let productNumbers = localStorage.getItem('cartNumbers');
  if (productNumbers) {
    document.getElementById('cartQuantity').textContent = productNumbers;
    document.querySelector('.cart span').textContent = productNumbers;
  }
  updateCartQuantity();
}
function updateCartQuantity() {
  let cartItems = localStorage.getItem('productsInCart');
  cartItems = JSON.parse(cartItems);

  // Calcular a quantidade total de itens no carrinho
  let totalQuantity = 0;
  if (cartItems) {
    Object.values(cartItems).forEach((item) => {
      totalQuantity += item.inCart;
    });
  }

  // Atualizar a contagem de itens no cabeçalho
  document.getElementById('cartQuantity').textContent = totalQuantity;
}

function cartNumbers(product) {
  let productNumbers = localStorage.getItem('cartNumbers');

  productNumbers = parseInt(productNumbers);

  if (productNumbers) {
    localStorage.setItem('cartNumbers', productNumbers + 1);
    document.getElementById('cartQuantity').textContent = productNumbers + 1;
    document.querySelector('.cart span').textContent = productNumbers + 1;
  } else {
    localStorage.setItem('cartNumbers', 1);
    document.getElementById('cartQuantity').textContent = 1;
    document.querySelector('.cart span').textContent = 1;
  }
  setItems(product);
  updateCartQuantity(); 
}

function setItems(product) {
  let cartItems = localStorage.getItem('productsInCart');
  cartItems = JSON.parse(cartItems);

  if (cartItems != null) {
    if (cartItems[product.tag] == undefined) {
      cartItems = {
        ...cartItems,
        [product.tag]: product
      };
    }
    cartItems[product.tag].inCart += 1;
  } else {
    product.inCart = 1;
    cartItems = {
      [product.tag]: product
    };
  }

  localStorage.setItem('productsInCart', JSON.stringify(cartItems));
}

function totalCost(product) {
  let cartCost = localStorage.getItem('totalCost');

  if (cartCost != null) {
    cartCost = parseInt(cartCost);
    localStorage.setItem('totalCost', cartCost + product.preco);
  } else {
    localStorage.setItem('totalCost', product.preco);
  }
}
function removeItem(tag) {
  let cartItems = localStorage.getItem('productsInCart');
  let cartCost = localStorage.getItem('totalCost');
  cartItems = JSON.parse(cartItems);

  // Verificar se o produto está no carrinho
  if (cartItems && cartItems[tag]) {
    // Reduzir a quantidade do produto
    cartItems[tag].inCart -= 1;

    // Remover o produto se a quantidade for zero
    if (cartItems[tag].inCart === 0) {
      delete cartItems[tag];
    }
  }

  // Atualizar o custo total
  cartCost -= products.find((product) => product.tag === tag).preco;

  // Atualizar os itens do carrinho no armazenamento local
  localStorage.setItem('productsInCart', JSON.stringify(cartItems));
  localStorage.setItem('totalCost', cartCost);
}

function displayCart() {
  let cartItems = localStorage.getItem('productsInCart');
  let cartCost = localStorage.getItem('totalCost');
  cartItems = JSON.parse(cartItems);
  let productContainer = document.querySelector('.products');

  if (cartItems && productContainer) {
    productContainer.innerHTML = '';
    Object.values(cartItems).map(item => {
      productContainer.innerHTML += `
<table>
        <tr>
            <th>
                <div class="product" style="width: 100%">
                     <ion-icon class="close-icon" name="close-circle"></ion-icon>
                    <img src="../images/${item.tag}.png">
                    <span>${item.nome}</span>
                </div>
            </th>
            <th class="preço" style="padding:40px">
                <div class="price">${item.preco}</div>
            </th>
            <th class="quantidade"style="width: 100%">
                <div class="quantity">
                    
                    <span>${item.inCart}</span>
                    
                </div>
            </th>
            <th class="TOTAL" style="padding:10px">
                <div class="total">
                    $${item.inCart * item.preco},00
                </div>
            </th>
        </tr>
    </table>
      `;
    });
	
    productContainer.innerHTML += `
      <div class="basketTotalContainer">
        <h4 class="basketTotalTitle">
          Basket total
        </h4>
        <h4 class="basketTotal">
          $${cartCost},00
        </h4>
      </div>
    `;
  }
  let removeButtons = document.querySelectorAll('.product ion-icon[name="close-circle"]');

  // Adicionar um event listener para cada botão de remoção
  removeButtons.forEach((button) => {
    button.addEventListener('click', () => {
      // Obter a tag do produto a ser removido
      let tag = button.parentElement.querySelector('img').getAttribute('src');
      tag = tag.substring(tag.lastIndexOf('/') + 1, tag.lastIndexOf('.'));

      // Remover o produto do carrinho
      removeItem(tag);

      // Atualizar a exibição do carrinho
      displayCart();

      // Atualizar a contagem de itens no cabeçalho
      updateCartQuantity();
    });
  });
}
function removeItem(tag) {
  let cartItems = localStorage.getItem('productsInCart');
  let cartCost = localStorage.getItem('totalCost');
  cartItems = JSON.parse(cartItems);

  // Verificar se o produto está no carrinho
  if (cartItems && cartItems[tag]) {
    // Reduzir a quantidade do produto
    cartItems[tag].inCart -= 1;

    // Remover o produto se a quantidade for zero
    if (cartItems[tag].inCart === 0) {
      delete cartItems[tag];
    }
  }

  // Atualizar o custo total
  cartCost -= products.find((product) => product.tag === tag).preco;

  // Atualizar os itens do carrinho no armazenamento local
  localStorage.setItem('productsInCart', JSON.stringify(cartItems));
  localStorage.setItem('totalCost', cartCost);
  updateCartQuantity();
}

onLoadCartNumbers();
displayCart();