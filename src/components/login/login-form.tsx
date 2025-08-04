import Form from 'next/form'
import { Input } from "@/components/ui/input"

export default function LoginForm() {
  return (
    <Form action="/search">
      <Input type="text" placeholder="Enter your nid" className='w-100 h-20 mb-10' />
      <button type="submit" className='w-100'>Submit</button>
    </Form>
  );
}