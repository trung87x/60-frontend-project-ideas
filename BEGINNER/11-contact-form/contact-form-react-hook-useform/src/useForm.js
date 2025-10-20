import { useEffect, useState } from 'react'
const KEY = 'contact-form-draft'
export function useForm(initial){
  const [values, setValues] = useState(()=>{
    try{ return JSON.parse(localStorage.getItem(KEY)) || initial }catch{ return initial }
  })
  const [errors, setErrors] = useState({})
  useEffect(()=>{ localStorage.setItem(KEY, JSON.stringify(values)) }, [values])
  function setField(name, value){ setValues(v=>({ ...v, [name]: value })) }
  function clear(){ setValues(initial); localStorage.removeItem(KEY) }
  return { values, setField, errors, setErrors, clear }
}
