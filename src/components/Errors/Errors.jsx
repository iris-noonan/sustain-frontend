const Errors = ({ message }) => {
  if (message) {
    return (
      <div>
        Error: {message}
      </div>
    )
  }
}

export default Errors