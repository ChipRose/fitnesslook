const productFullTemplate = document.querySelector("#products-full").content.querySelector('.product-gallery-set');
const productContentTemplate = document.querySelector("#products-content").content.querySelector('.product-card');

const productsGallery = document.querySelector('#hit-products');

const renderProductsGallery = (products) => {
  const productsFragment = document.createDocumentFragment();
  const productContentFragment = document.createDocumentFragment();

  products.forEach((product) => {
    const productFull = productFullTemplate.cloneNode(true);

    productFull.querySelector('.title-info').textContent = `Хиты продаж: ${product.type}`;
    productFull.querySelector('.product-gallery-set__buttons').id = `product-list-buttons-${product.id}`;

    productsFragment.appendChild(productFull);

    product.content.forEach((item) => {
      const productContent = productContentTemplate.cloneNode(true);

      productContent.querySelector('.product-card__title').textContent=item.title;
      productContent.querySelector('#product-img').src=item.image;
      productContent.querySelector('#product-img').alt=item.title;
      productContent.querySelector('#product-img').srcset=item.image2x;
      productContent.querySelector('#product-img-webp').srcset=item.imageWebp;
      productContent.querySelector('.price--old').textContent=item.oldPrice;
      productContent.querySelector('.price--new').textContent=`${item.newPrice} ₽`;
      productContentFragment.appendChild(productContent);
    })

    const productsContent = productFull.querySelector('.products-content');
    productsContent.id=`product-list-${product.id}`;
    productsContent.appendChild(productContentFragment);


  })

  productsGallery.appendChild(productsFragment);

}

export { renderProductsGallery }
