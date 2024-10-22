import { Grid } from "semantic-ui-react";
import ActivityList from "./ActivityList";
import { useStore } from "../../../App/stores/store";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import LoadingComponent from "../../../App/Layout/LoadingComponent";
import ActivityFilters from "./ActivityFilters";



// destructured props {activite}:Props
export default observer( function ActivityDashboard() { 

  
    // Don't display form by default - set a switch for this 
    const {activityStore} = useStore();
    const {loadActivities, activityRegistry} = activityStore;

    useEffect(() => {
        if (activityRegistry.size <= 1) loadActivities();
    }, [loadActivities, activityRegistry.size]) // <-- dependencies go here

    if (activityStore.loadingInitial) return <LoadingComponent content='Loading app'/>
    
    return (
        <Grid>
            <Grid.Column width='10'>
                <ActivityList />
            </Grid.Column>
            <Grid.Column width='6'>
                <ActivityFilters />
            </Grid.Column>
        </Grid>
    )
}
)