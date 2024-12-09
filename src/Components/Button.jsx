import '../styles/Components/button.sass'

export const Button = ({ ...props }) => {
  const text = props.text

  return (
    <button className="btn-comp" {...props}>
      {text}
    </button>
  )
}
