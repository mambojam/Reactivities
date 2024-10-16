import { Grid } from "semantic-ui-react";
import ActivityList from "./ActivityList";
import ActivityDetails from "../details/ActivityDetails";
import ActivityForm from "../form/ActivityForm";
import { useStore } from "../../../App/stores/store";
import { observer } from "mobx-react-lite";



// destructured props {activite}:Props
export default observer( function ActivityDashboard() { 

    // Don't display form by default - set a switch for this 
    const {activityStore} = useStore();
    const {selectedActivity, editMode}  = activityStore;
    return (
        <Grid>
            <Grid.Column width='10'>
                <ActivityList />
            </Grid.Column>
            <Grid.Column width='6'>
                {selectedActivity && 
                !editMode && 
                <ActivityDetails />}
                {editMode && 
                <ActivityForm 
                /> }
            </Grid.Column>
        </Grid>
    )
}
)