import { FilterItem, ProjectTag } from "./enums";

export const projectTagToFilterItem = new Map<ProjectTag, FilterItem>([
    [ ProjectTag.Animation, FilterItem.Animation ],
    [ ProjectTag.Commercials, FilterItem.Commercials ],
    [ ProjectTag.Foley, FilterItem.Foley ],
    [ ProjectTag.Jingles, FilterItem.Jingles ],
    [ ProjectTag.Mobile, FilterItem.Mobile ],
    [ ProjectTag.PodcastsVoice, FilterItem.PodcastsVoice ],
]);