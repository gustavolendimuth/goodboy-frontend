/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-undef */
/* eslint-disable react/react-in-jsx-scope */
import PropTypes from "prop-types"
import {useCallback, useRef} from 'react'
import {Stack, TextInput} from '@sanity/ui'
import {set, unset} from 'sanity'
import $ from 'jquery';
import 'jquery-mask-plugin';

const MaskedInput = (props) => {
  const {elementProps, onChange, value} = props
  const inputRef = useRef(null);

  const handleChange = useCallback((event) => {
    const inputValue = event.currentTarget.value
      $(inputRef.current).mask('0000.00.00');
      onChange(inputValue ? set(inputValue) : unset())
	}, [onChange])

  return (
    <Stack space={2}>
      <TextInput
        { ...elementProps } 
        onChange={ handleChange } 
        value={value}
        maxLength={10}
        id="ncm"
        placeholder='2309.10.00'
        ref={inputRef}
      />
    </Stack>
  );
};

MaskedInput.propTypes = {
  elementProps: PropTypes.any,
  onChange: PropTypes.func,
  value: PropTypes.string
}

export default MaskedInput;