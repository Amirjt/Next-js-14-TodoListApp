import { ModeToggle } from "@/components/ThemeSwitcher";
import { ListTodoIcon , Plus, PlusCircle } from "lucide-react"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"


import SignleTodo from "@/components/SignleTodo";

export default function Home() {
  return (
    <div className="max-w-[1600px] h-screen mx-auto flex justify-center items-center p-5 lg:p-0" >
      <div className="border border-border w-full lg:w-1/2 rounded-lg shadow-lg p-5 relative flex flex-col items-center gap-9" >
        <span className="absolute top-2 left-2 " >
          <ModeToggle />
        </span>
        <span className="absolute top-3 right-3 cursor-pointer" >
          <Dialog >
            <DialogTrigger><PlusCircle strokeWidth={1.3} /></DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="text-center" >Add New Todo</DialogTitle>
              </DialogHeader>
              <DialogDescription className="flex flex-col gap-2" >
                <Input placeholder="Name" />
                <Button>Add</Button>
              </DialogDescription>
            </DialogContent>
          </Dialog>
        </span>
        <span className="flex items-center gap-3 text-primary" >
          <h2 className="font-bold text-2xl" >TodoList</h2>
          <ListTodoIcon size={28} /> 
          </span>
          <div className="self-start" >
            <Input type="text" placeholder="Search..." />
          </div>
          <div  className="grid grid-cols-3 gap-3" >
            <Button variant="outline">All</Button>
            <Button variant="outline">In Process</Button>
            <Button variant="outline">Completed</Button>
          </div>
          <div className="grid lg:grid-cols-2 gap-3 w-full" >
            <SignleTodo/>
            <SignleTodo/>
            <SignleTodo/>
            <SignleTodo/>
            <SignleTodo/>
            <SignleTodo/>
            <SignleTodo/>
          </div>
      </div>
    </div>
  )
}
