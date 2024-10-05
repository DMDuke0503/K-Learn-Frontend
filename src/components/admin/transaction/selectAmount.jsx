import { useState } from "react"
import { useForm } from "react-hook-form"
import { ChevronDown, ChevronUp } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

const SelectAmount = () => {
    const [open, setOpen] = useState(false)

    const form = useForm({
        defaultValues: {
            minAmount: null,
            maxAmount: null,
        }
    })

    const onSubmit = (data) => {
        console.log(data)
    }

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button 
                variant="outline"
                className="w-[15%] h-[50px] justify-center items-center rounded-2xl" style={{border: "2px solid #000000"}}
                >
                    <p>Trạng thái</p>
                    {open
                        ? <ChevronUp size={25} className="ml-2" /> 
                        : <ChevronDown size={25} className="ml-2" />}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="p-5 flex flex-col space-y-3">
                        <div className="flex space-x-3">
                            <FormField
                                control={form.control}
                                name="minAmount"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Min</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Giá trị nhỏ nhất" {...form.register('minAmount', {required: "Không được phép để trống", valueAsNumber: true, min: {value: 1, message: "Số tiền tối thiểu bằng 1"}})} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="maxAmount"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Max</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Giá trị nhỏ nhất" {...form.register('maxAmount', {required: "Không được phép để trống", valueAsNumber: true, min: {value: form.getValues('minAmount'), message: "Số tiền phải lớn hơn số tiền tối thiểu"}})} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <Button type="submit" className="w-1/4 flex self-center">Submit</Button>
                    </form>
                </Form>
            </PopoverContent>
        </Popover>
    )
}

export default SelectAmount;