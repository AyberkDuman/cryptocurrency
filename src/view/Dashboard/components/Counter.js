// * react imports
import React, { useEffect, useState } from 'react'
// * component imports
import Prices from './Prices'
// * third party imports
import { Button, ButtonToolbar, CardBody, CardText } from 'reactstrap'
import { Plus, Minus, RefreshCcw, Play, Pause } from "react-feather"

const Counter = ({ countDownTime }) => {
  const STATUS = {
    STARTED: "Started",
    STOPPED: "Stopped",
    EXPIRED: "Expired"
  }

  // * states
  const [countDown, setCountDown] = useState(countDownTime)
  const [status, setStatus] = useState(STATUS.STOPPED)

  const secondsToDisplay = countDown % 60
  const minutesRemaining = (countDown - secondsToDisplay) / 60
  const minutesToDisplay = minutesRemaining % 60
  const hoursToDisplay = (minutesRemaining - minutesToDisplay) / 60

  // * handle time format 
  const timeFormat = (num) => String(num).padStart(2, "0")

  // * useEffect hook
  useEffect(() => {
    if(countDown <= 0) {
      setStatus("Expired")
    } else if(status === "Started"){
      const interval = setInterval(() => {
        setCountDown(countDown - 1)
      }, 1000)
      return () => clearInterval(interval)
    }
  }, [countDown, status])

  // * main return
  return (
    <CardBody className='d-block'>
      <div className='d-flex justify-content-center'>
        <CardText className='mb-1 mx-3'>
          <strong> Remaining Time: </strong> 
          {timeFormat(hoursToDisplay)}:
          {timeFormat(minutesToDisplay)}:
          {timeFormat(secondsToDisplay)}
        </CardText>
        <ButtonToolbar className='btn-group-sm mb-3'>
          <Button outline color="primary" onClick={() => setCountDown(countDown + 1)}>
            <Plus size={16} />
          </Button>
          <Button className='mx-1' outline color="primary" onClick={() => { if(countDown > 0) setCountDown(countDown - 1)}}>
            <Minus size={16} />
          </Button>
          <Button outline color="primary" onClick={() => setCountDown(countDownTime)}>
            <RefreshCcw size={16} />
          </Button>
        </ButtonToolbar>
      </div>
      <div className='d-flex justify-content-center'>
        <CardText className='mb-1 mx-3'><strong> Counter Status: </strong> {status}</CardText>
        <ButtonToolbar className='btn-group-sm mb-3'>
          <Button className='rounded p-75 mx-1' outline color="secondary" onClick={() => setStatus(STATUS.STARTED)}>
            <Play size={16} />
          </Button>
          <Button className='rounded p-75' outline color="secondary" onClick={() => setStatus(STATUS.STOPPED)}>
            <Pause size={16} />
          </Button>
        </ButtonToolbar>
      </div>
      <Prices 
        countDown={countDown}
      />
    </CardBody>
  )
}
export default Counter