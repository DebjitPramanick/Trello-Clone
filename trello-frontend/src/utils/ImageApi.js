import axios from 'axios'
import config from './Config'


const getImages = async() => {
    const page = Math.floor(Math.random() * 20 + 1);

    const imageUrl = config.url + `search/photos?page=${page}&query=Landscape&client_id=${config.clientKey}`;

    const res = await axios.get(imageUrl);

    const photos = res.data.results.map(img => ({
        id: img.id,
        alt: img.alt_description,
        thumb: img.urls.thumb,
        url: img.urls.full,
        user: {
            username: img.user.username,
            link: img.user.links.html,
        },
    }));

    return photos;
}


export {getImages} ;

