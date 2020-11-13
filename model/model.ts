/** A person related to a one pager. */
export interface OnePagerPerson {
  name: string;
  title: string;
  description?: string;
}

/** Count of users in a given country (at a given point in time). */
export interface RegionalUserCount {
  countryCode: string;
  userCount: number;
}

/** Counts of users across all countries at a particular point in time. */
export interface RegionalUsersData {
  timestamp: Date; // TODO Use moment.js? Specify that precision is per-month?
                   // What format we use here depends on the chart library we're using.
  regionalUserCounts: RegionalUserCount[];
}

/** Public access one pager data fields. */
export interface OnePagerPublicData {
  companyName: string;
  url: string;
  industryTags: string[];
  briefDescription: string;
}

/** Full one pager data model. */
export interface OnePagerData {
  companyName: string;
  url: string;
  industryTags: string[];
  briefDescription: string;
  detailDescription?: string;
  founders: OnePagerPerson[];
  fundraisingStage?: string;
  fundraisingStageGoal?: number;
  fundsRaisedInStage?: number;
  fundraisingDetails?: string;
  pitchVideoLink?: string;
  investors?: OnePagerPerson[];
}
