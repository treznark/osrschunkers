export default async function Admin() {
    const data = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/chunkers`)
    const chunkers = await data.json()
    console.log("CHUNKERS", chunkers)
    return <div>Admin</div>
}