import * as ToggleGroup from '@radix-ui/react-toggle-group';
import { daysOfTheWeek } from '../utils/day-of-the-week';


interface GroupToggleProps {
    value: any
}

export function GroupToggle({ value }: GroupToggleProps) {

    return(
        <>
            {daysOfTheWeek.map(item => {
                return (
                    <ToggleGroup.Item
                        key={item.id}
                        value={item.id} 
                        className={`w-8 h-8 rounded ${value.includes(item.id) ? 'bg-violet-500' : 'bg-zinc-900'}`}
                        title={item.dayWeek}>
                            {item.firstLetter}
                    </ToggleGroup.Item>
                )
            })}
        </>
    )
}