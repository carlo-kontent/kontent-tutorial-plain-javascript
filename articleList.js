// Add list container to app
const articleList = addToElementbyId('div', 'article-list', app);

// Define which conference is being retrieved
const conferenceSlug = location.hash.slice(1);

var conferenceCollection = '';

if (conferenceSlug == 'brno-event-2023') {
  conferenceCollection = 'denver';
} else {
  conferenceCollection = 'denver_events';
}

// Call for a list of all articles
deliveryClient
  .items()
  .equalsFilter('system.collection', conferenceCollection)
  .depthParameter(2)
  .type('agenda')
  .toPromise()
  .then((response) => {
    // Print data
    // console.log(response)
    console.log(response.data.items[0].elements.presentations.linkedItems);

    response.data.items[0].elements.presentations.linkedItems.forEach(
      (item) => {
        // Create nodes
        const card = createElement('div', 'card');
        card.classList.add('card--fullwidth');

        const cardHeader = createElement('div', '');
        cardHeader.classList.add('card--header');

        const cardSpeaker = createElement('div', '');
        cardSpeaker.classList.add('card--speaker');

        const link = createElement(
          'a',
          'button',
          'href',
          './article.html#' + item.elements.url_pattern.value
        );

        const speakerLink = createElement(
          'a',
          'speaker-link',
          'href',
          './speaker.html#' +
            item.elements.speakers.linkedItems[0].elements.speaker_url.value
        );

        //   // Transform image
        let transformedImageUrl = null;
        if (
          item.elements.presentation_body.linkedItems[0].elements.hero_asset
            .value.length
        ) {
          transformedImageUrl = Kk.transformImageUrl(
            item.elements.presentation_body.linkedItems[0].elements.hero_asset
              .value[0].url
          )
            .withDpr(2)
            .withCompression('lossless')
            .withHeight(100)
            .withWidth(100)
            .getUrl();
        }

        const teaser = createElement(
          'img',
          'agenda-teaser',
          'src',
          item.elements.presentation_body.linkedItems[0].elements.hero_asset
            .value[0].url &&
            item.elements.presentation_body.linkedItems[0].elements.hero_asset
              .value[0].url.length
            ? item.elements.presentation_body.linkedItems[0].elements.hero_asset
                .value[0].url + '?w=500&h=500'
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
          item.elements.presentation_body.linkedItems[0].elements
            .summary__auto_generated__tbc__content.value
        );

        const speaker = createElement(
          'p',
          'speaker',
          'innerText',
          item.elements.speakers.linkedItems[0].elements.fullname.value
        );

        const startDate = createElement(
          'p',
          'article-title',
          'innerText',
          'Date and Time: ' + new Date(item.elements.date_and_time.value)
        );

        const jobTitle = createElement(
          'p',
          'job-title',
          'innerText',
          ' | ' + item.elements.speakers.linkedItems[0].elements.job_title.value
        );

        const avatar = createElement(
          'img',
          'avatar',
          'src',
          item.elements.speakers.linkedItems[0].elements.avatar.value[0].url +
            '?w=100&h=100'
        );

        const linkAgenda = document.createTextNode('View Presenation');

        const speakerLinkText = document.createTextNode(' | View Bio');

        // Add nodes to DOM
        articleList.appendChild(card);
        link.appendChild(linkAgenda);
        card.append(cardHeader);
        cardHeader.append(teaser, title);
        card.append(description, startDate);
        card.append(cardSpeaker);
        cardSpeaker.append(avatar, speaker, jobTitle, speakerLink);
        speakerLink.appendChild(speakerLinkText);
        card.append(link);
      }
    );
  })
  .catch((err) => {
    reportErrors(err);
  });
