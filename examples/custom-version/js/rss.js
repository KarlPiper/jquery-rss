var feedSelector = '#feed-main';
var feedObject = $(feedSelector);
var feedInactive = $('#feed-overflow');
var dateNow = new Date();
var inactiveFeedCount = 0;

function isOld(datePublished) {
	var diff = dateNow - datePublished;
	if (diff > 2.628e+9) {
		if (inactiveFeedCount === 0) {
			feedInactive.show();
			inactiveFeedCount++;
		}
		return true;
	}
}

function addFeed(url, name, filter) {
	if (typeof name === 'undefined' || name === '' || name === null) { //check for custom name
		var name = url.replace(/https?:\/\/((blog|www|feeds|feed|rss)\.)?/, '').split('.')[0].toUpperCase();
	}
	if (typeof filter !== 'undefined') { //check for filter
		feedObject.rss(url, {
			effect: 'slideFastSynced',
			limit: 8,
			filterLimit: 4,
			filter: function (entry, tokens) {
				return tokens.title.indexOf(filter) < 0;
			},
			onData: function () {
				$(feedSelector + ' ul:last-child').prepend('<h2>' + name + '</h2>');
				if (isOld(new Date($(this)[0].entries[0].publishedDate))) {
					$(feedSelector + ' ul:last-child').appendTo(feedInactive);
				}
			}
		});
	} else { //default
		feedObject.rss(url, {
			effect: 'slideFastSynced',
			onData: function () {
				$(feedSelector + ' ul:last-child').prepend('<h2>' + name + '</h2>');
				if (isOld(new Date($(this)[0].entries[0].publishedDate))) {
					$(feedSelector + ' ul:last-child').appendTo(feedInactive);
				}
			}
		});
	}
}

addFeed('https://www.caseyliss.com/rss');
addFeed('https://www.theverge.com/web/rss/index.xml', 'THEVERGE—WEB');
addFeed('http://blog.brackets.io/feed');
