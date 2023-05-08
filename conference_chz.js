// Add list container to app
const header = addToElementbyId('header', 'app-header', app);
const articleList = addToElementbyId('div', 'article-list', app);
const footer = addToElementbyId('div', 'app-footer', app);

deliveryClient
  .items()
  .type('conference')
  .languageParameter('czech')
  .depthParameter(2)
  .toPromise()
  .then((response) => {
    // Print data
    // console.log(response);

    articleList.dataset.kontentItemId = '9e9ee86a-9e08-4be7-b7a2-80de431c3620';
    articleList.dataset.kontentElementCodename = 'content';

    // console.log(articleList.dataset.kontentElementId);

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

    const sponsorTitle = createElement('h3', '', 'innerText', 'Our Sponsors');

    const conferenceImg = createElement(
      'img',
      'sponsor-logo',
      'src',
      response.data.items[0].elements.conference_logo.linkedItems[0].elements
        .asset.value[0].url
    );

    const sponsorImg = createElement(
      'img',
      'sponsor-logo',
      'src',
      response.data.items[0].elements.conference_sponsors.linkedItems[0]
        .elements.sponsor_logo.value[0].url
    );

    const sponsorsName = document.createTextNode(
      response.data.items[0].elements.conference_sponsors.linkedItems[0]
        .elements.name.value
    );

    const sponsorsLink = createElement(
      'a',
      'sponsor-link',
      'href',
      'http://' +
        response.data.items[0].elements.conference_sponsors.linkedItems[0]
          .elements.name.value
    );

    sponsorsLink.appendChild(sponsorsName);

    header.append(conferenceImg, pageTitle, headerSummary);

    footer.append(sponsorTitle, sponsorsLink);
    sponsorsLink.append(sponsorImg, sponsorsName);
  })
  .catch((err) => {
    reportErrors(err);
  });

// Call for a list of all articles
deliveryClient
  .items()
  .type('event')
  .depthParameter(2)
  .toPromise()
  .then((response) => {
    // Print data
    // console.log(response);

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
        'a',
        'button',
        'href',
        './venue.html#' +
          item.elements.venue.linkedItems[0].elements.venue_url_slug.value
      );

      const linkAgenda = document.createTextNode('View Agenda');
      const linkVenue = document.createTextNode('Venue Info');

      // Add nodes to DOM
      articleList.appendChild(card);
      link.appendChild(linkAgenda);
      venue.appendChild(linkVenue);
      card.append(title, startDate, link, venue);
    });
  })
  .catch((err) => {
    reportErrors(err);
  });
