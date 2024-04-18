import ElasticSearch from 'elasticsearch'

/**
 * *** ElasticSearch *** client
 * @type {Client}
 */
export const client = new ElasticSearch.Client({
    hosts: ['http://localhost:9200']
});