import { ColumnType, TaskType } from '@types'
import { Tag } from '@ui/tag'
import { convertBorderColor } from '@utils/convertBorderColor'
import { convertTextColor } from '@utils/convertTextColor'
import { useDrag } from 'react-dnd'

interface KanbanCardProps {
  task: TaskType
  color: ColumnType['color'] | undefined
}

export const KanbanCard = ({ task, color }: KanbanCardProps) => {
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
      className={
        'rounded-3 border border-2 p-2 ' +
        convertBorderColor(color) +
        `${isDragging ? ' bg-dark' : ''}`
      }
    >
      <h4 className='fw-bold'>{task?.name}</h4>
      <h5 className='pb-1'>{task?.worker}</h5>
      <div className='d-flex flex-wrap gap-2 pb-2'>
        {task?.tags?.map((tag, iter) => (
          <Tag
            tagText={tag.tagText}
            color={tag.color}
            key={task.name + ' tag ' + iter}
          />
        ))}
      </div>
      <p className='decription'>{task?.description}</p>
      <div className='d-flex flex-row justify-content-end'>
        <h6 className={'fw-bold ' + convertTextColor(color)}>{task.date}</h6>
      </div>
    </div>
  )
}
