// * react imports
import { useEffect, useState } from 'react'
// * axios import
import axios from 'axios'
// * third party imports
import { Card, CardBody, CardFooter, CardHeader, Table } from 'reactstrap'

const Prices = ({ countDown }) => {
  // * states
  const [data, setData] = useState({})
  const [backgroundColor, setBackgroundColor] = useState('table-primary')

  const isObjEmpty = obj => Object.keys(obj).length === 0

  // * useEffect hook
  useEffect(() => {
    const getCurrencyPrices = async () => {
      await axios.get('https://api.coindesk.com/v1/bpi/currentprice.json').then((response) => {
        setData(response.data)
      })
    }
    getCurrencyPrices()
  }, [countDown])

  useEffect(() => {
    setBackgroundColor('table-primary')
    setTimeout(() => {
      setBackgroundColor('table-white')
    }, 200)
  }, [data])

  // * main return
  return (
    <div>
      {!isObjEmpty(data) ? (
        <Card className='d-flex text-center'>
          <CardHeader tag='h5'> Live {data.chartName} Prices </CardHeader>
          <CardBody>
            <Table
              hover
              size=""
              striped
            >
              <thead>
                <tr>
                  <th> {data.bpi.EUR.description} </th>
                  <th> {data.bpi.USD.description} </th>
                  <th> {data.bpi.GBP.description} </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className={backgroundColor}> {data.bpi.EUR.rate} </td>
                  <td className={backgroundColor}> {data.bpi.USD.rate} </td>
                  <td className={backgroundColor}> {data.bpi.GBP.rate} </td>
                </tr>
              </tbody>
            </Table>
          </CardBody>
          <CardFooter className='text-muted'>
            * {data.disclaimer}
          </CardFooter>
        </Card>
      ) : (
        <h5 className="m-5"> Encounter an Unexpected Situation </h5>
      )}
    </div>
  )
}
export default Prices
