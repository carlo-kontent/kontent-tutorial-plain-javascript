// Reload page on hash change
const renderHash = () => {
  window.history.go();
};
window.addEventListener('hashchange', renderHash, false);

// Define which article is being retrieved
const articleSlug = location.hash.slice(1);

// Create article container
const articleContainer = addToElementbyId('div', 'article-width', app);

// Call for article info
deliveryClient
  .items()
  .type('venue')
  .depthParameter(2)
  .equalsFilter('elements.venue_url_slug', articleSlug)
  .queryConfig({
    urlSlugResolver: (link, context) => {
      return resolveUrl(link);
    },
    richTextResolver: (item, context) => {
      return resolveLinkedItems(item);
    },
  })
  .toPromise()
  .then((response) => {
    console.log(response);

    // Check if article found before adding
    const article =
      response.data.items && response.data.items.length
        ? response.data.items[0]
        : undefined;

    // 404 message if not found
    if (!article) {
      app.innerHTML = '<p>That article could not be found.</p>';
      return;
    }

    // Update title
    document.title = `Venue | ${article.system.name}`;

    // Transform image
    const transformedImageUrl = Kk.transformImageUrl(
      article.elements.venue_asset.value[0].url
    )
      .withDpr(2)
      .withCompression('lossless')
      .withHeight(300)
      .withWidth(300)
      .getUrl();

    // Create nodes
    const headerImage = createElement(
      'img',
      'article-header',
      'src',
      transformedImageUrl
    );

    const title = createElement(
      'h2',
      'article-title',
      'innerText',
      article.elements.venue_name.value
    );

    const address = createElement(
      'p',
      'article-title',
      'innerText',
      article.elements.address__address_line_1.value +
        article.elements.address__address_line_2.value +
        article.elements.address__city.value +
        ' ' +
        article.elements.address__country.value +
        article.elements.address__postcode.value
    );

    const room = createElement(
      'p',
      'article-title',
      'innerText',
      'Room: ' + article.elements.room_location.value
    );

    const summary = createElement(
      'p',
      'article-title',
      'innerText',
      article.elements.summary__auto_generated__tbc__content.value
    );

    // Add nodes to DOM
    articleContainer.classList.add('card');
    articleContainer.append(headerImage, title, address, room, summary);
    return;
  })
  .catch((err) => {
    reportErrors(err);
  });
