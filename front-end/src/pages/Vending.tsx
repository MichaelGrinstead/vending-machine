import Interface from '../components/Interface'
import Items from '../components/Items'

const Vending = () => {
  return (
    <div
        style={{height: "100%", width: "100%"}}
        >
          <div className='Vending'>
            <div className='Vending-Inner'>
              <Items/>
            </div>
          </div>
          <Interface/>

        </div>
  )
}

export default Vending