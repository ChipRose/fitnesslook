const buttonNewLocation = document.querySelector('#button-new-location');
const formBlock = document.querySelector('#form-communicate');



buttonNewLocation.addEventListener('click',()=>{
  formBlock.classList.toggle('form-communicate--open');
  console.log('click');
})
