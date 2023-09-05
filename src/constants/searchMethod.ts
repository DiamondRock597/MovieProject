export enum SearchMethod {
    Actor = 'ACTOR',
    Title = 'TITLE',
    Default = 'DEFAULT'
}

export const searchMethodKey = {
    [SearchMethod.Actor]: 'actor',
    [SearchMethod.Default]: 'search',
    [SearchMethod.Title]: 'title'
}