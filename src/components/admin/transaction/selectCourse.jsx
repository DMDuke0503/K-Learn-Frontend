import { useState } from "react"
import { Check, ChevronDown, ChevronUp } from "lucide-react"
 
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

const courses = [
    {
      value: "next.js",
      label: "Next.js",
    },
    {
      value: "sveltekit",
      label: "SvelteKit",
    },
    {
      value: "nuxt.js",
      label: "Nuxt.js",
    },
    {
      value: "remix",
      label: "Remix",
    },
]

const SelectCourse = () => {
    const [open, setOpen] = useState(false)
    const [value, setValue] = useState("")

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className="w-[15%] h-[50px] justify-center items-center rounded-2xl" style={{border: "2px solid #000000"}}
                >
                    {value
                        ? courses.find((course) => course.value === value)?.label
                        : "Khóa học"}
                    {open
                        ? <ChevronUp size={25} className="ml-2" /> 
                        : <ChevronDown size={25} className="ml-2" />}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
                <Command>
                <CommandInput placeholder="Tìm kiếm khóa học" />
                <CommandList>
                    <CommandEmpty>Không tìm thấy khóa học</CommandEmpty>
                    <CommandGroup>
                    {courses.map((course) => (
                        <CommandItem
                        key={course.value}
                        value={course.value}
                        onSelect={(currentValue) => {
                            setValue(currentValue === value ? "" : currentValue)
                            setOpen(false)
                        }}
                        >
                        <Check
                            className={cn(
                            "mr-2 h-4 w-4",
                            value === course.value ? "opacity-100" : "opacity-0"
                            )}
                        />
                        {course.label}
                        </CommandItem>
                    ))}
                    </CommandGroup>
                </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}

export default SelectCourse;