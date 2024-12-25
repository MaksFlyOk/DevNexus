import LogoSVG from '@images/Logo.svg'

export const Logo = () => {
  return (
    <div className='d-flex p-2 justify-content-center'>
      <img className='w-100 max-auto' src={LogoSVG} alt='Logo' />
    </div>
  )
}
