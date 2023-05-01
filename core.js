// Define main container
const app = document.getElementById('app');

// Function for creating and appending elements
const addToElementbyId = (elementType, id, parent) => {
  const element = document.createElement(elementType);
  element.setAttribute('id', id);
  parent.appendChild(element);
  return element;
};

// Set up Kontent delivery
const Kk = window['kontentDelivery'];
const deliveryClient = new Kk.createDeliveryClient({
  // projectId: 'a5a0d173-7f3b-0025-b24d-3b3c578b0051'
  projectId: 'ba368ef4-c1b0-022e-1dbb-673e3cd76b71'
});

// Function for adding elements to DOM with specific attributes
const createElement = (elementType, classToAdd, attribute, attributeValue) => {
  const element = document.createElement(elementType);
  element.setAttribute('class', classToAdd);

  // Set attribute value based on the attribute required
  attribute === 'href'
    ? (element.href = attributeValue)
    : attribute === 'innerHTML'
    ? (element.innerHTML = attributeValue)
    : attribute === 'innerText'
    ? (element.innerText = attributeValue)
    : attribute === 'src'
    ? (element.src = attributeValue)
    : undefined;

  return element;
};

// Error messages
const reportErrors = err => {
  console.error(err);
  app.innerHTML = `<p>An error occured 😞:</p><p><i>${err}</i></p>`;
};
