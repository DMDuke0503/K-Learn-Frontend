import { useState } from "react"
import { format, setDefaultOptions } from "date-fns"
import { vi } from 'date-fns/locale'
import { Calendar as CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

setDefaultOptions({ locale: vi })

const SelectDate = () => {
  const [date, setDate] = useState()

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-auto h-[50px] justify-center items-center rounded-2xl"
          )}
          style={{border: "2px solid #000000"}}
        >
          {date ? format(date, "P") : <span>Ngày giao dịch</span>}
          <CalendarIcon size={25} className="ml-2" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}

export default SelectDate;