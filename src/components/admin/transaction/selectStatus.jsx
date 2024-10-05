import { useState } from "react"
import { Check, ChevronDown, ChevronUp } from "lucide-react"
 
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const SelectStatus = () => {
    const [open, setOpen] = useState(false)
    const [showStatusBar, setShowStatusBar] = useState(true)
    const [showActivityBar, setShowActivityBar] = useState(false)
    const [showPanel, setShowPanel] = useState(false)

    return (
        <DropdownMenu open={open} onOpenChange={setOpen}>
            <DropdownMenuTrigger asChild>
                <Button 
                variant="outline"
                className="w-[15%] h-[50px] justify-center items-center rounded-2xl" style={{border: "2px solid #000000"}}
                >
                    <p>Trạng thái</p>
                    {open
                        ? <ChevronUp size={25} className="ml-2" /> 
                        : <ChevronDown size={25} className="ml-2" />}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                <DropdownMenuCheckboxItem
                checked={showStatusBar}
                onCheckedChange={setShowStatusBar}
                >
                Thành công
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                checked={showActivityBar}
                onCheckedChange={setShowActivityBar}
                >
                Thất bại
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                checked={showPanel}
                onCheckedChange={setShowPanel}
                >
                Đang xử lý
                </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default SelectStatus;