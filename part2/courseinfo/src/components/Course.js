import React from 'react'
import Header from './Header'
import Parts from './Parts'
import Sum from './Sum'

const Course = ({ course })=> {



  return (
   
  <div>

    {course.map(a=>
    <div key={a.name+a.name}>
    <Header key={a.name} name={a.name} />
    <Parts key={a.parts.length} course={a.parts} />
    <Sum key={a.length}course={a} />
    </div>
    )}

  </div>
    

  )
}

export default Course






// <Header name={course.name} />
// {course.parts.map(course=>
//  <Parts key={course.id} course={course} />
// )} 
// <Sum course={course} />   