/**
 * interface for the bits of the gitHubUsers call that we care about
 */
export interface GitHubUsers {

    // user id
    id: number;

    // user login
    login: string;

    // user type
    type: string;

    // if the user is a site admin
    site_admin: boolean;
}
