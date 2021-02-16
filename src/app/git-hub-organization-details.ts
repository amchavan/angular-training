import { GitHubOrganization } from './git-hub-organization';

export interface GitHubOrganizationDetails extends GitHubOrganization {
    is_verified: boolean;
    has_organization_projects: boolean;
    has_repository_projects: boolean;
    public_repos: number;
    public_gists: number;
    followers: number;
    following: number;
    html_url: string;
    created_at: string;
    updated_at: string;
    type: string;
}
