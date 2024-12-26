const axios = require('axios');
const cheerio = require('cheerio');

// CIA World Factbook URL'si
const factbookUrl = 'https://www.cia.gov/the-world-factbook/countries/';

// Ülke verisini çekme fonksiyonu
async function getCountryData(countrySlug) {
    const url = `${factbookUrl}${countrySlug}/`;  // Örneğin: 'usa/', 'turkey/'
    
    try {
        const { data } = await axios.get(url);
        const $ = cheerio.load(data);

        // Başlık ve nüfus bilgilerini almak
        const countryName = $('h1').text().trim(); // Başlık
        const population = $('div[data-testid="Population"] .value').text().trim(); // Nüfus

        const countryInfo = {
            name: countryName,
            population: population,
        };

        return countryInfo;
    } catch (error) {
        console.error('Veri çekme hatası:', error);
        return null;
    }
}

// Örnek: Amerika Birleşik Devletleri verilerini çekelim
getCountryData('united-states').then((data) => {
    if (data) {
        console.log('Ülke:', data.name);
        console.log('Nüfus:', data.population);
    }
});
