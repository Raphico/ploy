import "./styles.css"

type Props = {
  msg: string
}

function AuthWithEmail({ msg }: Props) {
  return (
    <div className="flex">
      <div className="bar bg-light"></div>

      <p className="email fs-300">
        {msg}
      </p>

      <div className="bar bg-light"></div>
    </div>
  )
}

export default AuthWithEmail
