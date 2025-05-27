import breakdance from '@images/breakdance.webp'
import okak from '@images/okak.webp'
import { Logo } from '@ui/logo'
import { useNavigate } from 'react-router-dom'

export const Landing = () => {
  const navigate = useNavigate()

  const features = [
    {
      icon: 'bi-diagram-2-fill',
      title: 'Управление проектами',
      description:
        'Организуйте задачи в канбан-доске, в виде списка или таблицы'
    },
    {
      icon: 'bi-people-fill',
      title: 'Совместная работа',
      description:
        'Работайте вместе с командой в реальном времени, назначайте задачи и обсуждайте детали'
    },
    {
      icon: 'bi-card-checklist',
      title: 'Гибкие задачи',
      description:
        'Создавайте задачи с тегами, приоритетами и сроками выполнения для лучшей организации'
    },
    {
      icon: 'bi-shield-lock-fill',
      title: 'Безопасность',
      description:
        'Ролевая модель доступа обеспечивает защиту ваших проектов и данных'
    }
  ]

  return (
    <div className='d-flex flex-column min-vh-100'>
      <header className='bg-dark text-white py-3'>
        <div className='container px-sm-2 px-0'>
          <div className='d-flex align-items-center flex-column flex-md-row'>
            <div className='d-flex align-items-center gap-2'>
              <Logo />
              <h1 className='h2'>DevNexus</h1>
            </div>
            <nav className='ms-0 ms-md-auto d-flex align-items-baseline justify-content-center justify-content-sm-between flex-wrap'>
              <a
                href='#features'
                className='fs-5 text-white mx-1 mx-sm-3 text-decoration-none'
              >
                Возможности
              </a>
              <a
                href='#about'
                className='fs-5 text-white mx-1 mx-sm-3 text-decoration-none'
              >
                О проекте
              </a>
              <button
                className='btn btn-primary btn-sm-lg ms-1 ms-sm-3'
                onClick={() => navigate('/auth')}
              >
                Войти
              </button>
            </nav>
          </div>
        </div>
      </header>
      <section className='bg-body-secondary py-5'>
        <div className='container py-5'>
          <div className='row align-items-center'>
            <div className='col-lg-6'>
              <h1 className='display-4 fw-bold mb-4'>DevNexus</h1>
              <p className='lead mb-4'>
                Современная система для совместной разработки, которая помогает
                командам эффективно управлять проектами и задачами.
              </p>
              <div className='d-flex gap-3'>
                <button
                  className='btn btn-primary btn-lg px-4'
                  onClick={() => navigate('/auth')}
                >
                  Начать
                </button>
                <a
                  className='btn btn-outline-secondary btn-lg px-4'
                  href='#about'
                >
                  Узнать больше
                </a>
              </div>
            </div>
            <div className='col-lg-6'>
              <div className='ratio ratio-16x9 bg-secondary rounded mt-4 mt-lg-0'>
                <img
                  src={breakdance}
                  alt='О проекте DevNexus'
                  className='img-fluid rounded shadow'
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id='features' className='py-5'>
        <div className='container py-5'>
          <h2 className='text-center mb-5'>Возможности системы</h2>
          <div className='row g-4'>
            {features.map((feature, index) => (
              <div key={index} className='col-md-6 col-lg-3'>
                <div className='card h-100 border-0 shadow-sm'>
                  <div className='card-body text-center p-4'>
                    <i
                      className={`bi ${feature.icon} text-primary fs-1 mb-3`}
                    ></i>
                    <h5 className='card-title'>{feature.title}</h5>
                    <p className='card-text text-muted'>
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section id='about' className='bg-body-secondary py-5'>
        <div className='container py-5'>
          <div className='row align-items-center'>
            <div className='d-flex justify-content-center col-lg-6 order-lg-2 mb-4 mb-lg-0'>
              <img
                src={okak}
                alt='О проекте DevNexus'
                className='img-fluid rounded shadow'
              />
            </div>
            <div className='col-lg-6 order-lg-1'>
              <h2 className='mb-4'>О проекте DevNexus</h2>
              <p className='lead'>
                DevNexus - это система управления проектами, созданная для
                разработчиков и команд.
              </p>
              <p>
                Наша платформа объединяет все необходимые инструменты для
                эффективной совместной работы: управление задачами,{' '}
                <del>
                  контроль версий, коммуникацию и аналитику в одном месте.
                </del>
              </p>
              <ul className='list-unstyled'>
                <li className='mb-2'>
                  <i className='bi bi-check-circle-fill text-primary me-2'></i>{' '}
                  Простота использования
                </li>
                <li className='mb-2'>
                  <i className='bi bi-check-circle-fill text-primary me-2'></i>{' '}
                  Гибкость настроек
                </li>
                <li className='mb-2'>
                  <i className='bi bi-check-circle-fill text-primary me-2'></i>{' '}
                  Совместная работа)
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      <footer className='bg-dark text-white py-4 mt-auto'>
        <div className='container'>
          <div className='d-flex flex-column flex-md-row justify-content-between align-items-center'>
            <div className='mb-3 mb-md-0 d-flex align-items-center gap-1 flex-column flex-sm-row'>
              <div className='d-flex align-items-center gap-2'>
                <Logo />
                <h1 className='h2'>DevNexus</h1>
              </div>
              <span className='ms-2 text-muted'>
                Система совместной разработки
              </span>
            </div>
            <div>
              <a
                href='https://github.com/MaksFlyOk'
                target='_blank'
                rel='noopener noreferrer'
                className='text-white text-decoration-none'
              >
                <i className='bi bi-github me-2'></i>
                Мой GitHub
              </a>
            </div>
          </div>
          <div className='text-center text-muted mt-3'>
            <small>
              © {new Date().getFullYear()} DevNexus.{' '}
              <del>Все права защищены.</del>
            </small>
          </div>
        </div>
      </footer>
    </div>
  )
}
