import { Button, FormField, Header, Label, Segment } from "semantic-ui-react";
import { act, ChangeEvent, useEffect, useState } from "react";
import { useStore } from "../../../App/stores/store";
import { observer } from "mobx-react-lite";
import { Link, useNavigate, useParams } from "react-router-dom";
import LoadingComponent from "../../../App/Layout/LoadingComponent";
import { v4 as uuid } from "uuid";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import MyTextInput from "../../common/form/MyTextInput";
import MyTextArea from "../../common/form/MyTextArea";
import MySelectInput from "../../common/form/MySelectInput";
import { categoryOptions } from "../../common/options/categoryOptions";
import { Activity } from "../../../App/Models/activity";
import MyDatePicker from "../../common/form/MyDatePicker";

const ActivityForm = () => {
  const { activityStore } = useStore();
  const {
    createActivity,
    updateActivity,
    loading,
    loadActivity,
    loadingInitial,
  } = activityStore;

  const { id } = useParams();
  const navigate = useNavigate();

  const [activity, setActivity] = useState<Activity>({
    id: "",
    title: "",
    category: "",
    description: "",
    date: null,
    city: "",
    venue: "",
  });

  const validationSchema = Yup.object<Activity>({
    title: Yup.string().required("The activity title is required"),
    description: Yup.string().required('The activity description is required'),
    category: Yup.string().required(),
    date: Yup.string().required(),
    city: Yup.string().required(),
    venue: Yup.string().required()
    
  });

  useEffect(() => {
    if (id) loadActivity(id).then((activity) => setActivity(activity!));
  }, [id, loadActivity]);

  function handleFormSubmit(activity: Activity) {
      if(!activity.id) {
          activity.id = uuid();
          createActivity(activity).then(() => navigate(`/activities/${activity.id}`))
      } else {
          updateActivity(activity).then(() => navigate(`/activities/${activity.id}`))
      }
    }



  if (loadingInitial) return <LoadingComponent content="Loading activity..." />;
  return (
    <Segment clearing>
      <Header content='Activity Details' sub color="teal" />
      <Formik
        enableReinitialize
        validationSchema={validationSchema}
        initialValues={activity}
        onSubmit={(values) => handleFormSubmit(values)}
      >
        {({ handleSubmit,  isValid, isSubmitting, dirty }) => (
          <Form className="ui form" onSubmit={handleSubmit} autoComplete="off">
            <MyTextInput name="title" placeholder="Title" />
            <MyTextArea placeholder="Description" name="description" rows={3} />
            <MySelectInput
              placeholder="Category"
              name="category"
              options={categoryOptions}
            />
            <MyDatePicker 
                placeholderText="Date" 
                name="date" 
                showTimeSelect
                timeCaption="time"
                dateFormat='MMMM d, yyyy h:mm aa'/>
            
            <Header content='Location Details' sub color="teal" />
            <MyTextInput placeholder="City" name="city" />
            <MyTextInput placeholder="Venue" name="venue" />
            <Button
              disabled={  !isValid || !dirty || isSubmitting}
              loading={loading}
              floated="right"
              positive
              type="submit"
              content="Submit"
            />
            <Button
              as={Link}
              to="/activities"
              floated="right"
              type="button"
              content="Cancel"
            />
          </Form>
        )}
      </Formik>
    </Segment>
  );
};
const ObservedActivityForm = observer(ActivityForm);
export default ObservedActivityForm;
