import React from 'react'

const Datetime = () => {
  let showDate = new Date()
  let Dt = showDate.toDateString();
  let displayTime = showDate.getHours() + ':' + showDate.getMinutes() + ":" + showDate.getSeconds();
  return (
    <div>
      {Dt} - {displayTime}
    </div>
  )
}

export default Datetime