// Add list container to app
const header = addToElementbyId('header', 'app-header', app);
const articleList = addToElementbyId('div', 'article-list', app);

deliveryClient
  .items()
  .type('conference')
  .languageParameter('czech')
  .toPromise()
  .then((response) => {
    // Print data
    console.log(response);

    const pageTitle = createElement(
      'h1',
      '',
      'innerText',
      response.data.items[0].elements.name.value
    );

    const headerSummary = createElement(
      'p',
      '',
      'innerText',
      response.data.items[0].elements.summary__auto_generated__tbc__content
        .value
    );
    header.append(pageTitle, headerSummary);
  })
  .catch((err) => {
    reportErrors(err);
  });

// Call for a list of all articles
deliveryClient
  .items()
  .type('event')
  .toPromise()
  .then((response) => {
    // Print data
    console.log(response);

    response.data.items.forEach((item) => {
      // Create nodes
      const card = createElement('div', 'card');
      card.classList.add('conference');
      const link = createElement(
        'a',
        'button',
        'href',
        './location.html#' + item.elements.location_url.value
      );

      // const register = createElement(
      //   'a',
      //   'link',
      //   'href',
      //   './register.html#' + item.elements.location_url.value
      // );

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
        'Date: ' + new Date(item.elements.start_date.value)
      );

      const venue = createElement(
        'p',
        'article-title',
        'innerText',
        'Venue: ' + item.elements.venue.linkedItems[0].elements.venue_name.value
      );

      const linkAgenda = document.createTextNode('View Event');
      // const linkRegister = document.createTextNode("Register Now (coming soon)");

      // Add nodes to DOM
      articleList.appendChild(card);
      // card.appendChild(link);
      // link.append(title, startDate, venue, conferenceCTA);
      link.appendChild(linkAgenda);
      // register.appendChild(linkRegister);
      card.append(title, startDate, venue, link);
    });
  })
  .catch((err) => {
    reportErrors(err);
  });
