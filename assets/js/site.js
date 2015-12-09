var dataUrl = 'https://hearthstonejson.com/json/AllSets.json';

// Example Card Image: http://wow.zamimg.com/images/hearthstone/cards/enus/EX1_066.png
var imageUrlPrefix = 'http://wow.zamimg.com/images/hearthstone/cards/enus/original/';
var imageUrlExtension = '.png';

// Example Gold Card Image: http://wow.zamimg.com/images/hearthstone/cards/enus/animated/EX1_066_premium.gif
var goldImageUrlPrefix = 'http://wow.zamimg.com/images/hearthstone/cards/enus/animated/';
var goldImageUrlExtension = '_premium.gif';

$.ajax({
	dataType: 'json',
	url: dataUrl,
	success: function (data) {
		var cards = processCardData(data);
		renderCardList(cards);
	}
});

function processCardData (data) {
	var cards = [];
	$.each(data, function (setName, set) {
		$.each(set, function (index, card) {
			if (!card.hasOwnProperty('set')) {
				card.set = setName;
				cards.push(card);
			}
		})
	});
	return cards;
}

function renderCardList (cards) {
	$.each(cards, function (index, card) {
		if (card.hasOwnProperty('collectible') && card.hasOwnProperty('type') && card['type'].toLowerCase() !== 'hero') {
			var set = card.hasOwnProperty('set') ? card['set'] : '';
			var name = card.hasOwnProperty('name') ? card['name'] : '';
			var rarity = card.hasOwnProperty('rarity') ? card['rarity'] : '';
			var type = card.hasOwnProperty('type') ? card['type'] : '';
			var race = card.hasOwnProperty('race') ? card['race'] : '';
			var playerClass = card.hasOwnProperty('playerClass') ? card['playerClass'] : '';
			var cost = card.hasOwnProperty('cost') ? card['cost'] : '';
			var attack = card.hasOwnProperty('attack') ? card['attack'] : '';
			var health = card.hasOwnProperty('health') ? card['health'] : '';
			var text = card.hasOwnProperty('text') ? card['text'] : '';

			var row = '<tr>';
			row += '<td>' + set + '</td>';
			row += '<td>' + name + '</td>';
			row += '<td>' + rarity + '</td>';
			row += '<td>' + type + '</td>';
			row += '<td>' + race + '</td>';
			row += '<td>' + playerClass + '</td>';
			row += '<td>' + cost + '</td>';
			row += '<td>' + attack + '</td>';
			row += '<td>' + health + '</td>';
			row += '<td>' + text + '</td>';
			row += '</tr>';

			$('tbody.card-list-table').append(row);
		}
	});
}