import { $axios } from '@axios'
import { useActions, useTypedSelector } from '@hooks/redux-hooks'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AccentColorsType, TaskType } from '@types'
import { Tag } from '@ui/tag'
import { dateISOtoLocalString } from '@utils/dateISOtoLocalString'
import { SubmitHandler, useForm } from 'react-hook-form'
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
  const { resetToStableState, moveTask } = useActions()

  const { boardId, minimizeColumnsInfo } = useTypedSelector(
    state => state.boardState
  )
  const { groupId } = useTypedSelector(state => state.groupState)

  const queryClient = useQueryClient()

  const {
    handleSubmit,
    formState: { errors },
    control,
    reset,
    trigger
  } = useForm<ChangeColumnValuesType>({
    mode: 'onChange'
  })

  const { mutate } = useMutation<
    unknown,
    unknown,
    { task: TaskType; groupName: TaskType['column'] },
    unknown
  >({
    mutationFn: data => {
      return $axios.put(`/v1/group/${boardId}/card/${data.task.code}/`, {
        ...data.task,
        column: data.groupName
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`get board`, groupId] })
    },
    onError: () => {
      resetToStableState()
    }
  })

  const onSubmit: SubmitHandler<ChangeColumnValuesType> = data => {
    console.log(data)
    moveTask({ task: line, newColumn: data.column })
    mutate({ task: line, groupName: data.column })

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
      <td>{line.title}</td>
      <td>{line.assignee}</td>
      <td className='text-nowrap'>{dateISOtoLocalString(line.end_date)}</td>
      <td>
        <div>
          <form
            id='table-change-column-form'
            onSubmit={() => console.log('111')}
          >
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
          <Tag
            tagName={tag.name}
            color={tag.color}
            key={line.title + ' tag ' + iter}
          />
        ))}
      </td>
      <td className='text-nowrap'>{dateISOtoLocalString(line.start_date)}</td>
    </tr>
  )
}
