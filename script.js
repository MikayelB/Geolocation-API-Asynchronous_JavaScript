'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

const renderCountry = function (data, className = '') {
  const html = `
      <article class="country ${className}">
      <img class="country__img" src="${data.flag}" />
      <div class="country__data">
      <h3 class="country__name">${data.name}</h3>
          <h4 class="country__region">${data.region}</h4>
          <p class="country__row"><span>👫</span>${(
            +data.population / 1000000
          ).toFixed(1)} million people</p>
              <p class="country__row"><span>🗣️</span>${
                data.languages[0].name
              }</p>
              <p class="country__row"><span>💰</span>${
                data.currencies[0].name
              }<p>
        </div>
        </article>
        `;

  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
};

const renderError = function (message) {
  countriesContainer.insertAdjacentText('beforebegin', message);
  countriesContainer.style.opacity = 1;
};

const getJSON = function (url, errorMsg = 'Something went wrong') {
  return fetch(url).then(response => {
    if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);

    return response.json();
  });
};

//////////////////////////////////////

/* 
const getCountryData = function (country) {
  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.eu/rest/v2/name/${country}`);
  request.send();

  request.addEventListener('load', function () {
    //   console.log(this.responseText);
    const [data] = JSON.parse(this.responseText);
    console.log(data);

    const html = `
    <article class="country">
      <img class="country__img" src="${data.flag}" />
      <div class="country__data">
        <h3 class="country__name">${data.name}</h3>
        <h4 class="country__region">${data.region}</h4>
        <p class="country__row"><span>👫</span>${(
          +data.population / 1000000
        ).toFixed(1)} million people</p>
        <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
        <p class="country__row"><span>💰</span>${data.currencies[0].name}<p>
      </div>
    </article>
  `;

    countriesContainer.insertAdjacentHTML('beforeend', html);
    countriesContainer.style.opacity = 1;
  });
};
 */
// getCountryData('armenia');
// getCountryData('portugal');
// getCountryData('usa');
// getCountryData('russia');
// getCountryData('belgium');
// getCountryData('germany');

//////////////////////////////////////
// Welcome to Callback Hell

/*
const getCountryAndNeighbour = function (country) {
  // AJAX call country 1
  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.eu/rest/v2/name/${country}`);
  request.send();

  request.addEventListener('load', function () {
    const [data] = JSON.parse(this.responseText);
    console.log(data);

    // Render Country 1
    renderCountry(data);

    // Render neighbour country
    const [, neighbour] = data.borders;

    if (!neighbour) return;

    // AJAX call country 2
    const request2 = new XMLHttpRequest();
    request2.open('GET', `https://restcountries.eu/rest/v2/alpha/${neighbour}`);
    request2.send();

    request2.addEventListener('load', function () {
      const data2 = JSON.parse(this.responseText);

      renderCountry(data2, 'neighbour');
    });
  });
};

// getCountryAndNeighbour('armenia');

// Callback hell ex (above one too)
/* setTimeout(() => {
  console.log('1 second passed');
  setTimeout(() => {
    console.log('2 seconds passed');
    setTimeout(() => {
      console.log('3 second passed');
      setTimeout(() => {
        console.log('4 second passed');
      }, 1000);
    }, 1000);
  }, 1000);
}, 1000);
 */
//////////////////////////////////////
// Promises and the Fetch API

// const request = new XMLHttpRequest();
// request.open('GET', `https://restcountries.eu/rest/v2/name/${country}`);
// request.send();

/* 
const request = fetch('https://restcountries.eu/rest/v2/name/armenia');
console.log(request);

const getCountryData = function (country) {
  fetch(`https://restcountries.eu/rest/v2/name/${country}`)
    .then(function (response) {
      console.log(response);
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      renderCountry(data[0]);
    });
};

getCountryData('armenia'); 

// highly simplified

const getJSON = function (url, errorMsg = 'Something went wrong') {
  return fetch(url).then(response => {
    if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);

    return response.json();
  });
};

const getCountryData = function (country) {
  // country 1

  getJSON(
    `https://restcountries.eu/rest/v2/name/${country}`,
    'Country not found'
  )
    .then(data => {
      renderCountry(data[0]);
      const neighbour = data[0].borders[2];

      if (!neighbour) throw new Error('No neighbour found!');

      // country 2
      return getJSON(
        `https://restcountries.eu/rest/v2/alpha/${neighbour}`,
        'Country not found'
      );
    })
    .then(response => response.json())
    .then(data => renderCountry(data, 'neighbour'))
    .catch(err => {
      console.error(`${err} 💥💥💥`);
      renderError(`Something went wrong 💥💥💥 ${err.message}. Try again!`);
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};

// getCountryData('armenia');
*/

/////Go back to see
// Handling Rejected Promises

/* 
btn.addEventListener('click', function () {
  getCountryData('armenia');
});

// getCountryData('dgfd');
*/

///////////////////////////////////////
// Coding Challenge #1

/* 
In this challenge you will build a function 'whereAmI' which renders a country ONLY based on GPS coordinates. For that, you will use a second API to geocode coordinates.

Here are your tasks:

PART 1
1. Create a function 'whereAmI' which takes as inputs a latitude value (lat) and a longitude value (lng) (these are GPS coordinates, examples are below).
2. Do 'reverse geocoding' of the provided coordinates. Reverse geocoding means to convert coordinates to a meaningful location, like a city and country name. Use this API to do reverse geocoding: https://geocode.xyz/api.
The AJAX call will be done to a URL with this format: https://geocode.xyz/52.508,13.381?geoit=json. Use the fetch API and promises to get the data. Do NOT use the getJSON function we created, that is cheating 😉
3. Once you have the data, take a look at it in the console to see all the attributes that you recieved about the provided location. Then, using this data, log a messsage like this to the console: 'You are in Berlin, Germany'
4. Chain a .catch method to the end of the promise chain and log errors to the console
5. This API allows you to make only 3 requests per second. If you reload fast, you will get this error with code 403. This is an error with the request. Remember, fetch() does NOT reject the promise in this case. So create an error to reject the promise yourself, with a meaningful error message.

PART 2
6. Now it's time to use the received data to render a country. So take the relevant attribute from the geocoding API result, and plug it into the countries API that we have been using.
7. Render the country and catch any errors, just like we have done in the last lecture (you can even copy this code, no need to type the same code)

TEST COORDINATES 1: 52.508, 13.381 (Latitude, Longitude)
TEST COORDINATES 2: 19.037, 72.873
TEST COORDINATES 2: -33.933, 18.474

GOOD LUCK 😀
*/

/*
let locationCountry;

const whereAmI = function (lat, lng) {
  const request = fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
  let data;
  request
    .then(function (response) {
      // console.log(response);
      if (!response.ok)
        throw new Error(`Problem with geocoding ${response.status}`);
      return response.json();
    })
    .then(function (info) {
      data = info;
      locationCountry = info.country;
      console.log(info);
      console.log(`You are in ${info.city}, ${info.country}`);

      return fetch(`https://restcountries.eu/rest/v2/name/${info.country}`);
    })
    .then(function (result) {
      if (!result.ok) throw new Error(`Country not found (${result.status})`);

      return result.json();
    })
    .then(data => renderCountry(data[0]))
    .catch(err =>
      console.log(`💥${err}💥 At that moment he knew, he fucked up.`)
    );

  // console.log(request);
};
console.log(locationCountry);

whereAmI(40.1983585, 44.5251063);
whereAmI(52.508, 13.381);
whereAmI(52.232855, 20.92);
*/

///////////////////////////////////////
// The Event Loop in Practice

/* 
console.log('Test start');
setTimeout(() => console.log('0 sec timer'), 0);
Promise.resolve('Resolved promise 2').then(res => {
  for (let i = 0; i < 1000000000; i++) {}
  console.log(res);
});

console.log('Test end');
*/

///////////////////////////////////////
// Building a Simple Promise

/* 
const lotteryPromise = new Promise(function (resolve, reject) {
  console.log('Lottery draw is happening 🔍');

  setTimeout(function () {
    if (Math.random() >= 0.5) {
      resolve('You WON 💰');
    } else {
      reject(new Error('You lost your cash :('));
    }
  }, 2000);
});

lotteryPromise.then(res => console.log(res)).catch(err => console.error(err));

// Promisifying setTimeout
const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};

wait(1)
  .then(() => {
    console.log('1 second passed');
    return wait(1);
  })
  .then(() => {
    console.log('2 second passed');
    return wait(1);
  })
  .then(() => {
    console.log('3 second passed');
    return wait(1);
  })
  .then(() => {
    console.log('4 second passed');
  });

Promise.resolve('abc').then(x => console.log(x));
Promise.reject(new Error('Problem!')).catch(x => console.error(x));
*/

///////////////////////////////////////
// Promisifying the Geolocation API

const getPosition = function () {
  return new Promise(function (resolve, reject) {
    // navigator.geolocation.getCurrentPosition(
    //   position => resolve(position),
    //   err => reject(err)
    // );

    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

getPosition().then(pos => console.log(pos));

const whereAmI = function () {
  getPosition()
    .then(pos => {
      const { latitude: lat, longitude: lng } = pos.coords;

      return fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
    })
    .then(res => {
      if (!res.ok) throw new Error(`Problem with geocoding ${res.status}`);
      return res.json();
    })
    .then(data => {
      // console.log(data);
      console.log(`You are in ${data.city}, ${data.country}`);

      return fetch(`https://restcountries.eu/rest/v2/name/${data.country}`);
    })
    .then(res => {
      if (!res.ok) throw new Error(`Country not found (${res.status})`);

      return res.json();
    })
    .then(data => renderCountry(data[0]))
    .catch(err => console.error(`${err.message} 💥`));
};

btn.addEventListener('click', whereAmI);

///////////////////////////////////////
// Coding Challenge #2

/* 
Build the image loading functionality that I just showed you on the screen.

Tasks are not super-descriptive this time, so that you can figure out some stuff on your own. Pretend you're working on your own 😉

PART 1
1. Create a function 'createImage' which receives imgPath as an input. This function returns a promise which creates a new image (use document.createElement('img')) and sets the .src attribute to the provided image path. When the image is done loading, append it to the DOM element with the 'images' class, and resolve the promise. The fulfilled value should be the image element itself. In case there is an error loading the image ('error' event), reject the promise.

If this part is too tricky for you, just watch the first part of the solution.

PART 2
2. Comsume the promise using .then and also add an error handler;
3. After the image has loaded, pause execution for 2 seconds using the wait function we created earlier;
4. After the 2 seconds have passed, hide the current image (set display to 'none'), and load a second image (HINT: Use the image element returned by the createImage promise to hide the current image. You will need a global variable for that 😉);
5. After the second image has loaded, pause execution for 2 seconds again;
6. After the 2 seconds have passed, hide the current image.

TEST DATA: Images in the img folder. Test the error handler by passing a wrong image path. Set the network speed to 'Fast 3G' in the dev tools Network tab, otherwise images load too fast.

GOOD LUCK 😀
*/

/* 
const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};

const imageClass = document.querySelector('.images');

let image;

const createImage = function (imgPath) {
  return new Promise(function (resolve, reject) {
    image = document.createElement('img');
    image.src = imgPath;

    image.addEventListener('load', function () {
      imageClass.append(image);

      resolve(image);
    });

    image.addEventListener('error', function () {
      const error = new Error('Image not found');
      reject(error);
    });
  });
};

createImage('img/img-1.jpg')
  .then(img => {
    console.log('Image 1 loaded');
    return wait(2);
  })
  .then(() => {
    image.style.display = 'none';
    return createImage('img/img-2.jpg');
  })
  .then(img => {
    console.log('Image 2 loaded');
    return wait(2);
  })
  .then(() => {
    image.style.display = 'none';
  })

  .catch(err => console.log(err));
*/

///////////////////////////////////////
// Consuming Promises with Async/Await

/* 
const getPosition = function () {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

const whereAmI = async function () {
  try {
    // Geolocation
    const pos = await getPosition();
    const { latitude: lat, longitude: lng } = pos.coords;

    // Reverse Geocoding
    const resGeo = await fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);

    if (!resGeo.ok) throw new Error('Problem getting location data');

    const dataGeo = await resGeo.json();
    console.log(dataGeo);

    // Country Data
    const res = await fetch(
      `https://restcountries.eu/rest/v2/name/${dataGeo.country}`
    );

    if (!res.ok) throw new Error('Problem getting country');

    const data = await res.json();
    console.log(data);
    renderCountry(data[0]);
  } catch (err) {
    console.error(`${err} 💥`);
    renderError(`💥 ${err.message}`);
  }
};

// whereAmI();
// // whereAmI();
// console.log('First');

console.log(`1: Will get location`);

// whereAmI()
//   .then(city => console.log(`2: ${city}`))
//   .catch(err => console.error(`2: ${err.message}💥`))
//   .finally(() => console.log(`3: Finished getting location`));

(async function () {
  try {
    const city = await whereAmI();
  } catch (err) {
    console.error(`2: ${err.message}💥`);
  }
  console.log(`3: Finished getting location`);
})();
*/

///////////////////////////////////////
// Running Promises in Parallel

/* 
const get3Countries = async function (c1, c2, c3) {
  try {
    const data = await Promise.all([
      getJSON(`https://restcountries.eu/rest/v2/name/${c1}`),
      getJSON(`https://restcountries.eu/rest/v2/name/${c2}`),
      getJSON(`https://restcountries.eu/rest/v2/name/${c3}`),
    ]);

    console.log(data.map(d => d[0].capital));
  } catch (err) {
    console.error(err);
  }
};

get3Countries('portugal', 'armenia', 'greece');

*/

///////////////////////////////////////
// Other Promise Combinators: race, allSettled and any

/* 
// Most important ones are: promise.race and promise.all
// Promise.race
(async function () {
  const res = await Promise.race([
    getJSON(`https://restcountries.eu/rest/v2/name/italy`),
    getJSON(`https://restcountries.eu/rest/v2/name/egypt`),
    getJSON(`https://restcountries.eu/rest/v2/name/mexico`),
  ]);
  console.log(res[0]);
})();

const timeout = function (sec) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error('Request took too long!'));
    }, sec * 1000);
  });
};

Promise.race([
  getJSON(`https://restcountries.eu/rest/v2/name/tanzania`),
  timeout(5),
])
  .then(res => console.log(res[0]))
  .catch(err => console.log(err));

// Promise.all
Promise.all([
  Promise.resolve('Success'),
  Promise.reject('Error'),
  Promise.resolve('Another success'),
])
  .then(res => console.log(res))
  .catch(err => console.error(err));

// Promise.allSetlled (ES 2020)
Promise.allSettled([
  Promise.resolve('Success'),
  Promise.reject('Error'),
  Promise.resolve('Another success'),
]).then(res => console.log(res));

// Promise.any (ES 2021)
Promise.any([
  Promise.resolve('Success'),
  Promise.reject('Error'),
  Promise.resolve('Another success'),
])
  .then(res => console.log(res))
  .catch(err => console.error(err));

*/

///////////////////////////////////////
// Coding Challenge #3

/* 
PART 1
Write an async function 'loadNPause' that recreates Coding Challenge #2, this time using async/await (only the part where the promise is consumed). Compare the two versions, think about the big differences, and see which one you like more.
Don't forget to test the error handler, and to set the network speed to 'Fast 3G' in the dev tools Network tab.

PART 2
1. Create an async function 'loadAll' that receives an array of image paths 'imgArr';
2. Use .map to loop over the array, to load all the images with the 'createImage' function (call the resulting array 'imgs')
3. Check out the 'imgs' array in the console! Is it like you expected?
4. Use a promise combinator function to actually get the images from the array 😉
5. Add the 'paralell' class to all the images (it has some CSS styles).

TEST DATA: ['img/img-1.jpg', 'img/img-2.jpg', 'img/img-3.jpg']. To test, turn off the 'loadNPause' function.

GOOD LUCK 😀
*/

/* 
const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};

const imageClass = document.querySelector('.images');

let image;

const createImage = function (imgPath) {
  return new Promise(function (resolve, reject) {
    image = document.createElement('img');
    image.src = imgPath;

    image.addEventListener('load', function () {
      imageClass.append(image);

      resolve(image);
    });

    image.addEventListener('error', function () {
      const error = new Error('Image not found');
      reject(error);
    });
  });
};

// Part 1
const loadNPause = async function () {
  try {
    // loading image 1
    image = await createImage('img/img-1.jpg');
    console.log('image 1 loaded');
    await wait(2);
    image.style.display = 'none';

    // loading image 2
    image = await createImage('img/img-2.jpg');
    console.log('image 2 loaded');
    await wait(2);
    image.style.display = 'none';
  } catch (error) {
    console.error(error);
  }
};

// loadNPause();

// Part 2
let imgArr = ['img/img-1.jpg', 'img/img-2.jpg', 'img/img-3.jpg'];

const loadAll = async function (array) {
  try {
    const loadedImageArr = array.map(async img => await createImage(img));
    console.log(loadedImageArr);

    const loadedImages = await Promise.all(loadedImageArr);
    console.log(loadedImages);

    loadedImages.forEach(img => img.classList.add('parallel'));
  } catch (error) {
    console.error(error);
  }
};

// loadAll(imgArr);

*/
