// Add list container to app
const articleList = addToElementbyId('div', 'article-list', app);

// Call for a list of all articles
deliveryClient
  .items()
  .type('event')
  .toPromise()
  .then(response => {

    // Print data
    console.log(response)

    response.data.items.forEach(item => {
      // Create nodes
      const card = createElement('div', 'card');
      card.classList.add('card-no-link-style');
      const link = createElement(
        'a',
        'link',
        'href',
        './location.html#' + item.elements.location_url.value
      );

      const title = createElement(
        'h2',
        'article-title',
        'innerText',
        item.elements.title.value
      );

      const startDate = createElement(
        'p',
        'article-title',
        'innerText',
        new Date(item.elements.start_date.value)
      );      

      const venue = createElement(
        'p',
        'article-title',
        'innerText',
        item.elements.venue.linkedItems[0].elements.venue_name.value
      );

      // Add nodes to DOM
      articleList.appendChild(card);
      card.appendChild(link);
      link.append(title, startDate, venue);
    });
  })
  .catch(err => {
    reportErrors(err);
  });
