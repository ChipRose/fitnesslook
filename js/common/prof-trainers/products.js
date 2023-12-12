import { formatPrice } from "./util.js";

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
    productFull.querySelector('.product-gallery-set__slider').id = `product-list-${product.id}`;
    productFull.querySelector('#gallery-cover').src = product.cover?.image;
    productFull.querySelector('#title-icon-text').textContent = product.type;

    productsFragment.appendChild(productFull);

    product.content.forEach((item) => {
      const productContent = productContentTemplate.cloneNode(true);

      productContent.querySelector('.product-card__title').textContent=item.name;
      productContent.querySelector('.product-card__extra-name').textContent=item.name_add;
      productContent.querySelector('.product-img').src=item.picture;
      productContent.querySelector('.product-img').alt=item.name;
      productContent.querySelector('.product-card__button').href=item.full_url;
      // productContent.querySelector('#product-img').srcset=item.image2x;
      // productContent.querySelector('#product-img-webp').srcset=item.imageWebp;
      if(item.list_price!=0) productContent.querySelector('.price--old').textContent=formatPrice(item.list_price);
      productContent.querySelector('.price--new').textContent=`${formatPrice(item.Price)} ₽`;
      productContentFragment.appendChild(productContent);
    })

    const productsContent = productFull.querySelector('.products-content');
    // productsContent.id=`product-list-${product.id}`;
    productsContent.appendChild(productContentFragment);


  })

  productsGallery.appendChild(productsFragment);

}

export { renderProductsGallery }
