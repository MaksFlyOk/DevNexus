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
    <nav className='navbar bg-body-tertiary py-3'>
      <WindowDimensionsView />
      <div className='secondary-nav-container'>
        <div className='d-flex flex-column-reverse flex-sm-row justify-content-between'>
          <button
            className='navbar-brand btn btn-sm btn-outline-dark m-0'
            type='button'
            onClick={() => navigate(backLink)}
          >
            return
          </button>
          <h5>{title}</h5>
        </div>
      </div>
    </nav>
  )
}
