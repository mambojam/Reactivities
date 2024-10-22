import { makeAutoObservable, runInAction } from "mobx";
import { Activity } from "../Models/activity";
import agent from "../api/agent";
import {v4 as uuid} from 'uuid';


export default class ActivityStore {

    activityRegistry = new Map<string, Activity>();
    selectedActivity: Activity | undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial = false;

    constructor() {
        makeAutoObservable(this)
    }

    get activitiesByDate() {
        return Array.from(this.activityRegistry.values()).sort((a,b) => 
            Date.parse(a.date) - Date.parse(b.date))
    }

    loadActivities = async () => {
        this.setLoadingInitial(true);

        try {
            const activitiesInitial = await agent.Activities.list();
            
            activitiesInitial.forEach(activity => {
                this.setActivity(activity);
            })
            
            this.setLoadingInitial(false);

        } catch (error) {
            console.log(error);
            this.setLoadingInitial(false);
        }
    }
    
    loadActivity = async (id : string) => {
        let activity = this.getActivity(id);
        if (activity) {
            this.setSelecetedActivity(activity);
            return activity;
        }
        else {
            try {
                this.setLoadingInitial(true);

                activity = await agent.Activities.details(id);
                this.setActivity(activity);
                this.setSelecetedActivity(activity);
                this.setLoadingInitial(false);
                return activity;
        } catch(error) {
            console.log(error);
            this.setLoadingInitial(false);
            }
        }
    }
    private setSelecetedActivity = (activity: Activity) => {
        this.selectedActivity = activity;
     }
    private getActivity = (id: string) => {
        return this.activityRegistry.get(id);
    }

    private setActivity = (activity: Activity) => {
        activity.date = activity.date.split('T')[0]; 
        this.activityRegistry.set(activity.id, activity)
    }
    
    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }

    createActivity = async (activity:Activity) => {
        this.loading = true;
        activity.id = uuid(); // Generate new GUID
        try {
            await agent.Activities.create(activity);
            runInAction(() => {
                this.activityRegistry.set(activity.id, activity);
                this.selectedActivity = activity;
                this.editMode = false;
                this.loading = false;
            })
        } catch (error) {
            console.log("Error creating activity: " + error)
            runInAction(() => {
                this.loading = false;
            })
        }
    }

    updateActivity = async (activity:Activity) => {
        this.loading = true;
        try {
            await agent.Activities.update(activity);
            runInAction(() => {
                this.activityRegistry.set(activity.id, activity)
                this.selectedActivity = activity;
                this.editMode = false;
                this.loading = false;
            })
        } catch (error) {
            console.log("Error updating activity: " + error)
            runInAction(() => {
                this.loading = false;
            })
        }
    }

    deleteActivity = async (id: string) => {
        this.loading = true;
        try {
            await agent.Activities.delete(id);
            runInAction(() => {
                this.activityRegistry.delete(id);
                this.loading = false;
            })
        } catch (error) {
            console.log("Error deleting activity: " + error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }
}

