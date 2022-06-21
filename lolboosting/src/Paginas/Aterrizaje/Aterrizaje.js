
import {Link} from 'react-router-dom'


export default function Aterrizaje() {

    
  return (
      <>
      <div className='flex justify-center mb-10'>
       <div className=' text-white items-center'>
          
          <div>
          <img src='https://images3.alphacoders.com/112/1123064.jpg' alt='Imagen' className='mt-10 mb-10'/>
          </div>
          <div className='mt-10 '>
          <h1 className='text-5xl flex justify-center mb-10'>LolBoosting</h1>
          </div>

          <h3 className='flex justify-center text-3xl mt-10'>¿Quiénes Somos?</h3>

          <p className='flex justify-center text-xl mt-10'> Somos una Start Up la cual ha decidido montarse su propia Aplicación Web.<br></br>
          Viendo que hay una demanda de websS confiables en las cuales se puedan realizar servicios de Boosting, Coaching ...<br></br>
          y no hay ninguna que ofrezca a sus usuarios bajas comisiones y o precios ya que están inflados.</p>

          <h3 className='flex justify-center text-3xl mt-10'>¿Cuál es nuestro obejtivo?</h3>
          <div className='flex justify-center mt-10 mb-10'>
          <img src='https://imgur.com/RzNnhNU.png' alt='Imagen'/>
          </div>
          <p className='flex justify-center text-xl mt-10'>Simple. Nuestro obejtivo es ofrecerle a los usuarios una manera de poder llegar a ganar dinero mientras juegan League Of Legends.<br></br>
          Nuestra Aplicación permite comprar y realizar servicios de Eloboost, Subida de Maestrias, Coaching, Venta de Cuentas. Sin que tengáis que estar buscando por todos lados.</p>

          <h3 className='flex justify-center text-3xl mt-10'>Ventajas de nuestra Aplicación</h3>

          <p className='flex justify-center text-xl mt-10'>Diseño simple y accesible para cualquier dispositivo móvil a la hora de realizar operaciones.<br></br>
          Retirada de dinero instantáneo sin ninguna comisión por el retiro de este.<br></br>
          0 Comisiones a la hora de vender tu cuenta.<br></br>
          Comisión única del 10% del total a la hora de realizar cualquier Boost o Coach<br></br>
          Aplicación con más fases de desarrollo planeadas incluyendo en un futuro TFT, Valorant, WildRift...
          </p>
          <div className='flex justify-center text-3xl mt-1'>
          <button className='bg-indigo-500 hover:bg-indigo-400 mb-10 mt-10'><Link to='/productos'>Productos</Link></button>
          </div>
          <div className='flex justify-center'>
              <img src='https://www.leagueoflegends.com/static/support-d63ae08baf517425864ddc020a5871d5.png' alt='Producto' className='w-96'/>
            </div>
          <p className='flex justify-center text-xl mt-10'>Disponemos de una tienda de merchandising desde la cual podras comprar lo que te guste</p>
          <div className='flex justify-center text-3xl mt-10 '>
          <button className='bg-indigo-500 hover:bg-indigo-400 mb-10 mt-10'><Link to='/cuentas'>Cuentas</Link></button>
          </div>
          <div className='flex justify-center'>
              <img src='https://www.todogadget.net/files/12-2020/ad26303/cuenta-lol-lan-league-of-legends-798147982_large.png' alt='Producto'/>
            </div>
          <p className='flex justify-center text-xl mt-10'>Servicio de compra y venta de cuentas sin comisión alguna y de una manera muy fácil e intuitiva.</p>
          <div className='flex justify-center text-3xl mt-10'>
          <button className='bg-indigo-500 hover:bg-indigo-400 mb-10 mt-10'><Link to='/boost'>Eloboost</Link></button>
          </div>
            <div className='flex justify-center'>
              <img src='https://media.vandal.net/i/620x134/9-2021/2021981471177_3.jpg' alt='rangos'/>
            </div>
          <p className='flex justify-center text-xl mt-10'>Servicio de Subida / Eloboost de cuentas que puedes realizar para ganar dinero o para que te la suban.</p>
          <div className='flex justify-center text-3xl mt-10'>
          <button className='bg-indigo-500 hover:bg-indigo-400 mb-10 mt-10'><Link to='/maestrias'>Maestrias</Link></button>
          </div>
            <div className='flex justify-center'>
              <img src='https://cdn140.picsart.com/265683751022211.png' alt='MAestria' className='w-96'/>
            </div>
          <p className='flex justify-center text-xl mt-10'>Servicio de Subida de nivel de Maestrias que puedes realizar para ganar dinero o para que te la suban.</p>

          <div className='flex justify-center text-3xl mt-10'>
          <button className='bg-indigo-500 hover:bg-indigo-400 mb-10 mt-10'><Link to='/coachings'>Coaching</Link></button>
          </div>
            <div className='flex justify-center'>
              <img src='https://as.com/esports/imagenes/2017/12/22/league_of_legends/1513959280_234628_1513959476_noticia_normal.jpg' alt='Coach' className='w-96'/>
            </div>
          <p className='flex justify-center text-xl mt-10'>Servicio de tutoria online para mejorar el nivel del jugador y este así poder notar como va deasrrollando sus habilidades</p>
       </div>
      </div>
    </>
  )
}
