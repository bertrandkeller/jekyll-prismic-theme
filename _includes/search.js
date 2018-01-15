<script src="{{ site.baseurl }}/assets/js/simple-jekyll-search.min.js"></script>
<script>
	SimpleJekyllSearch({
	searchInput: document.getElementById('search-input'),
	resultsContainer: document.getElementById('search-results'),
	json: '/search.json',
	searchResultTemplate: '<h2><a href="{url}">{title}</a> <small>{collection}</small></h2>',
	noResultsText: 'Pas de résultats pour cette recherche'
})
</script>
