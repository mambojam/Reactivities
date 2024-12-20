import { Link } from "react-router-dom"
import { Item, Button, Segment, Icon } from "semantic-ui-react"
import { Activity } from "../../../App/Models/activity"
import { format } from "date-fns"


interface Props {
    activity: Activity
}
export default function ActivityListItem({activity} : Props) {

   
    
  return (
    <Segment.Group>
        <Segment>
            <Item.Group>
                <Item>
                    <Item.Image sie='tiny' circular src='/assets/user.png' />
                    <Item.Content>
                        <Item.Header as={Link} to={`/activities/${activity.id}`}>
                            {activity.title}
                        </Item.Header>
                        <Item.Description>
                            Hosted by bob
                        </Item.Description>
                    </Item.Content>
                </Item>
            </Item.Group>
        </Segment>
        <Segment>
            <span>
                <Icon name='clock' /> {format(activity.date!, 'dd MMMM yyyy h:mm aa')}
                <Icon name='marker' /> {activity.venue}
            </span>
        </Segment>
        <Segment secondary>
            Attendees go here
        </Segment>
        <Segment clearing>
            <span>{activity.description}</span>
            <Button as={Link} 
                to={`/activities/${activity.id}`}
                color="teal"
                floated="right"
                content="view"
            />
            
        </Segment>
    </Segment.Group>
  )
}
