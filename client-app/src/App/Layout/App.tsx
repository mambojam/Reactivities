
import { useEffect, useState } from 'react'
import axios from 'axios';
import {  Container } from 'semantic-ui-react';
import { Activity } from '../Models/activity';
import NavBar from './NavBar';
import ActivityDashboard from '../../Features/activities/dashboard/ActivityDashboard';
import {v4 as uuid} from 'uuid';


function App() {

  const [activities, setActivities] = useState<Activity[]>([]); // Used to remember data
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined >(undefined);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    axios.get<Activity[]>('https://localhost:5000/api/activities')
      .then(response => {
        setActivities(response.data)
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

    if (activity.id) {
      // If activity.id exists, update the existing activity
      setActivities([...activities.filter(x => x.id !== activity.id), activity]);
    } else {
        // If activity.id does not exist, add a new activity
        setActivities([...activities, {...activity, id: uuid()}]);
    }
    setEditMode(false);
    setSelectedActivity(activity);

  }

  // DELETE
  function handleDeleteActivity(id: string) {
    setActivities([...activities.filter(x => x.id !== id)])
  }
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
          />
      </Container>
    </>
  )
}

export default App
