import React from 'react'

export default function Actions({ onNew, onCopy, tweetUrl }){
  return (
    <div className="actions">
      <button className="btn" onClick={onNew}>New Quote</button>
      <button className="btn" onClick={onCopy}>Copy</button>
      <a className="btn" href={tweetUrl} target="_blank" rel="noopener">Tweet</a>
    </div>
  )
}
