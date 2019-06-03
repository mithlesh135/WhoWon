export function fetchData(language) {
    return fetch(`https://api.github.com/search/repositories?q=stars:>1+language:${language}&sort=stars&order=desc&type=Repositories`).
    then(res => res.json()).
    then(data => {
        if(!data.items) {
            throw new Error(`Error fetching language ${language}`);
        }

        return data.items;
    });
}