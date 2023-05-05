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
  .type('presentation_details')
  .equalsFilter('elements.url_pattern', articleSlug)
  .depthParameter(2)
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
    document.title = `Article | ${article.system.name}`;

    // Transform image
    const transformedImageUrl = Kk.transformImageUrl(
      article.elements.presentation_body.linkedItems[0].elements.hero_asset
        .value[0].url
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
      article.elements.presentation_body.linkedItems[0].elements.title.value
    );

    console.log(article);

    const richTextElement =
      article.elements.presentation_body.linkedItems[0].elements.summary;

    const rteResolver = Kk.createRichTextHtmlResolver().resolveRichText({
      element: richTextElement,
      linkedItems: Kk.linkedItemsHelper.convertLinkedItemsToArray(
        article.elements.presentation_body.linkedItems[0].elements.summary
          .linkedItems
      ),
      urlResolver: (linkId, linkText, link) => {
        // Set link based on type
        const urlLocation =
          link.type === 'article'
            ? `article.html#${link.urlSlug}`
            : link.type === 'coffee'
            ? `coffee.html#${link.urlSlug}`
            : 'unsupported-link';
        return { linkUrl: urlLocation };
      },
      contentItemResolver: (item) => {
        if (
          article.elements.presentation_body.linkedItems[0].elements.summary
            .linkedItems[0].system.type === 'image'
        ) {
          return {
            contentItemHtml: `<img class="img-inline" src="${article.elements.presentation_body.linkedItems[0].elements.summary.linkedItems[0].elements.asset.value[0].url}" />`,
          };
        }
      },
    });

    const body = createElement(
      'div',
      'article-description',
      'innerHTML',
      rteResolver.html
    );

    // Add nodes to DOM
    articleContainer.classList.add('card');
    articleContainer.append(headerImage, title, body);
    return;
  })
  .catch((err) => {
    reportErrors(err);
  });
