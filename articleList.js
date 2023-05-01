// Add list container to app
const articleList = addToElementbyId('div', 'article-list', app);

// Define which conference is being retrieved
const conferenceSlug = location.hash.slice(1);

var conferenceCollection = ''

if (conferenceSlug == 'brno-event-2023') {
  conferenceCollection = 'denver'
} else {
  conferenceCollection = 'denver_events'
}

// Call for a list of all articles
deliveryClient
  .items()
  .equalsFilter('system.collection', conferenceCollection)
  .type('presentation_details')
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
        './article.html#' + item.elements.url_pattern.value
      );

    //   // Transform image 
    let transformedImageUrl = null;
    if (item.elements.presentation_body.linkedItems[0].elements.hero_asset.value.length) {
      transformedImageUrl = Kk.transformImageUrl(item.elements.presentation_body.linkedItems[0].elements.hero_asset.value[0].url).withDpr(2)
        .withCompression('lossless')
        .withHeight(100)
        .withWidth(100)
        .getUrl();
    }

    const teaser = createElement(
      'img',
      'article-teaser',
      'src',
      item.elements.presentation_body.linkedItems[0].elements.hero_asset.value[0].url && item.elements.presentation_body.linkedItems[0].elements.hero_asset.value[0].url.length
      ? item.elements.presentation_body.linkedItems[0].elements.hero_asset.value[0].url + '?w=500&h=500'
      : undefined
      );
      
      const title = createElement(
        'h2',
        'article-title',
        'innerText',
        item.elements.presentation_body.linkedItems[0].elements.title.value
      );

      const description = createElement(
        'div',
        'article-description',
        'innerHTML',
        item.elements.presentation_body.linkedItems[0].elements.summary__auto_generated__tbc__content
        .value
      );

      // Add nodes to DOM
      articleList.appendChild(card);
      card.appendChild(link);
      link.append(teaser, title, description);
    });
  })
  .catch(err => {
    reportErrors(err);
  });
