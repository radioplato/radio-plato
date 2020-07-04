import { Subject } from "rxjs";

import { IndexGallery, IndexGalleryDto } from "./interfaces";
import { CoverDto, SimpleImage } from "../shared/interfaces";
import { BACKEND_URL } from "../shared/constants";


const GALLERY_REQUEST_INTERVAL = 300000;

class GalleryService {
    private indexGallery: IndexGallery | null = null;
    private gallerySubject: Subject<IndexGallery | null>;

    constructor () {
        this.gallerySubject = new Subject();

        this.fetchIndexGallery();
        setInterval(this.fetchIndexGallery.bind(this), GALLERY_REQUEST_INTERVAL);
    }

    get gallery (): IndexGallery | null {
        return this.indexGallery;
    }

    set gallery (gallery: IndexGallery | null) {
        this.indexGallery = gallery;
        gallery && this.gallerySubject.next(gallery);
    }

    subscribeOnGalleryChanges (onNext: Function) {
        return this.gallerySubject.subscribe(data => onNext(data));
    }

    async fetchIndexGallery () {
        await fetch(`${ BACKEND_URL }/index-gallery`)
            .then(response => response.json())
            .then(data => this.parseIndexGallery(data))
            .then(indexGallery => this.updateIndexGallery(indexGallery));
    }

    private parseIndexGallery (dto: IndexGalleryDto) {
        return {
            photoExhibition: dto.PhotoExhibition,
            photoExhibitionAuthor: dto.PhotoExhibitionAuthor,
            photoExhibitionDescription: dto.PhotoExhibitionDescription,
            photoExhibitionLink: dto.PhotoExhibitionLink,
            photoExhibitionMedia: dto.PhotoExhibitionMedia.map(imageDto => this.mapImageDto(imageDto)),
            photoExhibitionTitle: dto.PhotoExhibitionTitle,
            regularGallery: dto.RegularGallery.map(imageDto => this.mapImageDto(imageDto)),
            video: dto.Video,
            videoEmbedCode: dto.VideoEmbedCode,
        }
    }

    private mapImageDto (imageDto: CoverDto): SimpleImage {
        return {
            alternativeText: imageDto.alternativeText,
            caption: imageDto.caption,
            url: imageDto.url
        };
    }

    private updateIndexGallery (indexGallery: IndexGallery) {
        this.gallery = indexGallery;
    }
}

const galleryService = new GalleryService();

export default galleryService;