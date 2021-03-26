module.exports = {
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