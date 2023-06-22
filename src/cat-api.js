export function fetchBreeds() {
  return fetch('https://api.thecatapi.com/v1/breeds', {
    headers: {
      'x-api-key':
        'live_8iFJ0bMrHFUFWpFRitEuYrSXz8ohqNsUgTO4QDa1A0a93kKesyd5PokSqrb2ntrV',
    },
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to fetch breeds');
      }
      return response.json();
    })
    .then(data => data.map(breed => ({ id: breed.id, name: breed.name })))
    .catch(error => {
      console.error(error);
      throw error;
    });
}

export function fetchCatByBreed(breedId) {
  return fetch(
    `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`,
    {
      headers: {
        'x-api-key':
          'live_8iFJ0bMrHFUFWpFRitEuYrSXz8ohqNsUgTO4QDa1A0a93kKesyd5PokSqrb2ntrV',
      },
    }
  )
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to fetch cat by breed');
      }
      return response.json();
    })
    .then(data => data[0])
    .catch(error => {
      console.error(error);
      throw error;
    });
}
