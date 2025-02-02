import { BoardType } from '@types'

export const Table = ({ boardData }: { boardData: BoardType }) => {
  return (
    <div className='overflow-x-scroll p-2'>
      <table className='table table-hover table-responsive'>
        <thead>
          <tr>
            <th scope='col'>#</th>
            <th scope='col'>Задача</th>
            <th scope='col'>Исполнитель</th>
            <th scope='col'>Дедлайн</th>
            <th scope='col'>Описание</th>
            <th scope='col'>Теги</th>
            <th scope='col'>Статус</th>
            <th scope='col'>Дата создания</th>
          </tr>
        </thead>
        <tbody className='table-group-divider'>
          <tr className='table-danger'>
            <th scope='row'>1</th>
            <td>Markвфыыыыыыыыыыыыыыыыыы</td>
            <td>Otto</td>
            <td>@mdo</td>
          </tr>
          <tr>
            <th scope='row'>2</th>
            <td>Jacob</td>
            <td>Thornton</td>
            <td>@fat</td>
          </tr>
          <tr>
            <th scope='row'>3</th>
            <td colSpan={2}>Larry the Bird</td>
            <td>@twitter</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
