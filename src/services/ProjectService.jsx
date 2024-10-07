import { get } from './routes';

export const ProjectService = {
    
    async getProjects(){
        return await get('project')
    },

    getProjectsSmall() {
        return Promise.resolve(this.getProjects().slice(0, 10));
    },

    getProjectsMedium() {
        return Promise.resolve(this.getProjects());
    },

    getProjectsLarge() {
        return Promise.resolve(this.getData().slice(0, 200));
    },

    getProjectsXLarge() {
        return Promise.resolve(this.getData());
    },
}