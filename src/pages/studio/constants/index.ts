import { FilterItem, ProjectTag } from "../enums";

export const projectTagToFilterItem = new Map<ProjectTag, FilterItem>([
    [ProjectTag.Animation, FilterItem.Animation],
    [ProjectTag.Commercials, FilterItem.Commercials],
    [ProjectTag.Foley, FilterItem.Foley],
    [ProjectTag.Jingles, FilterItem.Jingles],
    [ProjectTag.Mobile, FilterItem.Mobile],
    [ProjectTag.PodcastsVoice, FilterItem.PodcastsVoice],
]);

export const filterItemToProjectTag = new Map<FilterItem, ProjectTag | null>([
    [FilterItem.Animation, ProjectTag.Animation],
    [FilterItem.Commercials, ProjectTag.Commercials],
    [FilterItem.Foley, ProjectTag.Foley],
    [FilterItem.Jingles, ProjectTag.Jingles],
    [FilterItem.Mobile, ProjectTag.Mobile],
    [FilterItem.PodcastsVoice, ProjectTag.PodcastsVoice],
    [FilterItem.All, null],
]);
