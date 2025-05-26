import { WindowDimensionsView } from '@dev/window-dimensions-view'
import { To, useNavigate } from 'react-router-dom'

interface SecondaryNav {
  title: string
  backLink: To
}

export const SecondaryNav = ({ title, backLink }: SecondaryNav) => {
  const navigate = useNavigate()

  return (
    <nav className='navbar bg-body-tertiary py-3'>
      <WindowDimensionsView />
      <div className='container-fluid'>
        {/* TODO: change button style */}
        <button
          className='navbar-brand btn btn-lg btn-outline-dark'
          type='button'
          onClick={() => navigate(backLink)}
        >
          return
        </button>
        <div className='d-flex'>
          <h3>{title}</h3>
        </div>
      </div>
    </nav>
  )
}
