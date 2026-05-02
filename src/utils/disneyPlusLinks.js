/**
 * Disney+ deep links for released Star Wars films.
 * TV series episodes and unreleased films fall back to a search URL.
 */
const FILM_DEEP_LINKS = {
  "Star Wars: Episode I The Phantom Menace": "https://www.disneyplus.com/movies/star-wars-the-phantom-menace-episode-i/2ezYynkgO1gE",
  "Star Wars: Episode II Attack of the Clones": "https://www.disneyplus.com/movies/star-wars-attack-of-the-clones-episode-ii/1Jmo2EVTn3Qn",
  "Star Wars: The Clone Wars (film)": "https://www.disneyplus.com/movies/star-wars-the-clone-wars/JhRl2JIoNUjk",
  "Star Wars: Episode III Revenge of the Sith": "https://www.disneyplus.com/movies/star-wars-revenge-of-the-sith-episode-iii/4WOaBqCYwqYL",
  "Solo: A Star Wars Story": "https://www.disneyplus.com/movies/solo-a-star-wars-story/7ks3IYr1eU2P",
  "Rogue One: A Star Wars Story": "https://www.disneyplus.com/movies/rogue-one-a-star-wars-story/14CV6eSbygOA",
  "Star Wars: Episode IV A New Hope": "https://www.disneyplus.com/movies/star-wars-a-new-hope-episode-iv/12fVeZxD2fWJ",
  "Star Wars: Episode V The Empire Strikes Back": "https://www.disneyplus.com/movies/star-wars-the-empire-strikes-back-episode-v/AT054GGaREhd",
  "Star Wars: Episode VI Return of the Jedi": "https://www.disneyplus.com/movies/star-wars-return-of-the-jedi-episode-vi/6yVmPZoOyCEd",
  "Star Wars: Episode VII The Force Awakens": "https://www.disneyplus.com/movies/star-wars-the-force-awakens-episode-vii/1LEKJHu1XwMX",
  "Star Wars: Episode VIII The Last Jedi": "https://www.disneyplus.com/movies/star-wars-the-last-jedi-episode-viii/1nCJ2MaNMBaV",
  "Star Wars: Episode IX The Rise of Skywalker": "https://www.disneyplus.com/movies/star-wars-the-rise-of-skywalker-episode-ix/5e8JThYERuUX",
};

/**
 * Series names mapped to their Disney+ series page.
 * Episode titles get stripped to match these keys.
 */
const SERIES_PAGE_LINKS = {
  "Star Wars: The Clone Wars": "https://www.disneyplus.com/series/star-wars-the-clone-wars/1wYXzjabXGVZ",
  "Star Wars: The Bad Batch": "https://www.disneyplus.com/series/star-wars-the-bad-batch/4gMlUFKlS4cY",
  "Star Wars Rebels": "https://www.disneyplus.com/series/star-wars-rebels/64MCZgAzY3Wn",
  "Star Wars: Tales of the Jedi": "https://www.disneyplus.com/series/star-wars-tales-of-the-jedi/3lB7qWxCk9Pp",
  "Star Wars: Andor": "https://www.disneyplus.com/series/star-wars-andor/3xsQKWG00GL5",
  "Obi-Wan Kenobi": "https://www.disneyplus.com/series/obi-wan-kenobi/2JYKcHv9fYHb",
  "The Mandalorian": "https://www.disneyplus.com/series/the-mandalorian/3jLIGMDYIN2N",
  "The Book of Boba Fett": "https://www.disneyplus.com/series/the-book-of-boba-fett/57TL7zLNu2wf",
  "Star Wars: Ahsoka": "https://www.disneyplus.com/series/ahsoka/pdpjs2KaPCto",
  "Star Wars: Skeleton Crew": "https://www.disneyplus.com/series/star-wars-skeleton-crew/5JhHb7MgZz1g",
  "Star Wars Resistance": "https://www.disneyplus.com/series/star-wars-resistance/4bLFKtoVNppG",
  "Star Wars: The Acolyte": "https://www.disneyplus.com/series/the-acolyte/5KAQwN0Kn26c",
  "Star Wars: Visions": "https://www.disneyplus.com/series/star-wars-visions/grYLL3qRIwRF",
  "Star Wars Galaxy of Adventures": "https://www.disneyplus.com/search/star%20wars%20galaxy%20of%20adventures",
};

/**
 * Returns the best Disney+ URL for a given timeline item.
 * - Released films → exact deep link
 * - TV episodes → series page (or search fallback)
 * - Unreleased / unknown → search URL
 */
export function getDisneyPlusUrl(item) {
  if (!item || !item.title) return null;

  // 1. Exact film match
  if (FILM_DEEP_LINKS[item.title]) {
    return FILM_DEEP_LINKS[item.title];
  }

  // 2. Try to match the series name from the episode title
  //    Episode titles look like "Star Wars: The Clone Wars - S1E1: Ambush"
  for (const [seriesName, url] of Object.entries(SERIES_PAGE_LINKS)) {
    if (item.title.startsWith(seriesName)) {
      return url;
    }
  }

  // 3. Unreleased films — skip (no link available)
  if (item.title.startsWith("Untitled")) {
    return null;
  }

  // 4. Fallback: Disney+ search with cleaned title
  const cleanTitle = item.title
    .replace(/- S\d+E\d+:?/g, '')  // Remove episode numbering
    .replace(/\s+/g, ' ')
    .trim();
  return `https://www.disneyplus.com/search/${encodeURIComponent(cleanTitle)}`;
}
