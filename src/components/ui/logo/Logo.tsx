import LogoSVG from '@images/Logo.svg'

export const Logo = () => {
  return (
    <div className='d-flex p-1 justify-content-center'>
      <img className='w-100 px-3' src={LogoSVG} alt='Logo' />
    </div>
  )
}
