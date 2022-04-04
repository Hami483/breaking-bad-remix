import { Link } from "remix";
import Banner1 from '../../public/images/img1.jpg'
import Banner2 from '../../public/images/img2.jpg'
import Banner3 from '../../public/images/img3.jpg'
import Banner4 from '../../public/images/img4.jpg'
import Banner5 from '../../public/images/img5.jpg'

export default function FilmBanner({episode}){
    const imagesArr = [
       Banner1,Banner2,Banner3,Banner4,Banner5
    ]
    const randomImg = imagesArr[Math.floor(Math.random()*imagesArr.length)];
    // console.log('randomImg',randomImg)
    // console.log('episode  in banner',episode)
    return(
        <div>
      <div className="w-full h-96 overflow-hidden relative">
        <div className="w-full h-full flex flex-col absolute justify-between items-start">
          <Link to="/episodes" className="text-white p-5 text-2xl hover:underline" prefetch="intent">
            Go Back
          </Link>
          <div className="bg-slate-700/60 p-5">
            <div className="text-6xl font-bold text-white">{episode[0].title}</div>
          </div>
        </div>

        <img
          src={randomImg}
          className="w-full h-auto"
          style={{ marginTop: -120 }}
        />
      </div>
    </div>
    )
}