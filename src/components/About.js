import React, { useEffect } from 'react'
import ContextNote from '../context/notes/ContextNote'
import { useContext } from 'react'
export default function About() {
  const a=useContext(ContextNote)
  
  return (
    <div>About</div>
  )
}
