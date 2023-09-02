import Link from 'next/link'

export default async function Author({
  username,
}: {
  username: string
}) {
  const authors = {
    bjohansebas: {
      name: 'Sebastian Beltran',
    },
  }

  return (
    <Link
      href={`https://twitter.com/${username}`}
      className="group flex items-center space-x-3"
      target="_blank"
      rel="noopener noreferrer"
    >
      <div className="flex flex-col">
        <p className="font-semibold text-gray-700">{authors[username].name}</p>
        <p className="text-sm text-gray-500">@{username}</p>
      </div>
    </Link>
  )
}
