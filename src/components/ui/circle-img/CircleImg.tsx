import DefaultCircleImg from '@images/DefaultCircleImg.svg'

type CircleImgProps = {
  img?: string | null
  alt: string
}

export const CircleImg = ({ img, alt }: CircleImgProps) => {
  return (
    <div className='d-flex p-1 justify-content-center rounded-circle'>
      <img
        className='w-100'
        draggable={false}
        src={img ? img : DefaultCircleImg}
        alt={alt}
      />
    </div>
  )
}
