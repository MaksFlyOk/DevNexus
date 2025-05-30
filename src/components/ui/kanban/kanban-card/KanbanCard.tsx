import { useTypedSelector } from '@hooks/redux-hooks'
import { ColumnType, TaskType } from '@types'
import { Tag } from '@ui/tag'
import { convertBorderColor } from '@utils/convertBorderColor'
import { convertTextColor } from '@utils/convertTextColor'
import { dateISOtoLocalString } from '@utils/dateISOtoLocalString'
import { useDrag } from 'react-dnd'
import { useNavigate } from 'react-router-dom'
import './KanbanCard.scss'

interface KanbanCardProps {
  task: TaskType
  color: ColumnType['color'] | undefined
}

export const KanbanCard = ({ task, color }: KanbanCardProps) => {
  const navigate = useNavigate()

  const { groupId } = useTypedSelector(state => state.groupState)

  const [{ isDragging }, drag] = useDrag<
    TaskType,
    void,
    { isDragging: boolean; didDrop: boolean }
  >(() => ({
    type: 'task',
    item: task,
    collect: monitor => ({
      isDragging: monitor.isDragging(),
      didDrop: monitor.didDrop()
    })
  }))

  return (
    <div
      ref={drag}
      onClick={() =>
        navigate(`/card/g/${groupId}/c/${task.title}/${task.code}`)
      }
      className={
        'rounded-3 border border-2 p-2 ' +
        convertBorderColor(color) +
        `${isDragging ? ' bg-dark' : ''}`
      }
    >
      <h5 className='fw-bold task-name'>{task?.title}</h5>
      <h5 className='pb-1 text-wrap text-break'>{task?.assignee}</h5>
      <div className='d-flex flex-wrap gap-2 pb-2'>
        {task?.tags?.map((tag, iter) => (
          <Tag
            tagName={tag.name}
            color={tag.color}
            key={task.title + ' tag ' + iter}
          />
        ))}
      </div>
      <p className='description'>{task?.description}</p>
      <div className='d-flex flex-row justify-content-end'>
        <h6 className={'fw-bold ' + convertTextColor(color)}>
          {dateISOtoLocalString(task.end_date)}
        </h6>
      </div>
    </div>
  )
}
