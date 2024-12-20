import { Field, ErrorMessage, useField } from "formik";
import { Form, FormField, Label } from "semantic-ui-react";

interface Props {
    placeholder:string;
    name:string;
    rows:number;
    label?:string;
}

export default function MyTextArea(props : Props) {
  
    const [field, meta] = useField(props.name);

    return (
        //!! Makes it a boolean
    <Form.Field error={meta.touched && !!meta.error}> 
        <label>{props.label}</label>
        <textarea {...field} {...props}/>
        {meta.touched && meta.error ? ( 
            <Label basic color='red' content={meta.error}/>
        ) : null }
    </Form.Field>
  )
}
