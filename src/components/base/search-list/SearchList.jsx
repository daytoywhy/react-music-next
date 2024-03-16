export default function (props) {
  return (
    <div className="search-list">
      <ul>
        {props.searches.map((item) => (
          <li key={item} className="search-item">
            <span className="text">{item}</span>
            {props.showDelete ? (
              <span className="icon">
                <i className="icon-delete"></i>
              </span>
            ) : (
              ''
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}
