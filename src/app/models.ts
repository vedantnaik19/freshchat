export interface FCInitObject {
    token: string;
    host: string;
    siteId?: string;
    restoreId?: string;
    externalId?: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
    phoneCountryCode?: string;
    config?: any;
    open?: boolean;
    tags?: [string];
    faqTags?: any;
    locale?: string;
}

export interface FCUser {
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
    phoneCountryCode?: string;
    externalId?: string;
}

export interface FBInitObject {
    restoreId?: string;
    externalId?: string;
    name?: string,
    email?: string;
    phone?: string;
    phoneCountryCode?: string;
    config?: any;
    open?: boolean;
    tags?: [string];
    faqTags?: any;
    locale?: string;
    customFunctions: {}
}
