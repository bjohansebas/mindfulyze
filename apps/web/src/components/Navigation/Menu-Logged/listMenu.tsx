import { Link } from 'react-router-dom'

export interface ItemListButton {
  text: JSX.Element
  route: string
  icon: JSX.Element
}

export interface ListNavigationProps {
  listRoutes: ItemListButton[]
}

export function ListNavigationLogged({ listRoutes }: ListNavigationProps): JSX.Element {
  return (
    <ul className='flex space-x-7'>
      {listRoutes.map(({ text, route, icon }) => (
        <li key={route}>
          <Link to={route} className='flex flex-col hover:text-main-900 items-center'>
            <span className='min-[400px]:hidden h-6 w-6'>{icon}</span>
            {text}
          </Link>
        </li>
      ))}
    </ul>
  )
}
