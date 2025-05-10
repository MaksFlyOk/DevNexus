import { ColumnType, TaskType } from '@types'
import { Tag } from '@ui/tag'
import { convertBorderColor } from '@utils/convertBorderColor'
import { convertTextColor } from '@utils/convertTextColor'
import { dateISOtoLocalString } from '@utils/dateISOtoLocalString'
import { useDrag } from 'react-dnd'

interface ListItemProps {
  task: TaskType
  color: ColumnType['color'] | undefined
}
export const ListItem = ({ task, color }: ListItemProps) => {
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
      className={`p-2 rounded-3 border border-2 ${convertBorderColor(color)} ${
        isDragging ? ' bg-dark' : ''
      }`}
    >
      <div className='d-flex justify-content-between'>
        <h4 className='fw-bold'>{task?.title}</h4>
      </div>
      <h5 className='pb-1'>{task?.assignee}</h5>
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
