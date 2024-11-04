import { useField } from "formik";
import { Form, Label } from "semantic-ui-react";
import DatePicker, { DatePickerProps } from "react-datepicker";



export default function MySelectInput(props : Partial<DatePickerProps>) {
  
    const [field, meta, helpers] = useField(props.name!);

    return (
        //!! Makes it a boolean
    <Form.Field error={meta.touched && !!meta.error}> 
       <DatePicker 
            {...field}
            selected={(field.value && new Date(field.value)) || null }
            onChange={value => helpers.setValue(value)}   
            showTimeSelect={true}
            placeholderText="Date"   
            dateFormat='MMMM d, yyyy h:mm aa'      
        />
        {meta.touched && meta.error ? ( 
            <Label basic color='red' content={meta.error}/>
        ) : null }
    </Form.Field>
  )
}
