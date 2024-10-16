
import { useEffect, useState } from 'react'
import {  Container } from 'semantic-ui-react';
import { Activity } from '../Models/activity';
import NavBar from './NavBar';
import ActivityDashboard from '../../Features/activities/dashboard/ActivityDashboard';
import {v4 as uuid} from 'uuid';
import agent from '../api/agent';
import LoadingComponent from './LoadingComponent';


function App() {

  const [activities, setActivities] = useState<Activity[]>([]); // Used to remember data
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined >(undefined);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);


  useEffect(() => {
    agent.Activities.list().then(response => {
      let activities: Activity[] = [];
      response.forEach(activity => {
        activity.date = activity.date.split('T')[0];
        activities.push(activity);
      })
        setActivities(activities);
        setLoading(false);
      })
  }, [])
// SELECT
  function handleSelectActivity(id : string) {
    setSelectedActivity(activities.find(x => x.id === id));
    setEditMode(false);
  }

  function handleCancelSelectActivity(){
    setSelectedActivity(undefined);
  }
// FORMS
  function handleOpenForm(id? :string) {
    if (id) {
      handleSelectActivity(id);
    } else {
        handleCancelSelectActivity();
    }
    setEditMode(true);
  }

  function handleCloseForm(){
    setEditMode(false);
  }

  function handleCreateOrEditActivity(activity:Activity) {
    // activity.id 
    // ? setActivities([...activities.filter(x=>x.id !== activity.id), activity])
    // : setActivities([...activities, activity]);

    setSubmitting(true);

    // If activity.id exists, update the existing activity
    if (activity.id) {
      agent.Activities.update(activity).then(() => {
        setActivities([...activities.filter(x => x.id !== activity.id), activity]); // Removes the Activity with matching ID
        setEditMode(false); // Removes edit form
        setSelectedActivity(activity); // Displays new activity in the selected card
        setSubmitting(false); 
      })
    } else { // If activity.id does not exist, add a new activity
      activity.id = uuid(); // Generate new GUID
      agent.Activities.create(activity).then(() => {
        setActivities([...activities, activity]);
        setEditMode(false); // Removes edit form
        setSelectedActivity(activity); // Displays new activity in the selected card
        setSubmitting(false); 
      })
    } 
  }

  // DELETE
  function handleDeleteActivity(id: string) {

    setSubmitting(true);

    agent.Activities.delete(id).then(() => {
      setActivities([...activities.filter(x => x.id !== id)])
      setSubmitting(false);
    })
  }

  if (loading) return <LoadingComponent content='Loading app'/>
  return (
    <>
      <NavBar 
      openForm={handleOpenForm}
      />
      <Container style={{marginTop: '7em'}}>
        <ActivityDashboard 
          activities={activities}
          selectedActivity={selectedActivity}
          selectActivity={handleSelectActivity}
          cancelSelectActivity={handleCancelSelectActivity}
          editMode={editMode}
          openForm={handleOpenForm}
          closeForm={handleCloseForm}
          createOrEdit={handleCreateOrEditActivity}
          deleteActivity={handleDeleteActivity}
          submitting={submitting}
          />
      </Container>
    </>
  )
}

export default App
