// * react imports
import React from 'react'
// * component imports
import Counter from './components/Counter'
// * css import
import 'bootstrap/dist/css/bootstrap.min.css'
// * third party imports
import { Container, Card, CardHeader, CardTitle } from 'reactstrap'

const Dashboard = () => {

  // * set countDown as a second
  const countDownTime = (10 * 60 * 60)

  // * main return
  return (
    <Container>
      <Card className='border-primary'>
        <CardHeader>
          <CardTitle tag='h3'> Cryptocurrency Monitoring </CardTitle>
        </CardHeader>
        <Counter 
          countDownTime={countDownTime}
        />
      </Card>
    </Container>
  )
}
export default Dashboard 