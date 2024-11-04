import { Field, ErrorMessage, useField } from "formik";
import { Form, FormField, Label, Select } from "semantic-ui-react";

interface Props {
    placeholder: string;
    name: string;
    options: {text:string,value:string}[];
    label?: string;
}

export default function MySelectInput(props : Props) {
  
    const [field, meta, helpers] = useField(props.name);

    return (
        //!! Makes it a boolean
    <Form.Field error={meta.touched && !!meta.error}> 
        <label>{props.label}</label>
        <Select
            clearable
            options={props.options}
            value={field.value || null}
            onChange={(_, d) => helpers.setValue(d.value)}//_tells typescript we won't be usiing to param and stops linting errors
            onBlur={() => helpers.setTouched(true)}
            placeholder={props.placeholder}
        />
        {meta.touched && meta.error ? ( 
            <Label basic color='red' content={meta.error}/>
        ) : null }
    </Form.Field>
  )
}
