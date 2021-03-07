const cheerio = require('cheerio');
const request = require('request');

const SELECTORS = {
    target: {
        price: {
            selector: '[data-test="product-price"]',
            attrName: 'textContent'
        },
        picture: {
            selector: '.carouselLegendGrid button img',
            attrName: 'src'
        },
        name: {
            selector: '[data-test="product-title"] span',
            attrName: 'textContent'
        }
    },
    amazon: {
        price: {
            selector: '#priceblock_ourprice',
            attrName: 'textContent'
        },
        picture: {
            selector: '#imgTagWrapperId img',
            attrName: 'src'
        },
        name: {
            selector: '#productTitle',
            attrName: 'textContent'
        }
    },
    bedbathandbeyond: {
        price: {
            selector: '[data-locator="pdp-pricetext"]',
            attrName: 'textContent'
        },
        picture: {
            selector: '[itemprop="image"]',
            attrName: 'content'
        },
        name: {
            selector: '[itemprop="name"]',
            attrName: 'textContent'
        }
    }
}

class RegistryLinkParser {
    constructor(url) {
        this.url = url;
        this.initialized = false;
    }

    init() {
        return new Promise((resolve, reject) => {
            request(this.url, (error, response, html) => {
                if (!error && response.statusCode === 200) {
                    this.$ = cheerio.load(html);
                    this.initialized = true;
                    resolve();
                }
                reject(error);
            })
        })
    }

    get store() {
        return this?.url.split('.')[1];
    }

    get price() {
        console.log('get price');
        return this.verifyInitialized(() => {
            console.log('price', this.$(SELECTORS[this.store].price.selector).attr([SELECTORS[this.store].price.attrName]));
            const price = this.$(SELECTORS[this.store].price.selector).attr([SELECTORS[this.store].price.attrName])
            return price;
        });
    }

    get picture() {
        return this.verifyInitialized(() => {
            console.log('picture', this.$(SELECTORS[this.store].picture.selector).attr([SELECTORS[this.store].picture.attrName]));
            return this.$(SELECTORS[this.store].picture.selector).attr([SELECTORS[this.store].picture.attrName])
        })
    }

    get name() {
        return this.verifyInitialized(() => {
            console.log('name', this.$(SELECTORS[this.store].picture.selector).attr([SELECTORS[this.store].name.attrName]));
            return this.$(SELECTORS[this.store].name.selector).attr([SELECTORS[this.store].name.attrName])
        })
    }

    async verifyInitialized(callback) {
        if (!this.initialized) {
            return this.init().then(() => {
                return callback();
            })
                .catch(e => {
                    this.initialized = false;
                    console.error(e)
                })
        }
        return callback();
    }
}

module.exports = RegistryLinkParser;