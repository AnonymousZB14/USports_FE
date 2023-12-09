import Link from 'next/link'
import { MouseEventHandler, ReactNode } from 'react'
import { UrlObject } from 'url'

interface Props {
  children: ReactNode
  onClick?: MouseEventHandler<HTMLButtonElement>
  height?: 'fit' | 'unset'
  tailwindStyles?: string
  theme?: string
  href?: UrlObject | string
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
}
const Button: React.FC<Props> = ({
  children,
  type,
  onClick,
  height = 'fit',
  tailwindStyles,
  theme = 'gray',
  href,
  disabled = false,
}) => {
  return href ? (
    <Link
      scroll={false}
      href={href}
      className={`inline-block w-fit ${
        height === 'unset' ? '' : 'h-fit'
      } break-keep rounded-md px-6 py-3 text-center text-xl font-semibold transition-all ${
        theme === 'gray'
          ? 'bg-zinc-200 text-zinc-600 hover:bg-zinc-100'
          : theme === 'black'
            ? 'bg-zinc-800 text-zinc-50 hover:bg-zinc-500'
            : theme === 'red'
              ? 'bg-red-600 text-zinc-50 hover:bg-red-400'
              : theme === 'rose'
                ? 'bg-orange-600 text-zinc-50 hover:bg-orange-500'
                : theme === 'blue'
                  ? 'bg-blue-700 text-zinc-50 hover:bg-blue-600'
                  : ''
      } ${
        disabled
          ? '!pointer-events-none !bg-zinc-100 !text-zinc-200'
          : '!pointer-events-auto'
      } ${tailwindStyles}`}
    >
      {children}
    </Link>
  ) : (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`inline-block w-fit ${
        height === 'unset' ? '' : 'h-fit'
      } break-keep rounded-md px-6 py-3 text-center text-xl font-semibold transition-all ${
        theme === 'gray'
          ? 'bg-zinc-200 text-zinc-600 hover:bg-zinc-100'
          : theme === 'black'
            ? 'bg-zinc-800 text-zinc-50 hover:bg-zinc-500'
            : theme === 'red'
              ? 'bg-red-600 text-zinc-50 hover:bg-red-400'
              : theme === 'orange'
                ? 'bg-orange-600 text-zinc-50 hover:bg-orange-400'
                : theme === 'blue'
                  ? 'bg-blue-700 text-zinc-50 hover:bg-blue-600'
                  : ''
      } ${
        disabled
          ? '!pointer-events-none !bg-zinc-100 !text-zinc-200'
          : '!pointer-events-auto'
      } ${tailwindStyles}`}
    >
      {children}
    </button>
  )
}

export default Button
