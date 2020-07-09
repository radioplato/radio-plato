import { BACKEND_URL } from "../shared/constants";
import { AdvertisementDto, Advertisement } from "./interfaces";
import { Subject } from "rxjs/internal/Subject";
import moment from "moment";


enum AdPlacements {
    NewsList = "NewsList",
    NewsPost = "NewsPost"
}

class AdService {
    private _advertisements: Advertisement[] = [];
    private advertisementsSubject: Subject<Advertisement[] | null>;
    private newsCardAdSubject: Subject<Advertisement | null>;

    constructor () {
        this.advertisementsSubject = new Subject();
        this.newsCardAdSubject = new Subject();

        this.fetchAdvertisements();
    }

    get advertisements () {
        return this._advertisements;
    }

    get newsCardAdvertisement () {
        return this.advertisements.find((ad: Advertisement) => ad.placement === AdPlacements.NewsList && moment().isBefore(moment(ad.endDate)));
    }

    set advertisements (ads: any) {
        this._advertisements = ads;

        this.advertisementsSubject.next(this.advertisements);
        this.newsCardAdSubject.next(this.newsCardAdvertisement)
    }

    subscribeOnAdvertisementsChanges (onNext: Function) {
        return this.advertisementsSubject.subscribe(data => onNext(data));
    }

    subscribeOnNewsCardAdUpdate (onNext: Function) {
        return this.newsCardAdSubject.subscribe(data => onNext(data));
    }

    async fetchAdvertisements () {
        await fetch(`${ BACKEND_URL }/advertisements`)
            .then(response => response.json())
            .then(data => this.parseAdvertisements(data))
            .then(advertisements => this.updateAdvertisements(advertisements));
    }

    private parseAdvertisements (data: AdvertisementDto[]) {
        return data.map(ad => {
            return {
                isActive: ad.AdActive,
                endDate: ad.AdEnd,
                image: {
                    alternativeText: ad.AdImage.alternativeText,
                    caption: ad.AdImage.caption,
                    url: ad.AdImage.url
                },
                link: ad.AdLink,
                placement: ad.AdPlacement,
                startDate: ad.AdStart,
                text: ad.AdText,
                title: ad.AdTitle
            }
        });
    }

    private updateAdvertisements (advertisements: any) {
        this.advertisements = advertisements;
    }
}

const adService = new AdService();

export default adService;