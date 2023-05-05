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
  projectId: 'ba368ef4-c1b0-022e-1dbb-673e3cd76b71',

  previewApiKey:
    'ew0KICAiYWxnIjogIkhTMjU2IiwNCiAgInR5cCI6ICJKV1QiDQp9.ew0KICAianRpIjogIjFhZGY5N2JkM2ZmMTRiMGI5ZDc2NzllNDA5MjhkMmQ1IiwNCiAgImlhdCI6ICIxNjgwMDY5ODk0IiwNCiAgImV4cCI6ICIxNzExNjkyMjQwIiwNCiAgInZlciI6ICIyLjAuMCIsDQogICJzY29wZV9pZCI6ICJkNGJkMjg2YzliOWI0ZmNiYTI2OGQyZGI3NTk1ZGY0MyIsDQogICJwcm9qZWN0X2NvbnRhaW5lcl9pZCI6ICI0ZjgzMGVlZGEyOGEwMmY1NzYzZjRkZWRmNDJjNzdkZCIsDQogICJhdWQiOiAiZGVsaXZlci5rb250ZW50LmFpIg0KfQ.BBe9NnG50c3lwu1drM94XGKRMMkJGh-6coGtX_TDgwc',
  defaultQueryConfig: {
    usePreviewMode: true, // Queries the Delivery Preview API.
  },
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
const reportErrors = (err) => {
  console.error(err);
  app.innerHTML = `<p>An error occured 😞:</p><p><i>${err}</i></p>`;
};

KontentSmartLink.initialize({
  defaultDataAttributes: {
    projectId: 'ba368ef4-c1b0-022e-1dbb-673e3cd76b71',
    languageCodename: 'English',
  },
  queryParam: null,
});
