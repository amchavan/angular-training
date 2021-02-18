import { GitHubOrganization } from "./git-hub-organization";

export class CacheData {

    public pageSize: number; 
    public page: number;
    public data: Promise<void | GitHubOrganization[]>;


}
