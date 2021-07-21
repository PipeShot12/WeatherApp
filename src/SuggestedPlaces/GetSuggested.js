
export default function GetSuggested ({ desc, temp, index, resPicture, item, suggestedPlace }) {
  return (
    <div className='hex-con d-flex align-items-center' key={'pais-' + index}>
      <div className='wrapper '>
        <div className='hex'>
          <img style={{ cursor: 'pointer' }} className='header-img' src={resPicture.results[0].urls.small} alt={item} id='sugerido' onClick={(e) => suggestedPlace(e, item)} />
        </div>
        <div className='d-block circle' />
      </div>
      <div className='d-block mx-lg-3 ml-sm-2' style={{ zIndex: 10 }}>
        <h6 style={{ zIndex: 10 }}>{item}</h6>
        <h6>{desc}</h6>
        <h6>{temp} °C</h6>
      </div>
    </div>
  )
}
