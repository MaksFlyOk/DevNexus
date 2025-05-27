import { useMoveCard } from '@hooks/mutations'
import { useActions, useTypedSelector } from '@hooks/redux-hooks'
import { AccentColorsType, TaskType } from '@types'
import { Tag } from '@ui/tag'
import { dateISOtoLocalString } from '@utils/dateISOtoLocalString'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { FieldColumnSelect } from './FieldColumnSelect'

interface TableLineProps {
  line: TaskType
  iterLine: number
  groupColor: AccentColorsType | undefined
}

export type ChangeColumnValuesType = {
  column: string
}

const breakDateTimeString = (dateTimeString: string) => {
  const timeStartIndex = dateTimeString.lastIndexOf(',') + 1
  const arrDateAndTime: Array<string> = [
    dateTimeString.substring(0, timeStartIndex),
    dateTimeString.substring(timeStartIndex, dateTimeString.length)
  ]

  return arrDateAndTime.map((element, iter) => (
    <p key={element + iter}>{element}</p>
  ))
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
        className='text-decoration-underline'
        onClick={() =>
          navigate(`/card/g/${groupId}/c/${line.title}/${line.code}`)
        }
      >
        {line.title}
      </td>
      <td>{line.assignee}</td>
      <td className='text-nowrap'>
        {breakDateTimeString(dateISOtoLocalString(line.end_date))}
      </td>
      <td>
        <div>
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
        </div>
      </td>
      <td>
        <p>{line.description}</p>
      </td>
      <td>
        {line?.tags?.map((tag, iter) => (
          <div className='pb-1' key={line.title + ' tag ' + iter}>
            <Tag tagName={tag.name} color={tag.color} />
          </div>
        ))}
      </td>
      <td className='text-nowrap'>
        {breakDateTimeString(dateISOtoLocalString(line.start_date))}
      </td>
    </tr>
  )
}
