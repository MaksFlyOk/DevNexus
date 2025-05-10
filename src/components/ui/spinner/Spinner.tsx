export const Spinner = ({ padding = 3 }: { padding?: number }) => {
  return (
    <div className={`d-flex justify-content-center py-${padding}`}>
      <div className='spinner-border text-white-50' role='status'>
        <span className='visually-hidden'>Loading...</span>
      </div>
    </div>
  )
}
