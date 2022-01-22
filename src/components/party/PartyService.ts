import { Subject } from "rxjs";

const API = "api.giphy.com/v1/gifs/random";

class PartyService {
    private currentGif: any;
    private apiKey = process.env.REACT_APP_GIPHY_API_KEY;
    private apiUrl = `https://${API}?api_key=${this.apiKey}`;

    private gifSrcSubject: Subject<string>;

    get gif() {
        return this.currentGif;
    }

    set gif(gif: any) {
        this.currentGif = gif;
        this.gifSrcSubject.next(gif.images.looping.mp4);
    }

    constructor() {
        this.gifSrcSubject = new Subject();
    }

    public getRandomGif(query: string) {
        return fetch(`${this.apiUrl}&tag=${query}`)
            .then((response) => response.json())
            .then((data) => (this.gif = data.data))
            .catch((error) => console.log(error));
    }

    public subscribeOnGifChanges(onNext: Function) {
        return this.gifSrcSubject.subscribe((data) => onNext(data));
    }
}

const partyService = new PartyService();

export { partyService };
