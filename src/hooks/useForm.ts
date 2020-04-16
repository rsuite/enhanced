import React, { useCallback, useRef, useState } from 'react';
import { FormInstance, FormProps } from 'rsuite/es/Form';

export interface FormHandle<FormValue> {
  populate(value: any): void;

  submit(validated?: boolean): FormValue | null;
}

function useForm<FormValue>(initialFormValue: FormValue): {
  ref: React.MutableRefObject<FormInstance>;
  handle: FormHandle<FormValue>;
  props: Partial<FormProps>;
};
function useForm<FormValue>(initialFormValue: FormValue): any {
  const formRef = useRef<FormInstance>();

  const [formValue, setFormValue] = useState<FormValue>(initialFormValue);
  const [formError, setFormError] = useState({});

  const onChange = useCallback(newValue => setFormValue(newValue), []);
  const onCheck = useCallback(newError => setFormError(newError), []);

  const submit = useCallback((validated = true) => {
    if (!validated || formRef.current!.check()) {
      return formValue;
    }
    return null;
  }, [formValue]);

  return {
    ref: formRef,
    props: {
      formValue,
      formError,
      onChange,
      onCheck
    },
    handle: {
      populate: setFormValue,
      submit
    }
  };
}

export default useForm;
