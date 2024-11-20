import DefaultCircleImg from '@images/DefaultCircleImg.png'

type CircleImgProps = {
  img?: string
  alt: string
}

export const CircleImg = ({ img, alt }: CircleImgProps) => {
  return (
    <div className='d-flex p-1 justify-content-center'>
      <img className='w-100' src={img ? img : DefaultCircleImg} alt={alt} />
    </div>
  )
}
