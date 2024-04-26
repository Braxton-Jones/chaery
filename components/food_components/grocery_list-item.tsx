type GroceryListItemProps = {
  id: string
  title: string
  quantity: string
}
import { Checkbox } from '../ui/checkbox'
import { Button } from '../ui/button'

export default function GroceryListItem({ id, title, quantity }: GroceryListItemProps) {
  return (
    <div className="text-black-100">
      <div className="flex justify-between items-center">
        <div>
          <Checkbox id={id} />
          <label htmlFor={id} className="ml-2 text-lg font-medium">
            {title}
          </label>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-gray-500 dark:text-gray-400">{quantity}</span>
          <Button variant="destructive" aria-label="Delete item" className="text-red-500 dark:text-red-400">
            <TrashIcon />
          </Button>
        </div>
      </div>
      <hr className="my-4 border-gray-200 dark:border-gray-700" />
    </div>
  )
}

function TrashIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
    </svg>
  )
}
