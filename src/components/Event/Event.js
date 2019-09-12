import React from 'react';

export const Event = ({title, description, category, location, address }) => {
  return (
    <section>
      <h4>{title}</h4>
      <p>{description}</p>
      <p>{location}</p>
      <p>{address}</p>
    </section>
  )
}