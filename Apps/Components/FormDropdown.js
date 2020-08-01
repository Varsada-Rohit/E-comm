import React from 'react';
import {useFormikContext} from 'formik';

import AppDropdown from './AppDropdown';
import {useEffect} from 'react';

function FormDropdown({data}) {
  const {values, setFieldValue} = useFormikContext();

  return (
    <AppDropdown
      data={data}
      selectedValue={values.category}
      onValueChange={itemValue => {
        setFieldValue('category', itemValue);
      }}
    />
  );
}

export default FormDropdown;
