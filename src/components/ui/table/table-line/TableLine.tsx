import { useMoveCard } from '@hooks/mutations'
import { useActions, useTypedSelector } from '@hooks/redux-hooks'
import { AccentColorsType, TaskType } from '@types'
import { Tag } from '@ui/tag'
import { dateISOtoLocalString } from '@utils/dateISOtoLocalString'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { FieldColumnSelect } from './FieldColumnSelect'
import './TableLine.scss'

interface TableLineProps {
  line: TaskType
  iterLine: number
  groupColor: AccentColorsType | undefined
}

export type ChangeColumnValuesType = {
  column: string
}

export const TableLine = ({ line, iterLine, groupColor }: TableLineProps) => {
  const navigate = useNavigate()

  const { moveTask } = useActions()

  const { minimizeColumnsInfo } = useTypedSelector(state => state.boardState)
  const { groupId } = useTypedSelector(state => state.groupState)

  const {
    handleSubmit,
    formState: { errors },
    control,
    reset,
    trigger
  } = useForm<ChangeColumnValuesType>({
    mode: 'onChange'
  })

  const { mutateAsync } = useMoveCard()

  const onSubmit: SubmitHandler<ChangeColumnValuesType> = data => {
    console.log(data)
    moveTask({ task: line, newColumn: data.column })
    mutateAsync({ task: line, column: data.column })

    reset()
  }

  const handleFieldChange = async () => {
    const isValid = await trigger()
    if (isValid) {
      handleSubmit(onSubmit)()
    }
  }

  const setColumnValueList = (columns: typeof minimizeColumnsInfo) => {
    const arr: Array<{ label: string; value: string }> = []

    columns.forEach(column =>
      arr.push({ label: column.name, value: column.name })
    )

    return arr
  }

  return (
    <tr>
      <th scope='row'>{iterLine}</th>
      <td
        onClick={() =>
          navigate(`/card/g/${groupId}/c/${line.title}/${line.code}`)
        }
      >
        {line.title}
      </td>
      <td>{line.assignee}</td>
      <td className='text-nowrap'>{dateISOtoLocalString(line.end_date)}</td>
      <td>
        <div>
          <form id='table-change-column-form'>
            <FieldColumnSelect<ChangeColumnValuesType>
              control={control}
              handelChangeField={handleFieldChange}
              error={errors?.column?.message}
              columnColorList={minimizeColumnsInfo}
              columnValueList={setColumnValueList(minimizeColumnsInfo)}
              name='column'
              defaultColor={groupColor as AccentColorsType}
              defaultValue={line.column}
              placeholder='column'
            />
          </form>
        </div>
      </td>
      <td>
        <p className='description'>{line.description}</p>
      </td>
      <td>
        {line?.tags?.map((tag, iter) => (
          <div className='pb-1'>
            <Tag
              tagName={tag.name}
              color={tag.color}
              key={line.title + ' tag ' + iter}
            />
          </div>
        ))}
      </td>
      <td className='text-nowrap'>{dateISOtoLocalString(line.start_date)}</td>
    </tr>
  )
}
