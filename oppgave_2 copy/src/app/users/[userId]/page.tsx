import Link from "next/link"
import { NextRequest } from "next/server"

const Userpage = async ({ params }: { params: { userId: string } }) => {
  return (
    <>
      <p>Single user page for: {params?.userId}</p>
      <Link href={"/users"}>Gå tilbake</Link>
    </>
  )
}

export default Userpage
