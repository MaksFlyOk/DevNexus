import { WindowDimensionsView } from '@dev/window-dimensions-view'
import { To, useNavigate } from 'react-router-dom'
import './SecondaryNav.scss'

interface SecondaryNav {
  title: string
  backLink: To
}

export const SecondaryNav = ({ title, backLink }: SecondaryNav) => {
  const navigate = useNavigate()

  return (
    <nav className='navbar bg-body-tertiary py-3 secondary-nav-container'>
      <WindowDimensionsView />
      <div className='container-fluid'>
        <button
          className='navbar-brand btn btn-lg btn-outline-dark'
          type='button'
          onClick={() => navigate(backLink)}
        >
          return
        </button>
        <div className='d-flex'>
          <h5>{title}</h5>
        </div>
      </div>
    </nav>
  )
}
